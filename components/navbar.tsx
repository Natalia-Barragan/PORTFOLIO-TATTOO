"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Droplet } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-[#0044FF]/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">

        {/* 1. IZQUIERDA: LOGO + TEXTO */}
        <Link href="/" className="flex items-center gap-2 shrink-0 z-50 group">
          <div className="w-8 h-8 rounded-full bg-[#0044FF]/10 flex items-center justify-center border border-[#0044FF]/30 group-hover:bg-[#0044FF]/20 transition-all duration-300">
            <Droplet className="w-4 h-4 text-[#0044FF]" />
          </div>
          <span className="text-xl font-bold text-white font-heading tracking-wider">
            INK <span className="text-[#0044FF]">STUDIO</span>
          </span>
        </Link>

        {/* 2. DERECHA: TODO EL CONTENIDO */}
        <div className="flex items-center gap-4 md:gap-8">

          {/* A. Enlaces de Texto (Solo Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#about" className="text-gray-400 hover:text-[#0044FF] transition-colors">About</Link>
            <Link href="/#portfolio" className="text-gray-400 hover:text-[#0044FF] transition-colors">Portfolio</Link>
            {/* <Link href="/#process" className="text-gray-400 hover:text-[#0044FF] transition-colors">Process</Link> */}
            <Link href="/#faq" className="text-gray-400 hover:text-[#0044FF] transition-colors">FAQ</Link>
          </div>

          {/* B. Botón Sandwich (Solo Móvil - Izquierda del botón Book) */}
          <button
            className="md:hidden text-white p-1 hover:text-[#0044FF] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* C. Botón Book Now */}
          <Link
            href="/booking"
            className="px-4 py-2 md:px-6 bg-[#0044FF] text-black rounded-sm glow-accent hover:bg-white hover:text-black transition-all font-semibold text-sm md:text-base whitespace-nowrap"
          >
            Book Now
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
            className="md:hidden absolute top-[70px] right-6 w-48 bg-[#0a0a0a] border border-[#0044FF]/20 rounded-xl shadow-2xl overflow-hidden z-40"
          >
            <div className="flex flex-col p-2">
              <Link
                href="/#about"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:bg-[#0044FF]/10 hover:text-[#0044FF] rounded-lg transition-colors text-sm font-medium"
              >
                About
              </Link>
              <Link
                href="/#portfolio"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:bg-[#0044FF]/10 hover:text-[#0044FF] rounded-lg transition-colors text-sm font-medium"
              >
                Portfolio
              </Link>
              {/* <Link
                href="/#process"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:bg-[#0044FF]/10 hover:text-[#0044FF] rounded-lg transition-colors text-sm font-medium"
              >
                Process
              </Link> */}
              <Link
                href="/#faq"
                onClick={() => setIsMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:bg-[#0044FF]/10 hover:text-[#0044FF] rounded-lg transition-colors text-sm font-medium"
              >
                FAQ
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
