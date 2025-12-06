import type { Metadata } from "next";
import { Geist, Geist_Mono, Heebo } from "next/font/google";
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
  title: "קוקי ליזה - מאפים טריים ומתוקים",
  description: "קוקי ליזה - עוגות, עוגיות ולחמים טריים שנעשו באהבה. הזמינו עכשיו!",
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
      </body>
    </html>
  );
}
