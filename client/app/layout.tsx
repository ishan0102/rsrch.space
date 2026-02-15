import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "@/components/providers";
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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className="bg-off-white dark:bg-off-black">
        <Providers>
          <Analytics />
          {children}
        </Providers>
      </body>
    </html>
  );
}
