import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vidyasagarmsc.github.io'),
  title: {
    default: 'Vidyasagar Machupalli | Executive IT Architect & Developer Advocate',
    template: '%s | Vidyasagar Machupalli'
  },
  description: 'Portfolio of Vidyasagar Machupalli - Executive IT Architect, BCS Fellow & Developer Advocate at IBM. Specializing in AI, Cloud Architecture, and Developer Experience with 18+ years of expertise.',
  keywords: [
    'Vidyasagar Machupalli',
    'IT Architect',
    'Developer Advocate',
    'IBM',
    'BCS Fellow',
    'AI',
    'Cloud Architecture',
    'Quantum Computing',
    'Solution Architecture',
    'Technical Leader'
  ],
  authors: [{ name: 'Vidyasagar Machupalli', url: 'https://vidyasagarmsc.github.io' }],
  creator: 'Vidyasagar Machupalli',
  publisher: 'Vidyasagar Machupalli',
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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://vidyasagarmsc.github.io',
    siteName: 'Vidyasagar Machupalli',
    title: 'Vidyasagar Machupalli | Executive IT Architect & Developer Advocate',
    description: 'Executive IT Architect, BCS Fellow & Developer Advocate at IBM. Architecting intelligent digital solutions with 18+ years of expertise in AI, Cloud, and Developer Experience.',
    images: [
      {
        url: '/logo.svg',
        width: 64,
        height: 64,
        alt: 'Vidyasagar Machupalli Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Vidyasagar Machupalli | Executive IT Architect & Developer Advocate',
    description: 'Executive IT Architect, BCS Fellow & Developer Advocate at IBM. Specializing in AI, Cloud, and Developer Experience.',
    creator: '@vidyasagarmsc',
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
  },
  alternates: {
    canonical: 'https://vidyasagarmsc.github.io',
  },
};

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider"
import { CustomCursor } from "@/components/ui/CustomCursor"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="noise-overlay" aria-hidden="true" />
          <CustomCursor />
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

