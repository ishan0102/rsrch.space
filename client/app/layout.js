import './globals.css'
import { GoogleAnalytics } from "../components/GoogleAnalytics";

export const metadata = {
  title: 'rsrch space',
  description: 'Stream of my favorite papers and links.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
