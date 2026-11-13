"use client"

import { motion } from "framer-motion"
import { Feather, Palette, Globe } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Imagen de fondo: playa.jpeg más nítida y luminosa */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/playa.jpg"
          alt="Coni Pérez tatuando en la playa"
          fill
          priority
          quality={95}
          className="object-cover object-center brightness-105 contrast-105"
        />
        {/* Oscurecimiento muy leve solo arriba (navbar), centro suave y fundido abajo */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.32)_0%,rgba(0,0,0,0.12)_65%,transparent_100%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black/90" />
      </div>

      <div className="relative z-10 w-full text-center px-6 max-w-[90rem] mx-auto pt-32 md:pt-48 pb-10">
        {/* Logo/Brand */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-48 lg:gap-64 relative">

            {/* Logo Image as a Floating Crest */}
            <motion.div
              className="w-48 h-48 md:w-80 md:h-80 relative flex items-center justify-center z-20"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/logo.jpg"
                alt="Coni Perez Logo"
                width={380}
                height={380}
                className="object-contain w-full h-full filter invert mix-blend-screen opacity-85"
                priority
              />
            </motion.div>

            {/* Brand Name Structure */}
            <div className="flex flex-col items-center justify-center z-10 pointer-events-none pt-2">
              <h2 className="font-heading font-medium text-7xl md:text-[9rem] text-white tracking-[0.15em] md:tracking-[0.2em] uppercase leading-none text-center m-0 p-0 md:-mt-8 [text-shadow:0_4px_28px_rgba(0,0,0,0.9),0_2px_8px_rgba(0,0,0,0.8)]">
                CONI
              </h2>

              {/* Elegant Metallic Divider */}
              <div className="w-full h-[2px] bg-white my-5 md:my-7 opacity-80 shadow-[0_2px_12px_rgba(0,0,0,0.9)]"></div>

              <h2 className="font-heading font-normal text-5xl md:text-[5.5rem] text-white/95 tracking-[0.4em] uppercase leading-none text-center m-0 p-0 [text-shadow:0_4px_24px_rgba(0,0,0,0.95),0_2px_8px_rgba(0,0,0,0.85)]">
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

        {/* Trust Indicators */}
        <motion.div
          className="mt-20 inline-flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-white font-medium tracking-widest uppercase bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/15 shadow-lg"
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
