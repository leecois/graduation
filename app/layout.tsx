import type { Metadata, Viewport } from 'next'
import type { PropsWithChildren } from 'react'
import { RealViewport } from '~/components/real-viewport'
import AppData from '~/package.json'
import { themes } from '~/styles/colors'
import '~/styles/css/index.css'

import { fontsVariable } from '~/styles/fonts'

const APP_NAME = AppData.name
const APP_DEFAULT_TITLE = 'Lễ Tốt Nghiệp của Khánh'
const APP_TITLE_TEMPLATE = '%s - Lễ Tốt Nghiệp của Khánh'
const APP_DESCRIPTION = AppData.description
const APP_BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? 'https://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(APP_BASE_URL),
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  alternates: {
    canonical: '/',
    languages: {
      'vi-VN': '/vi-VN',
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: APP_BASE_URL,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: APP_DEFAULT_TITLE,
      },
    ],
    locale: 'vi_VN',
  },
  authors: [{ name: 'Khanh Le Quoc', url: 'https://khanh.me' }],
}

export const viewport: Viewport = {
  themeColor: themes.light.primary,
  colorScheme: 'normal',
}

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <html
      lang="vi"
      dir="ltr"
      className={fontsVariable}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <RealViewport />
        {children}
      </body>
    </html>
  )
}
