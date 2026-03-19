"use client"

import { motion } from "framer-motion"
import { Shield, Droplet, Sun, HeartPulse } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/i18n"
import BackToTopArrow from "@/components/scroll-to-top"

export default function AftercareSection() {
  const { t } = useLanguage()

  const aftercareSteps = [
    {
      icon: Shield,
      title: t("aftercare_step1_title"),
      description: t("aftercare_step1_desc"),
    },
    {
      icon: Droplet,
      title: t("aftercare_step2_title"),
      description: t("aftercare_step2_desc"),
    },
    {
      icon: Sun,
      title: t("aftercare_step3_title"),
      description: t("aftercare_step3_desc"),
    },
    {
      icon: HeartPulse,
      title: t("aftercare_step4_title"),
      description: t("aftercare_step4_desc"),
    },
  ]

  return (
    <section className="relative bg-[#1A1A1A] py-32 overflow-hidden">
      <BackToTopArrow />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white mb-6 uppercase tracking-wider">
            {t("aftercare_title")}
          </h2>
          <div className="w-24 h-1 bg-metal-plateado mx-auto opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {aftercareSteps.map((step, index) => (
            <FlipCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlipCard({ step, index }: { step: any; index: number }) {
  const { t } = useLanguage()
  const Icon = step.icon

  return (
    <motion.div
      className="group perspective-1000 h-[350px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="relative w-full h-full transition-all duration-700 preserve-3d group-hover:rotate-y-180">
        {/* Front side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-[#2A2A2A] border border-gray-300/10 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-xl">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-metal-plateado/50 transition-colors">
            <Icon className="w-8 h-8 text-white/90 group-hover:text-metal-plateado transition-colors" />
          </div>
          <h3 className="font-heading text-2xl text-white font-light uppercase tracking-wide">
            {step.title}
          </h3>
          <div className="mt-8 text-white/20 text-xs uppercase tracking-[0.2em]">{t("aftercare_hover")}</div>
        </div>

        {/* Back side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-metal-plateado rotate-y-180 rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-2xl">
          <h4 className="font-heading text-xl text-black mb-4 font-bold border-b border-black/20 pb-2 w-full">
            {step.title.includes(". ") ? step.title.split(". ")[1] : step.title}
          </h4>
          <p className="text-black/80 text-sm leading-relaxed font-medium">
            {step.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
