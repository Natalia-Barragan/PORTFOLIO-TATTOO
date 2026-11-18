"use client"

import { ArrowUp } from "lucide-react"

export default function BackToTopArrow() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Volver al inicio"
      className="absolute top-4 right-5 md:right-6 md:mr-5 flex items-center gap-1 text-gray-500 hover:text-metal-plateado transition-colors duration-200 group z-20"
    >
      <ArrowUp className="w-6 h-6 md:w-7 md:h-7 transition-transform duration-200 group-hover:-translate-y-0.5 md:mt-20" />
    </button>
  )
}
