import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import Navbar from "@/components/navbar"
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
  title: "INK STUDIO | Custom Art",
  description:
    "Tattoo studio specialized in custom designs and precision art. Premium experience in realistic tattoos and unique body art.",
  icons: {
    icon: "/logo/logo.icon.png",
    shortcut: "/logo/logo.icon.png",
    apple: "/logo/logo.icon.png",
  },
  openGraph: {
    title: "INK STUDIO | Tattoo Studio",
    description: "Custom designs and precision art. Book your exclusive consultation.",
    images: [],
  },
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <script src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"></script>
      <body className={`font-body antialiased`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
