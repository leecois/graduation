import type { CSSProperties } from 'react'

const fonts = {
  mono: '--next-font-mono',
  chalmers: '--next-font-chalmers',
} as const

const typography: TypeStyles = {
  'home-title': {
    'font-family': `var(${fonts.chalmers})`,
    'font-style': 'normal',
    'font-weight': 400,
    'line-height': '120%',
    'letter-spacing': '.0em',
    'font-size': { mobile: 42, desktop: 173 },
  },
  caption: {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 300,
    'line-height': '100%',
    'letter-spacing': '.0em',
    'font-size': { mobile: 14, desktop: 16 },
  },
  time: {
    'font-family': `var(${fonts.chalmers})`,
    'font-style': 'normal',
    'font-weight': 300,
    'line-height': '100%',
    'letter-spacing': '.0em',
    'font-size': { mobile: 16, desktop: 28 },
  },
  h1: {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 700,
    'line-height': { mobile: '100%', desktop: '95%' },
    'letter-spacing': { mobile: '-0.01em', desktop: '-0.015em' },
    'font-feature-settings': `"ss04"`,
    'font-size': { mobile: 36, desktop: 80 },
  },
  h2: {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 700,
    'line-height': { mobile: '100%', desktop: '95%' },
    'letter-spacing': { mobile: '0.03em', desktop: '0.015em' },
    'font-feature-settings': `"ss04"`,
    'font-size': { mobile: 50, desktop: 72 },
  },
  contact: {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 700,
    'line-height': { mobile: '130%', desktop: '130%' },
    'letter-spacing': { mobile: '0.03em', desktop: '0.015em' },
    'font-size': { mobile: 28, desktop: 42 },
  },
  p: {
    'font-family': `var(${fonts.mono})`,
    'font-style': 'normal',
    'font-weight': 200,
    'line-height': '100%',
    'letter-spacing': '.0em',
    'font-size': { mobile: 14, desktop: 16 },
  },
  cta: {
    'font-family': `var(${fonts.mono})`,
    'font-feature-settings': '"case"',
    'font-style': 'normal',
    'font-weight': 400,
    'line-height': '100%',
    'letter-spacing': '.01em',
    'font-size': { mobile: 32, desktop: 48 },
  },
} as const

export { fonts, typography }

// UTIL TYPES
type TypeStyles = Record<
  string,
  {
    'font-family': string
    'font-style': CSSProperties['fontStyle']
    'font-weight': CSSProperties['fontWeight']
    'line-height':
      | `${number}%`
      | { mobile: `${number}%`; desktop: `${number}%` }
    'letter-spacing':
      | `${number}em`
      | { mobile: `${number}em`; desktop: `${number}em` }
    'font-feature-settings'?: string
    'font-size': number | { mobile: number; desktop: number }
  }
>
