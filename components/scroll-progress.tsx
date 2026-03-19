"use client"

import { motion, useScroll } from "framer-motion"

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4A574] to-gray-400 z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
