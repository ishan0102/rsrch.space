import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("http://www.rsrch.space"),
  title: "rsrch space",
  description: "Ishan's favorite links.",
  openGraph: {
    type: "website",
    url: "https://www.rsrch.space",
    siteName: "rsrch space",
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
    images: ["https://www.rsrch.space/thumbnail.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var k='rsrch.theme';var t=localStorage.getItem(k);var d=(t==='dark')||(!t&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);}catch(e){}})();",
          }}
        />
      </head>
      <body className="bg-off-white text-gray-800 dark:bg-off-black dark:text-gray-100">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
