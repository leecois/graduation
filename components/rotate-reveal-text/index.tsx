import cn from 'clsx'
import type { ComponentPropsWithoutRef, ElementType } from 'react'

type RotateRevealTextProps<T extends ElementType> = {
  as?: T
  preserve3D?: boolean
} & ComponentPropsWithoutRef<T>

function RotateRevealText<T extends ElementType = 'span'>({
  as,
  className,
  style,
  preserve3D = true,
  ...props
}: RotateRevealTextProps<T>) {
  const Component = (as ?? 'span') as ElementType
  const baseClass =
    Component === 'span' ? 'inline-block will-change-transform' : 'will-change-transform'

  return (
    <Component
      data-rotate-reveal
      className={cn(baseClass, className)}
      style={{
        ...(preserve3D ? { transformStyle: 'preserve-3d' } : undefined),
        ...style,
      }}
      {...props}
    />
  )
}

export default RotateRevealText

