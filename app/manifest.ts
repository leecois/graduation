import type { MetadataRoute } from 'next'
import AppData from '~/package.json'
export default function manifest(): MetadataRoute.Manifest {
  return {
    display: 'standalone',
    icons: [
      {
        sizes: '192x192',
        src: '/android-chrome-192x192.png',
        type: 'image/png',
      },
      {
        sizes: '512x512',
        src: '/android-chrome-512x512.png',
        type: 'image/png',
      },
    ],
    name: 'Graduation Ceremony',
    description: AppData.description,
    start_url: '/',
    theme_color: '#181423',
  }
}
