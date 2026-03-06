"use client"

import { motion } from "framer-motion"
import { Calendar, Trophy, Palette, Star } from "lucide-react"
import Image from "next/image"
import MagneticButton from "./magnetic-button"
import { useTypewriter } from "@/hooks/use-typewriter"
import { Menu, X } from "lucide-react";

export default function HeroSection() {
  const typewriterText = useTypewriter("Custom body art. Your vision permanently realized.", 50)

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-black via-[#1A1A1A] to-black overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.3,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {/* Floating particles background */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#0044FF]/30 rounded-full"
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

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
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
          <div className="flex flex-col items-center justify-center gap-2 mb-8 mt-4">
            <h2 className="font-heading font-light text-7xl md:text-[9rem] text-white tracking-widest uppercase leading-none">
              INK
            </h2>
            <h2 className="font-heading font-light text-4xl md:text-6xl text-[#0044FF] tracking-[0.3em] uppercase">
              STUDIO
            </h2>
          </div>
        </motion.div>

        {/* Main Headline */}
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
          <span className="animate-pulse text-[#0044FF]">|</span>
        </motion.h1>

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
          className="flex flex-col items-center gap-6"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
            },
          }}
        >
          <MagneticButton href="/booking">
            <div className="flex items-center gap-2 text-black bg-[#0044FF] px-8 py-4 rounded-sm glow-accent font-semibold hover:bg-white hover:text-black transition-colors">
              <Calendar className="w-5 h-5" />
              Book Now
            </div>
          </MagneticButton>

          <a
            href="/booking"
            className="text-[#0044FF] hover:text-white transition-colors duration-300 flex items-center gap-2 text-lg group"
          >
            <span className="border-b border-[#0044FF] group-hover:border-white transition-colors">Schedule Consultation</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-sm text-[#0044FF]/70 tracking-widest uppercase flex flex-wrap items-center justify-center gap-4 md:gap-8"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { duration: 1, delay: 0.5 },
            },
          }}
        >
          <span className="flex items-center gap-2">
            <Trophy className="w-4 h-4" />Custom Designs
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            European Precision
          </span>
          <span className="hidden md:inline">|</span>
          <span className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Premium Studio
          </span>
        </motion.div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black to-transparent" />
    </motion.section>
  )
}
