"use client"

import { motion } from "framer-motion"
import { Shield, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/lib/i18n"
import BackToTopArrow from "@/components/scroll-to-top"

const scrollReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
  viewport: { once: true, margin: "-150px" },
}

export default function ValueProposition() {
  const { t } = useLanguage()
  return (
    <section className="relative bg-linear-to-b from-black to-[#1A1A1A] pt-20 pb-32">
      <BackToTopArrow />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div className="text-center mb-20" {...scrollReveal} transition={{ ease: "easeOut" }}>
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white mb-6">
            {t("value_title")}
          </h2>
          <p className="text-xl md:text-2xl text-[#D1D5DB] font-light max-w-3xl mx-auto">
            {t("value_subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div {...scrollReveal} transition={{ delay: 0.2, ease: "easeOut" }}>
            <Card className="group relative bg-[#0D0D0D] border-white/10 p-12 h-full hover:border-[#D1D5DB]/50 transition-all duration-700 overflow-hidden text-center flex flex-col items-center shadow-2xl">
              {/* Silver Glow Effect - Much more visible */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(209,213,219,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Icon Container with Silver background for visibility */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-linear-to-br from-[#FFFFFF] to-[#A0A0A0] flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">
                <Shield className="w-10 h-10 text-black" />
              </div>
              
              <h3 className="relative z-10 font-heading text-3xl text-white mb-6 font-light tracking-widest italic group-hover:text-[#D1D5DB] transition-colors duration-500">
                {t("value_card1_title")}
              </h3>
              
              <p className="relative z-10 text-lg text-[#D1D5DB]/80 leading-relaxed font-light max-w-sm">
                {t("value_card1_desc")}
              </p>
            </Card>
          </motion.div>

          <motion.div {...scrollReveal} transition={{ delay: 0.4, ease: "easeOut" }}>
            <Card className="group relative bg-[#0D0D0D] border-white/10 p-12 h-full hover:border-[#D1D5DB]/50 transition-all duration-700 overflow-hidden text-center flex flex-col items-center shadow-2xl">
              {/* Silver Glow Effect - Much more visible */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(209,213,219,0.15),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Icon Container with Silver background for visibility */}
              <div className="relative z-10 w-20 h-20 rounded-full bg-linear-to-br from-[#FFFFFF] to-[#A0A0A0] flex items-center justify-center mb-10 shadow-[0_0_20px_rgba(255,255,255,0.2)] group-hover:scale-110 transition-transform duration-500">
                <Heart className="w-10 h-10 text-black" />
              </div>
              
              <h3 className="relative z-10 font-heading text-3xl text-white mb-6 font-light tracking-widest italic group-hover:text-[#D1D5DB] transition-colors duration-500">
                {t("value_card2_title")}
              </h3>
              
              <p className="relative z-10 text-lg text-[#D1D5DB]/80 leading-relaxed font-light max-w-sm">
                {t("value_card2_desc")}
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
