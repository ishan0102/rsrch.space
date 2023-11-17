import './globals.css'
import { GoogleAnalytics } from "../components/GoogleAnalytics";

export const metadata = {
  title: 'rsrch space',
  description: 'Stream of my favorite papers and links.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  )
}
