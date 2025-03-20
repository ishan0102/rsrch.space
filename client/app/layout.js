import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("http://www.rsrch.space"),
  title: "rsrch space",
  description: "Ishan's favorite links.",
  openGraph: {
    type: "website",
    url: "https://www.rsrch.space",
    site_name: "rsrch space",
    images: [
      {
        url: "https://www.rsrch.space/thumbnail.png",
        alt: "rsrch.space homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ishan0102",
    title: "rsrch space",
    description: "Ishan's favorite links",
    image: "https://www.rsrch.space/thumbnail.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@ishan0102" />
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
