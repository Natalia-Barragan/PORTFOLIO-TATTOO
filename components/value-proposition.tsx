"use client"

import { motion } from "framer-motion"
import { Shield, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"

const scrollReveal = {
  initial: { opacity: 0, y: 60 },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 0.61, 0.36, 1],
    },
  },
  viewport: { once: true, margin: "-150px" },
}

export default function ValueProposition() {
  return (
    <section className="relative bg-linear-to-b from-black to-[#1A1A1A] py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div className="text-center mb-20" {...scrollReveal}>
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white mb-6">
            Your Fear of Choosing the Wrong Artist Ends Here
          </h2>
          <p className="text-xl md:text-2xl text-[#D1D5DB] font-light max-w-3xl mx-auto">
            Experience meets exclusivity. Precision meets emotion.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div {...scrollReveal} transition={{ delay: 0.2 }}>
            <Card className="bg-[#1A1A1A] border-[#0044FF]/20 p-12 h-full hover:border-[#0044FF]/40 transition-colors duration-500">
              <Shield className="w-12 h-12 text-[#0044FF] mb-6" />
              <h3 className="font-heading text-3xl text-white mb-4 font-light">International Award-Winning Experience</h3>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                Multiple awards in realism and portrait work. European-trained technique delivering museum-quality results on your skin.
              </p>
            </Card>
          </motion.div>

          <motion.div {...scrollReveal} transition={{ delay: 0.4 }}>
            <Card className="bg-[#1A1A1A] border-[#0044FF]/20 p-12 h-full hover:border-[#0044FF]/40 transition-colors duration-500">
              <Heart className="w-12 h-12 text-[#0044FF] mb-6" />
              <h3 className="font-heading text-3xl text-white mb-4 font-light">Premium, Transparent Process</h3>
              <p className="text-lg text-[#D1D5DB] leading-relaxed">
                No surprises. Clear pricing, personalized consultation, and direct communication. You're investing in art, not uncertainty.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
