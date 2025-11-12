import localFont from 'next/font/local'

const mono = localFont({
  src: [
    {
      path: '../public/fonts/Dosis-VariableFont_wght.ttf',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--next-font-mono',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Consolas',
    'Liberation Mono',
    'Menlo',
    'monospace',
  ],
})

const chalmers = localFont({
  src: [
    {
      path: '../public/fonts/MTD-Chalmers.otf',
      weight: '400',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--next-font-chalmers',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: [
    'ui-monospace',
    'SFMono-Regular',
    'Consolas',
    'Liberation Mono',
    'Menlo',
    'monospace',
  ],
})
const fonts = [mono, chalmers]
const fontsVariable = fonts.map((font) => font.variable).join(' ')

export { fontsVariable }
