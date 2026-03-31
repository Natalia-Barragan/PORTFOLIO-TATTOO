"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

import { usePathname } from "next/navigation"
import LanguageSwitcher from "./language-switcher"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  if (pathname.startsWith("/admin")) return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-auto md:min-w-[600px] max-w-7xl bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-full shadow-[0_8px_32px_rgba(255,255,255,0.1)]"
    >
      <div className="px-8 py-3 flex justify-between items-center relative">

        {/* Navigation Links (Left Side) */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Mobile Menu Button - Left on mobile */}
          <button
            className="md:hidden text-white p-1 hover:text-metal-plateado transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-gray-300 hover:text-metal-plateado text-base font-medium transition-colors">{t("nav_about")}</Link>
            <Link href="/#portfolio" className="text-gray-300 hover:text-metal-plateado text-base font-medium transition-colors">{t("nav_portfolio")}</Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Right Side: CTA Button */}
          <Link
            href="/booking"
            className="px-6 py-2.5 md:px-8 md:py-3 bg-metal-plateado text-black rounded-full glow-accent hover:bg-white hover:text-black transition-all font-semibold text-base whitespace-nowrap"
          >
            {t("nav_book")}
          </Link>
        </div>
      </div>

      {/* 3. MENÚ DESPLEGABLE (Solo Móvil - Popup Flotante) */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full mt-4 right-0 w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-40 p-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between px-4 py-2 mb-2 border-b border-white/10">
                <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{t("language")}</span>
                <LanguageSwitcher variant="inline" />
              </div>
              
              <Link
                href="/#about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-metal-plateado rounded-xl transition-all text-sm font-medium flex items-center"
              >
                {t("nav_about")}
              </Link>
              <Link
                href="/#portfolio"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:bg-white/5 hover:text-metal-plateado rounded-xl transition-all text-sm font-medium flex items-center"
              >
                {t("nav_portfolio")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
