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
      className="absolute top-4 right-6 mr-5 flex items-center gap-1 text-gray-500 hover:text-metal-plateado transition-colors duration-200 group"
    >
      <ArrowUp className="w-7 h-7 transition-transform duration-200 group-hover:-translate-y-0.5 mt-20" />
    </button>
  )
}
