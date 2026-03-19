"use client"

import { motion } from "framer-motion"
import { Trophy, Award, Star } from "lucide-react"
import { Card } from "@/components/ui/card"

const awards = [
  {
    icon: Trophy,
    title: "Multiple International Awards",
    description: "Realism and Portrait Categories",
    year: "2018–2024",
  },
  {
    icon: Award,
    title: "European Trained",
    description: "Classic Realism Techniques",
    year: "Master Level",
  },
  {
    icon: Star,
    title: "Premium Studio",
    description: "Exclusive Location",
    year: "Est. 2018",
  },
]

export default function AwardsSection() {
  return (
    <section className="relative bg-[#1A1A1A] py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white mb-6">Internationally Recognized Excellence</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {awards.map((award, index) => {
            const Icon = award.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <Card className="bg-[#2A2A2A] border-gray-300/20 p-10 text-center h-full hover:border-gray-300 hover:shadow-[0_0_40px_rgba(192, 192, 192,0.2)] transition-all duration-500">
                  <Icon className="w-16 h-16 text-metal-plateado mx-auto mb-6" />
                  <h3 className="font-heading text-2xl text-white mb-3 font-light">{award.title}</h3>
                  <p className="text-lg text-[#D1D5DB] mb-2">{award.description}</p>
                  <p className="text-sm text-metal-plateado/70">{award.year}</p>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
