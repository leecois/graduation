'use client'

import cn from 'clsx'
import { gsap } from 'gsap'
import type { HTMLAttributes } from 'react'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'

export interface ArrowRightIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface ArrowRightIconProps extends HTMLAttributes<HTMLDivElement> {}

const ArrowRightIcon = forwardRef<ArrowRightIconHandle, ArrowRightIconProps>(
  ({ onMouseEnter, onMouseLeave, className, ...props }, ref) => {
    const path1Ref = useRef<SVGPathElement>(null)
    const path2Ref = useRef<SVGPathElement>(null)
    const isControlledRef = useRef(false)
    const animationRef = useRef<gsap.core.Timeline | null>(null)

    const animate = useCallback(() => {
      const path1 = path1Ref.current
      const path2 = path2Ref.current
      if (!path1) return
      if (!path2) return

      if (animationRef.current) {
        animationRef.current.kill()
      }

      const tl = gsap.timeline()

      tl.to(
        path1,
        {
          attr: { d: 'M0 12h14' },
          duration: 0.2,
          ease: 'power2.out',
        },
        0
      )
        .to(
          path1,
          {
            attr: { d: 'M0 12h19' },
            duration: 0.2,
            ease: 'power2.in',
          },
          0.2
        )
        .to(
          path2,
          {
            x: -3,
            duration: 0.2,
            ease: 'power2.out',
          },
          0
        )
        .to(
          path2,
          {
            x: 0,
            duration: 0.2,
            ease: 'power2.in',
          },
          0.2
        )

      animationRef.current = tl
    }, [])

    const reset = useCallback(() => {
      const path1 = path1Ref.current
      const path2 = path2Ref.current
      if (!path1) return
      if (!path2) return

      if (animationRef.current) {
        animationRef.current.kill()
      }

      gsap.set(path1, { attr: { d: 'M0 12h19' } })
      gsap.set(path2, { x: 0 })
    }, [])

    useImperativeHandle(ref, () => {
      isControlledRef.current = true

      return {
        startAnimation: animate,
        stopAnimation: reset,
      }
    })

    useEffect(() => {
      return () => {
        if (animationRef.current) {
          animationRef.current.kill()
        }
      }
    }, [])

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          animate()
        } else {
          onMouseEnter?.(e)
        }
      },
      [animate, onMouseEnter]
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          reset()
        } else {
          onMouseLeave?.(e)
        }
      },
      [reset, onMouseLeave]
    )

    return (
      <div
        className={cn('coi-w-28 dt:coi-w-32 aspect-square', className)}
        role="img"
        aria-label="Arrow right icon"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <title>Arrow right</title>
          <path ref={path1Ref} d="M0 12h19" />
          <path ref={path2Ref} d="m12 5 7 7-7 7" />
        </svg>
      </div>
    )
  }
)

ArrowRightIcon.displayName = 'ArrowRightIcon'

export { ArrowRightIcon }
