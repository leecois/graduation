'use client'

import cn from 'clsx'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'
import type { CSSProperties, Ref } from 'react'
import { breakpoints } from '~/styles/layout.mjs'
import s from './image.module.css'

export type ImageProps = Omit<NextImageProps, 'objectFit' | 'alt'> & {
  objectFit?: CSSProperties['objectFit']
  block?: boolean
  mobileSize?: `${number}vw`
  desktopSize?: `${number}vw`
  ref?: Ref<HTMLImageElement>
  alt?: string
  aspectRatio?: number
}

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const generateShimmer = (w: number, h: number) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="rgba(255,255,255,0.1)" offset="20%" />
        <stop stop-color="rgba(255,255,255,0.2)" offset="50%" />
        <stop stop-color="rgba(255,255,255,0.1)" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="rgba(0,0,0,0)" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`

const MIN_DIMENSION_FOR_BLUR_PLACEHOLDER = 40
const DEFAULT_DERIVED_DIMENSION = 100

const shouldUseBlurPlaceholder = (
  src: NextImageProps['src'],
  placeholder: string,
  blurDataURL: string | undefined,
  width: number | undefined,
  height: number | undefined
): boolean => {
  if (!src) return false
  const isSvg = typeof src === 'string' && src.includes('.svg')
  const isBelowThreshold =
    (typeof width === 'number' && width < MIN_DIMENSION_FOR_BLUR_PLACEHOLDER) ||
    (typeof height === 'number' && height < MIN_DIMENSION_FOR_BLUR_PLACEHOLDER)

  if (isBelowThreshold) return false

  return !isSvg && placeholder === 'blur' && !blurDataURL
}

const generateBlurDataURL = (
  shouldUse: boolean,
  aspectRatio: number | undefined,
  existingBlurDataURL: string | undefined
): string | undefined => {
  if (!(shouldUse && aspectRatio)) return existingBlurDataURL

  const shimmerSvg = generateShimmer(700, Math.round(700 / aspectRatio))
  return `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`
}

const getFinalPlaceholder = (
  shouldUse: boolean,
  aspectRatio: number | undefined,
  blurDataURL: string | undefined,
  originalPlaceholder: NextImageProps['placeholder']
): NextImageProps['placeholder'] => {
  if (!shouldUse) {
    return originalPlaceholder === 'blur' && !blurDataURL
      ? 'empty'
      : originalPlaceholder
  }

  return aspectRatio || blurDataURL ? 'blur' : 'empty'
}

export function Image({
  style,
  className,
  loading,
  objectFit = 'cover',
  quality = 90,
  alt = '',
  fill,
  block: blockProp,
  width: widthProp,
  height: heightProp,
  mobileSize = '100vw',
  desktopSize = '100vw',
  sizes,
  src,
  unoptimized,
  ref,
  aspectRatio,
  placeholder = 'blur',
  priority = false,
  ...props
}: ImageProps) {
  const block = blockProp ?? !fill
  const finalFill = fill ?? !block

  const hasAspectRatio = typeof aspectRatio === 'number' && aspectRatio > 0
  const hasExplicitWidth = typeof widthProp === 'number'
  const hasExplicitHeight = typeof heightProp === 'number'

  let finalWidth: number | undefined =
    typeof widthProp === 'number' ? widthProp : undefined
  let finalHeight: number | undefined =
    typeof heightProp === 'number' ? heightProp : undefined

  if (!finalFill) {
    if (finalWidth === undefined) {
      finalWidth = block ? 1 : undefined
    }

    if (finalHeight === undefined) {
      finalHeight = block ? 1 : undefined
    }

    if (hasAspectRatio) {
      if (!hasExplicitWidth) {
        if (!hasExplicitHeight) {
          let derivedHeight = DEFAULT_DERIVED_DIMENSION
          let derivedWidth = Math.round(aspectRatio * derivedHeight)

          if (derivedWidth < MIN_DIMENSION_FOR_BLUR_PLACEHOLDER) {
            derivedWidth = MIN_DIMENSION_FOR_BLUR_PLACEHOLDER
            derivedHeight = Math.round(derivedWidth / aspectRatio)
          }

          if (derivedHeight < MIN_DIMENSION_FOR_BLUR_PLACEHOLDER) {
            derivedHeight = MIN_DIMENSION_FOR_BLUR_PLACEHOLDER
            derivedWidth = Math.round(aspectRatio * derivedHeight)
          }

          finalWidth = derivedWidth
          finalHeight = derivedHeight
        } else if (finalHeight) {
          finalWidth = Math.round(aspectRatio * finalHeight)
        }
      } else if (!hasExplicitHeight && finalWidth) {
        finalHeight = Math.round(finalWidth / aspectRatio)
      }
    }
  } else {
    finalWidth = undefined
    finalHeight = undefined
  }

  const finalLoading = loading ?? (priority ? 'eager' : 'lazy')

  const finalSizes =
    sizes || `(max-width: ${breakpoints.dt}px) ${mobileSize}, ${desktopSize}`

  if (!src) return null

  const isSvg = typeof src === 'string' && src.includes('.svg')
  const shouldUsePlaceholder = shouldUseBlurPlaceholder(
    src,
    placeholder,
    props.blurDataURL,
    finalWidth,
    finalHeight
  )
  const blurDataURL = generateBlurDataURL(
    shouldUsePlaceholder,
    aspectRatio,
    props.blurDataURL
  )
  const finalPlaceholder = getFinalPlaceholder(
    shouldUsePlaceholder,
    aspectRatio,
    props.blurDataURL,
    placeholder
  )

  return (
    <NextImage
      ref={ref}
      fill={finalFill}
      width={finalWidth}
      height={finalHeight}
      loading={finalLoading}
      quality={quality}
      alt={alt}
      style={{
        objectFit,
        ...style,
      }}
      className={cn(className, block && s.block)}
      sizes={finalSizes}
      src={src}
      unoptimized={unoptimized || isSvg}
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      placeholder={finalPlaceholder}
      blurDataURL={blurDataURL}
      priority={priority}
      {...props}
    />
  )
}
