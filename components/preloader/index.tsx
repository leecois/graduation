'use client'

import cn from 'clsx'
import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { useDeviceDetection } from '~/hooks/use-device-detection'
import s from './preloader.module.css'

interface PreloaderProps {
  onComplete?: () => void
  className?: string
}

const digits = [9, 7, 5, 3, 2, 0]
const revealerColors = [
  'var(--color-secondary)',
  'var(--color-contrast)',
  'var(--color-primary)',
]

interface RevealerSVGProps {
  fill: string
  ref?: React.Ref<SVGSVGElement>
}

function RevealerSVG({ fill, ref }: RevealerSVGProps) {
  return (
    <svg
      ref={ref}
      className="coi-w-151 coi-h-148"
      viewBox="0 0 151 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Revealer shape"
    >
      <title>Revealer shape</title>
      <path
        d="M75.9817 0L77.25 34.2209C78.0259 55.1571 94.8249 71.9475 115.762 72.7127L150.982 74L115.762 75.2873C94.8249 76.0525 78.0259 92.8429 77.25 113.779L75.9817 148L74.7134 113.779C73.9375 92.8429 57.1385 76.0525 36.2019 75.2873L0.981689 74L36.2018 72.7127C57.1384 71.9475 73.9375 55.1571 74.7134 34.2209L75.9817 0Z"
        fill={fill}
      />
    </svg>
  )
}

