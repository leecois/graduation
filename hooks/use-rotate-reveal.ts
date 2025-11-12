import { gsap } from 'gsap'
import { type RefObject, useEffect } from 'react'

type GSAPTweenVars = Extract<Parameters<typeof gsap.to>[1], object>

interface RotateRevealOptions {
  selector?: string
  duration?: number
  delay?: number
  initialRotate?: number
  initialOpacity?: number
  transformOrigin?: string
  ease?: string
  stagger?: number
  perspective?: number
  preserve3D?: boolean
}

interface UseRotateRevealArgs extends RotateRevealOptions {
  isActive: boolean
  rootRef: RefObject<HTMLElement | null>
}

export function useRotateReveal({
  isActive,
  rootRef,
  selector = '[data-rotate-reveal]',
  duration = 1,
  delay = 0,
  initialRotate = 60,
  initialOpacity = 0,
  transformOrigin = 'bottom left',
  ease = 'power3.out',
  stagger,
  perspective,
  preserve3D = true,
}: UseRotateRevealArgs) {
  useEffect(() => {
    if (!isActive) return

    const rootElement = rootRef.current
    if (!rootElement) return

    const elements = Array.from(
      rootElement.querySelectorAll<HTMLElement>(selector)
    )

    if (elements.length === 0) return

    gsap.set(elements, {
      rotateY: initialRotate,
      opacity: initialOpacity,
      transformOrigin,
      ...(preserve3D ? { transformStyle: 'preserve-3d' } : {}),
      ...(typeof perspective === 'number'
        ? { transformPerspective: perspective }
        : {}),
    } as GSAPTweenVars)

    const tween = gsap.to(elements, {
      rotateY: 0,
      opacity: 1,
      duration,
      ease,
      delay,
      stagger,
    })

    return () => {
      tween.kill()
    }
  }, [
    isActive,
    rootRef,
    selector,
    duration,
    delay,
    initialRotate,
    initialOpacity,
    transformOrigin,
    ease,
    stagger,
    perspective,
    preserve3D,
  ])
}
