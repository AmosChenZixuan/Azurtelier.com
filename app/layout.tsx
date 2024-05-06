import 'css/tailwind.css'
import 'css/fonts.css'
import 'css/colors.css'
import 'pliny/search/algolia.css'

import { Pangolin, ZCOOL_KuaiLe, Orbitron } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { LanguageProvider } from 'utils/locale'
import { ImageOverlayProvider } from '@/components/overlay/providers'
import ImageViewOverlay from '@/components/overlay/ImageOverlay'

// default english text
const pangolin = Pangolin({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pangolin',
  weight: '400',
})

// default Chinese text
const zcool_kuaile = ZCOOL_KuaiLe({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zcool-kuaile',
  weight: '400',
})

// logo Font
const orbitron = Orbitron({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-orbitron',
  weight: '400',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${pangolin.variable} ${zcool_kuaile.variable} ${orbitron.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/icon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/icon.png" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <script
          defer
          src="https://eu.umami.is/script.js"
          data-website-id={
            (siteMetadata.analytics as AnalyticsConfig).umamiAnalytics?.umamiWebsiteId
          }
        ></script>
      </head>
      <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white">
        <ThemeProviders>
          <LanguageProvider>
            <SectionContainer>
              <div className="flex h-screen flex-col justify-between font-sans">
                <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                  <ImageOverlayProvider>
                    <Header />
                    <main className="mb-auto mt-20">{children}</main>
                    <ImageViewOverlay />
                  </ImageOverlayProvider>
                </SearchProvider>
                <Footer />
              </div>
            </SectionContainer>
          </LanguageProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
