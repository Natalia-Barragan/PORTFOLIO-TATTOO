"use client"

import { motion } from "framer-motion"
import { MessageCircle, PenTool, Palette, Heart } from "lucide-react"

const steps = [
  {
    icon: MessageCircle,
    title: "Free Consultation",
    description: "Share your vision. We discuss design, placement, size, and investment.",
    duration: "30–60 min (In-person or video)",
  },
  {
    icon: PenTool,
    title: "Custom Design Creation",
    description: "I create your unique design based on our conversation and your story.",
    duration: "1–2 weeks",
  },
  {
    icon: Palette,
    title: "Tattoo Session(s)",
    description: "Professional, comfortable environment. We bring your art to life with precision.",
    duration: "Varies by complexity",
  },
  {
    icon: Heart,
    title: "Lifetime Aftercare",
    description: "Detailed healing instructions and ongoing support for your investment.",
    duration: "Ongoing",
  },
]

export default function ProcessTimeline() {
  return (
    <section className="relative bg-black py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white mb-6">Your Journey to Living Art</h2>
          <p className="text-xl md:text-2xl text-[#D1D5DB] font-light">A professional, transparent process from consultation to aftercare</p>
        </motion.div>

        <div className="relative">

          <div className="grid md:grid-cols-4 gap-8 md:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Icon circle */}
                    <div className="relative z-10 w-20 h-20 rounded-full bg-[#0044FF] flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,68,255,0.4)]">
                      <Icon className="w-10 h-10 text-black" />
                    </div>

                    {/* Step number */}
                    <div className="text-sm text-[#0044FF] font-semibold mb-3 tracking-widest">STEP {index + 1}</div>

                    <h3 className="font-heading text-2xl text-white mb-4 font-light">{step.title}</h3>

                    <p className="text-[#D1D5DB] mb-4 leading-relaxed">{step.description}</p>

                    <p className="text-sm text-[#0044FF]/70 italic">{step.duration}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
