import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Navbar from "@/components/navbar"
import LanguageSwitcher from "@/components/language-switcher"
import { LanguageProvider } from "@/lib/i18n"
import "./globals.css"

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CONI PEREZ | Tattoo Portfolio",
  description: "Artista plástica y tatuadora",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "CONI PEREZ | Tattoo Portfolio",
    description: "Artista plástica y tatuadora",
    images: ["/opengraph-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className={`font-body antialiased`}>
        <LanguageProvider>
          <Navbar />
          <LanguageSwitcher />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
