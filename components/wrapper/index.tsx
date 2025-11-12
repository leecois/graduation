'use client'

import cn from 'clsx'
import type { LenisOptions } from 'lenis'
import { Preloader } from '~/components/preloader'
import { TransformProvider } from '~/hooks/use-transform'
import type { ThemeName } from '~/styles/config'
import { Lenis } from '../lenis'
import { Theme } from '../theme'

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: ThemeName
  lenis?: boolean | LenisOptions
  onPreloaderComplete?: () => void
}

export function Wrapper({
  children,
  theme = 'dark',
  className,
  lenis = true,
  onPreloaderComplete,
  ...props
}: WrapperProps) {
  const content = (
    <>
      <Preloader onComplete={onPreloaderComplete} />
      <main
        className={cn('relative flex flex-col grow ', className)}
        {...props}
      >
        <div className="texture" />
        {children}
      </main>
      {lenis && <Lenis root options={typeof lenis === 'object' ? lenis : {}} />}
    </>
  )

  return (
    <Theme theme={theme} global>
      <TransformProvider>{content}</TransformProvider>
    </Theme>
  )
}
