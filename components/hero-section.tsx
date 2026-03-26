"use client"

import { motion } from "framer-motion"
import { Feather, Palette, Globe, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/fondo-geometrico_53876-90650.jpg"
          alt="Geometric Background"
          fill
          priority
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-transparent to-black" />
      </div>

      {/* Floating particles background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-metal-plateado/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto pt-32 md:pt-48 pb-10">
        {/* Logo/Brand */}
        <motion.div
          className="mb-8"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
            },
          }}
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32 relative">

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
                className="object-contain w-full h-full filter invert mix-blend-screen opacity-70 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                priority
              />
            </motion.div>

            {/* Brand Name Structure */}
            <div className="flex flex-col items-center justify-center z-10 pointer-events-none pt-2">
              <h2 className="font-heading font-normal text-7xl md:text-[9rem] text-white tracking-[0.15em] md:tracking-[0.2em] uppercase leading-none drop-shadow-2xl text-center m-0 p-0 md:-mt-8">
                CONI
              </h2>

              {/* Elegant Metallic Divider */}
              <div className="w-full h-[1px] bg-metal-plateado my-5 md:my-7 opacity-40"></div>

              <h2 className="font-heading font-light text-5xl md:text-[5.5rem] text-metal-plateado tracking-[0.4em] uppercase leading-none text-center m-0 p-0">
                PEREZ
              </h2>
            </div>

          </div>
        </motion.div>

        {/* Main Headline (Temporarily Commented Out)
        <motion.h1
          className="font-heading font-light text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight max-w-5xl mx-auto min-h-[200px] md:min-h-[300px]"
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1.2, ease: [0.22, 0.61, 0.36, 1] },
            },
          }}
        >
          {typewriterText}
          <span className="animate-pulse text-metal-plateado">|</span>
        </motion.h1>
        */}

        {/* Subheadline
        <motion.p
          className="text-xl md:text-2xl text-[#D1D5DB] mb-12 max-w-3xl mx-auto font-light leading-relaxed"
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 1, ease: [0.22, 0.61, 0.36, 1] },
            },
          }}
        >
          Artist specialized in custom designs. Every piece is a unique art experience with European precision and New York energy.
        </motion.p> */}

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col items-center justify-center mt-12 md:mt-24"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
            },
          }}
        >
          {/* Replaced MagneticButton with Link and translated text */}
          <Link
            href="/booking"
            className="px-12 py-5 bg-metal-plateado text-black font-semibold text-xl rounded-full glow-accent hover:bg-white transition-all duration-500 hover:scale-105"
          >
            {t("hero_cta")}
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-sm text-metal-plateado/70 tracking-widest uppercase flex flex-wrap items-center justify-center gap-4 md:gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 1, delay: 0.5 },
            },
          }}
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
    </motion.section>
  )
}
