"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Star, Medal, Palette, Heart, Globe, Feather, Pencil, Microscope, Sparkles } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function TrustBar() {
  const { t } = useLanguage()

  const awards = [
    { icon: Palette, text: t("trust_1") },
    { icon: Heart, text: t("trust_2") },
    { icon: Globe, text: t("trust_3") },
    { icon: Feather, text: t("trust_4") },
    { icon: Pencil, text: t("trust_5") },
    { icon: Microscope, text: t("trust_6") },
    { icon: Sparkles, text: t("trust_7") },
    { icon: Star, text: t("trust_8") },
    { icon: Award, text: t("trust_9") },
  ]

  return (
    <section className="relative bg-black border-y border-gray-300/20 py-12 overflow-hidden">
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
            <div key={index} className="flex items-center gap-3 text-metal-plateado whitespace-nowrap">
              <Icon className="w-6 h-6" />
              <span className="text-lg font-light tracking-wide">{award.text}</span>
            </div>
          )
        })}
      </motion.div>
    </section>
  )
}
