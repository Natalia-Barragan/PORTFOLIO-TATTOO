"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Feather, Palette, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

export default function HeroSection() {
  const { t } = useLanguage()
  const [activeIndicator, setActiveIndicator] = useState(0)

  const indicators = [
    { icon: Feather, label: t("hero_custom") },
    { icon: Palette, label: t("hero_precision") },
    { icon: Globe, label: t("hero_studio") },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndicator((prev) => (prev + 1) % 3)
    }, 1800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Imagen de fondo: playa.jpeg más nítida y luminosa */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/playa.jpg"
          alt="Coni Pérez tatuando en la playa"
          fill
          priority
          sizes="100vw"
          quality={96}
          className="object-cover object-center md:object-[42%_center] md:scale-105 md:translate-x-[2.5%] brightness-[1.10] contrast-[1.06] saturate-[1.12]"
        />
        {/* Oscurecimiento muy leve solo arriba (navbar), centro suave y fundido abajo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.08)_65%,transparent_100%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 w-full text-center px-6 max-w-[90rem] min-[1700px]:max-w-[94%] mx-auto pt-32 md:pt-48 pb-10">
        {/* Logo/Brand */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="flex flex-col items-center md:items-start justify-center md:-ml-4 lg:-ml-8 relative">

            {/* Logo Image as a Floating Crest */}
            {/* <motion.div
              className="w-48 h-48 md:w-80 md:h-80 relative flex items-center justify-center z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/logo.jpg"
                alt="Coni Perez Logo"
                width={380}
                height={380}
                className="object-contain w-full h-full filter invert mix-blend-screen"
                priority
              />
            </motion.div> */}

            {/* Brand Name Structure */}
            <div className="flex flex-col items-center justify-center z-10 pointer-events-none pt-2">
              <h2 className="font-heading font-medium text-7xl md:text-[9rem] text-white tracking-[0.15em] md:tracking-[0.28em] md:pl-[0.28em] uppercase leading-none text-center m-0 p-0 [text-shadow:0_4px_28px_rgba(0,0,0,0.9),0_2px_8px_rgba(0,0,0,0.8)]">
                CONI
              </h2>

              {/* Elegant Metallic Divider */}
              <div className="w-full h-[2px] bg-white my-5 md:my-7 opacity-80 shadow-[0_2px_12px_rgba(0,0,0,0.9)]"></div>

              <h2 className="font-heading font-normal text-5xl md:text-[5.5rem] text-white/95 tracking-[0.4em] md:tracking-[0.52em] md:pl-[0.52em] uppercase leading-none text-center m-0 p-0 [text-shadow:0_4px_24px_rgba(0,0,0,0.95),0_2px_8px_rgba(0,0,0,0.85)]">
                PEREZ
              </h2>
            </div>

          </div>
        </motion.div>

        {/* CTA Buttons */}
        {/* <motion.div
          className="flex flex-col items-center justify-center mt-12 md:mt-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Link
            href="/booking"
            className="px-12 py-5 bg-metal-plateado text-black font-semibold text-xl rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.7)] hover:bg-white transition-all duration-500 hover:scale-105"
          >
            {t("hero_cta")}
          </Link>
        </motion.div> */}

        {/* Trust Indicators - Mobile Carousel */}
        <motion.div
          className="mt-32 flex md:hidden flex-col items-center justify-center gap-2.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative overflow-hidden bg-black/45 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/15 shadow-lg min-w-[270px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={activeIndicator}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex items-center justify-center gap-2 text-xs text-white font-medium tracking-widest uppercase whitespace-nowrap"
              >
                {(() => {
                  const Icon = indicators[activeIndicator].icon
                  return <Icon className="w-3.5 h-3.5 shrink-0" />
                })()}
                {indicators[activeIndicator].label}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5">
            {indicators.map((_, idx) => (
              <span
                key={idx}
                className={`h-1 rounded-full transition-all duration-300 ${
                  idx === activeIndicator ? "w-4 bg-white/90" : "w-1.5 bg-white/35"
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators - Desktop */}
        <motion.div
          className="mt-20 hidden md:inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-white font-medium tracking-widest uppercase bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/15 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="flex items-center gap-2">
            <Feather className="w-4 h-4" />{t("hero_custom")}
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            {t("hero_precision")}
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            {t("hero_studio")}
          </span>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />
    </section>
  )
}
