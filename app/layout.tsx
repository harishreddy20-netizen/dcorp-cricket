import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const BASE_URL = "https://dcorpcc.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Dcorp Cricket Club | Oklahoma City",
    template: "%s | Dcorp Cricket Club",
  },
  description:
    "Dcorp Cricket Club — Oklahoma City's competitive cricket club playing in TSCL since 2014. Join us to play, compete, and grow.",
  keywords: [
    "Dcorp Cricket Club",
    "Oklahoma City cricket",
    "TSCL cricket",
    "OKC cricket club",
    "cricket Oklahoma",
    "join cricket club Oklahoma",
  ],
  authors: [{ name: "Dcorp Cricket Club" }],
  creator: "Dcorp Cricket Club",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Dcorp Cricket Club",
    title: "Dcorp Cricket Club | Oklahoma City",
    description:
      "Oklahoma City's competitive cricket club playing in TSCL since 2014. Fixtures, results, squad, and more.",
    images: [
      {
        url: "/logo-v3.png",
        width: 512,
        height: 512,
        alt: "Dcorp Cricket Club",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dcorp Cricket Club | Oklahoma City",
    description:
      "Oklahoma City's competitive cricket club playing in TSCL since 2014.",
    images: ["/logo-v3.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo-v3.png",
    shortcut: "/logo-v3.png",
    apple: "/logo-v3.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${barlow.variable} ${barlowCondensed.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsOrganization",
              name: "Dcorp Cricket Club",
              sport: "Cricket",
              url: BASE_URL,
              logo: `${BASE_URL}/logo-v3.png`,
              foundingDate: "2014",
              description:
                "Oklahoma City's competitive cricket club playing in TSCL since 2014.",
              location: {
                "@type": "Place",
                name: "Oklahoma City, Oklahoma, USA",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Oklahoma City",
                  addressRegion: "OK",
                  addressCountry: "US",
                },
              },
              sameAs: ["https://cricclubs.com/TSCL1"],
            }),
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
