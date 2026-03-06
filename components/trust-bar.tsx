"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Star, Medal } from "lucide-react"

const awards = [
  { icon: Trophy, text: "Best Realism 2024" },
  { icon: Award, text: "Excellence in Portraits" },
  { icon: Star, text: "European Technique" },
  { icon: Medal, text: "Premium Studio" },
  { icon: Trophy, text: "Multiple Awards" },
  { icon: Award, text: "International Recognition" },
  { icon: Star, text: "Realism Mastery" },
  { icon: Medal, text: "Custom Artwork" },
]

export default function TrustBar() {
  return (
    <section className="relative bg-black border-y border-[#0044FF]/20 py-12 overflow-hidden">
      <motion.div
        className="flex gap-16"
        animate={{
          x: [0, -1920],
        }}
        transition={{
          duration: 40,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        {[...awards, ...awards, ...awards].map((award, index) => {
          const Icon = award.icon
          return (
            <div key={index} className="flex items-center gap-3 text-[#0044FF] whitespace-nowrap">
              <Icon className="w-6 h-6" />
              <span className="text-lg font-light tracking-wide">{award.text}</span>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
