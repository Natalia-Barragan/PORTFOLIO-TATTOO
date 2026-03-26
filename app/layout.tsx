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
  title: "CONI PEREZ | Tattoo Artist",
  description:
    "Visual artist and tattooer specializing in Fine Line and custom designs. Technical precision and artistic sensitivity for unique body art.",
  openGraph: {
    title: "CONI PEREZ | Portfolio",
    description: "Custom designs and precision art. Book your exclusive consultation.",
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
