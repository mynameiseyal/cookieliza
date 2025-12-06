import type { Metadata } from "next";
import { Geist, Geist_Mono, Heebo } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "קוקי ליזה - מאפים טריים ומתוקים | Cookie Liza Bakery",
  description: "קוקי ליזה - עוגות מעוצבות, עוגיות פריכות ולחמים ביתיים טריים שנעשו באהבה מ-2010. הזמינו עכשיו ותהנו ממאפים איכותיים ומפנקים!",
  keywords: ["קוקי ליזה", "מאפייה", "עוגות", "עוגיות", "לחם", "מאפים", "עוגות מעוצבות", "Cookie Liza", "bakery", "cakes"],
  authors: [{ name: "Cookie Liza Bakery" }],
  creator: "Cookie Liza",
  publisher: "Cookie Liza",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cookieliza.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'קוקי ליזה - מאפים טריים ומתוקים',
    description: 'עוגות מעוצבות, עוגיות פריכות ולחמים ביתיים שנעשו באהבה',
    url: '/',
    siteName: 'Cookie Liza Bakery',
    images: [
      {
        url: '/Liza.jpg',
        width: 1200,
        height: 630,
        alt: 'קוקי ליזה - מאפייה',
      },
    ],
    locale: 'he_IL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'קוקי ליזה - מאפים טריים ומתוקים',
    description: 'עוגות מעוצבות, עוגיות פריכות ולחמים ביתיים שנעשו באהבה',
    images: ['/Liza.jpg'],
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
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${heebo.variable} antialiased`}
      >
        {children}
        <Toaster 
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#fff',
              color: '#171717',
              fontFamily: 'var(--font-heebo)',
              direction: 'rtl',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#db2777',
                secondary: '#fff',
              },
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
