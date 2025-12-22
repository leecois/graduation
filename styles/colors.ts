const colors = {
  black: 'oklch(0.15 0.05 250)',
  white: 'oklch(0.98 0.01 85)',
  gray: 'oklch(0.4 0.02 240)',
  green: 'oklch(0.55 0.12 200)',
  gray90: 'oklch(0.92 0.01 80)',
  sage: 'oklch(0.65 0.08 220)',
  slate: 'oklch(0.35 0.04 245)',
  paper: 'oklch(0.85 0.015 75)',
} as const

const themeNames = ['light', 'dark'] as const
const colorNames = ['primary', 'secondary', 'contrast'] as const

const themes = {
  light: {
    primary: colors.paper,
    secondary: colors.black,
    contrast: colors.slate,
  },
  dark: {
    primary: colors.black,
    secondary: colors.white,
    contrast: colors.slate,
  },
} as const satisfies Themes

export { colors, themeNames, themes }

// UTIL TYPES
export type Themes = Record<
  (typeof themeNames)[number],
  Record<(typeof colorNames)[number], string>
>