export function Preloader({ onComplete, className }: PreloaderProps) {
  const [isComplete, setIsComplete] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)
  const revealerRefs = useRef<(SVGSVGElement | null)[]>([])
  const { isDesktop } = useDeviceDetection()

  useEffect(() => {
    if (isComplete) return

    const loaderElement = loaderRef.current

    const windowWidth = window.innerWidth
    const mobileWidth = 375
    const desktopWidth = 1440

    const baseValues = {
      wrapperWidth: 180,
      digitWidth: 180,
      initialX: -900,
      revealerScale: 45,
    }

    const wrapperWidth = isDesktop
      ? (baseValues.wrapperWidth / desktopWidth) * windowWidth
      : (baseValues.wrapperWidth / mobileWidth) * windowWidth

    const digitWidth = wrapperWidth

    const finalPosition = isDesktop ? windowWidth - wrapperWidth : 0
    const stepDistance = isDesktop ? finalPosition / 6 : 0

    const initialXPosition = isDesktop
      ? (baseValues.initialX / desktopWidth) * windowWidth
      : (baseValues.initialX / mobileWidth) * windowWidth

    const revealerScale = isDesktop
      ? (baseValues.revealerScale / desktopWidth) * windowWidth
      : (baseValues.revealerScale / mobileWidth) * windowWidth

    const tl = gsap.timeline()
    const animations: gsap.core.Tween[] = []

    const countElements = loaderElement
      ? (Array.from(
          loaderElement.querySelectorAll('[data-preloader-count]')
        ) as HTMLDivElement[])
      : []
    const countWrapperElements = loaderElement
      ? (Array.from(
          loaderElement.querySelectorAll('[data-preloader-count-wrapper]')
        ) as HTMLDivElement[])
      : []

    if (countElements.length > 0) {
      tl.to(countElements, {
        x: initialXPosition,
        duration: 0.85,
        delay: 0.5,
        ease: 'power4.inOut',
      })

      for (let i = 1; i <= 6; i++) {
        const xPosition = initialXPosition + i * digitWidth

        tl.to(countElements, {
          x: xPosition,
          duration: 0.85,
          ease: 'power4.inOut',
          onStart: () => {
            if (countWrapperElements.length > 0) {
              const tween = gsap.to(countWrapperElements, {
                x: stepDistance * i,
                duration: 0.85,
                ease: 'power4.inOut',
              })
              animations.push(tween)
            }
          },
        })
      }
    }

    revealerRefs.current.forEach((el) => {
      if (el) {
        gsap.set(el, { scale: 0 })
      }
    })

    const timelineEnd = tl.totalDuration()
    const revealerOffsets = [0, 0.5, 1]

    revealerRefs.current.forEach((el, i) => {
      if (el) {
        const isLastRevealer = i === revealerOffsets.length - 1
        const isSecondRevealer = i === revealerOffsets.length - 2
        const delay = timelineEnd + revealerOffsets[i]

        const tween = gsap.to(el, {
          scale: revealerScale,
          duration: 1.5,
          ease: 'power4.inOut',
          delay,
          onStart: () => {
            if (isSecondRevealer) {
              onComplete?.()
            }

            if (isLastRevealer && loaderElement) {
              const fadeOutTween = gsap.to(loaderElement, {
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.3,
                onComplete: () => {
                  setIsComplete(true)
                },
              })
              animations.push(fadeOutTween)
            }
          },
        })
        animations.push(tween)
      }
    })

    const headerEl = document.querySelector(
      '[data-preloader-header]'
    ) as HTMLElement
    const toggleBtnEl = document.querySelector(
      '[data-preloader-toggle]'
    ) as HTMLElement
    const lineEls = document.querySelectorAll(
      '[data-preloader-line]'
    ) as NodeListOf<HTMLElement>

    if (headerEl) {
      const headerTween = gsap.to(headerEl, {
        onStart: () => {
          if (toggleBtnEl) {
            const toggleTween = gsap.to(toggleBtnEl, {
              scale: 1,
              duration: 1,
              ease: 'power4.inOut',
            })
            animations.push(toggleTween)
          }

          if (lineEls.length > 0) {
            const lineTween = gsap.to(Array.from(lineEls), {
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: 'power3.out',
            })
            animations.push(lineTween)
          }
        },
        rotateY: 0,
        opacity: 1,
        duration: 2,
        ease: 'power3.out',
        delay: timelineEnd + 1.5,
      })
      animations.push(headerTween)
    }

    return () => {
      tl.kill()
      animations.forEach((tween) => {
        tween.kill()
      })
    }
  }, [isComplete, onComplete, isDesktop])

  if (isComplete) return null

  return (
    <div
      ref={loaderRef}
      className={cn(
        'fixed inset-0 z-50 coi-grid items-end overflow-hidden',
        'bg-primary text-secondary',
        className
      )}
      style={{ opacity: 1 }}
    >
      <div className="texture" />
      <div
        className={cn('relative will-change-transform', s.countWrapper)}
        data-preloader-count-wrapper
      >
        <div
          className={cn('relative flex w-full will-change-transform', s.count)}
          data-preloader-count
        >
          {digits.map((digit, idx) => (
            <div
              key={`digit-first-${idx}-${digit}`}
              className={cn('relative shrink-0', s.digit)}
            >
              <h1 className="absolute left-1/2 top-1/2 m-0 w-max -translate-x-1/2 -translate-y-1/2 leading-none">
                {digit}
              </h1>
            </div>
          ))}
        </div>
      </div>
      <div
        className={cn('relative will-change-transform', s.countWrapper)}
        data-preloader-count-wrapper
      >
        <div
          className={cn('relative flex w-full will-change-transform', s.count)}
          data-preloader-count
        >
          {[9, 7, 9, 6, 1, 7].map((digit, idx) => (
            <div
              key={`digit-second-${idx}-${digit}`}
              className={cn('relative shrink-0', s.digit)}
            >
              <h1 className="absolute left-1/2 top-1/2 m-0 w-max -translate-x-1/2 -translate-y-1/2 leading-none">
                {digit}
              </h1>
            </div>
          ))}
        </div>
      </div>
      {revealerColors.map((color) => (
        <div
          key={`revealer-${color}`}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <RevealerSVG
            ref={(el) => {
              const index = revealerColors.indexOf(color)
              if (index !== -1) {
                revealerRefs.current[index] = el
              }
            }}
            fill={color}
          />
        </div>
      ))}
    </div>
  )
}
