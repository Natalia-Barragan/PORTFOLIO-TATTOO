"use client"

import { useLanguage, Language } from "@/lib/i18n"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function LanguageSwitcher({ variant = "floating" }: { variant?: "floating" | "inline" }) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // No mostrar en el dashboard de admin
  if (pathname.startsWith("/admin")) return null

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: "en", label: "English", flag: "us" },
    { code: "es", label: "Español", flag: "ar" },
    { code: "pt", label: "Português", flag: "br" },
  ]

  const currentLang = languages.find((l) => l.code === language)

  const containerClasses = 
    variant === "floating" 
      ? "fixed top-6 right-6 md:right-12 z-[100] mt-5 md:mt-0" 
      : "relative"

  return (
    <div className={containerClasses}>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/20 hover:border-metal-plateado/50 backdrop-blur-md transition-all duration-300 group shadow-lg"
        >
          <img
            src={`https://flagcdn.com/w40/${currentLang?.flag}.png`}
            alt={currentLang?.label}
            className="w-5 h-3.5 object-cover rounded-[1px] shadow-sm"
          />
          <span className="text-xs font-bold text-white uppercase tracking-widest">{language}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-full mt-2 right-0 w-36 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-[60] py-1"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${language === lang.code
                    ? "text-metal-plateado bg-white/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                >
                  <img
                    src={`https://flagcdn.com/w40/${lang.flag}.png`}
                    alt={lang.label}
                    className="w-5 h-3.5 object-cover rounded-[1px]"
                  />
                  <span className="font-medium">{lang.label}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
