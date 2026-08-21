import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap',
});

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-great-vibes",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Melody & Michael | Wedding",
  description: "Join us in celebrating the wedding of Melody Akintemi and Michael Taiwo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans text-stone-900 bg-stone-50">
        {children}
      </body>
    </html>
  );
}
