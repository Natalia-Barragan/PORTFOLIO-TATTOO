"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
}

export default function MagneticButton({ children, href, onClick, className = "" }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    setPosition({ x: x * 0.3, y: y * 0.3 })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const buttonClasses = `relative px-12 py-5 bg-metal-plateado text-black font-semibold text-lg rounded-sm overflow-hidden group inline-flex items-center ${className}`

  const content = (
    <>
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
          ease: "linear",
        }}
      />

      <span className="relative z-10 flex items-center">{children}</span>
    </>
  )

  if (href) {
    return (
      <motion.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={position}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 60px rgba(192, 192, 192,0.6)",
        }}
        whileTap={{ scale: 0.98 }}
        className={buttonClasses}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={position}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 60px rgba(192, 192, 192,0.6)",
      }}
      whileTap={{ scale: 0.98 }}
      className={buttonClasses}
    >
      {content}
    </motion.button>
  )
}
