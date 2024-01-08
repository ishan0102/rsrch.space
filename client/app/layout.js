import './globals.css'
import { GoogleAnalytics } from "../components/GoogleAnalytics";

export const metadata = {
  title: 'rsrch space',
  description: 'Stream of my favorite papers and links.',
  openGraph: {
    type: 'website',
    url: 'https://www.rsrch.space',
    site_name: 'rsrch space',
    images: [
      {
        url: 'https://www.rsrch.space/thumbnail.png',
        alt: 'rsrch.space homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ishan0102',
    title: 'rsrch space',
    description: 'Stream of my favorite papers and links',
    image: 'https://www.rsrch.space/thumbnail.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@ishan0102" />
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
