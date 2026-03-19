"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Sparkles, Eye, User, Layers, Crown } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

const features = [
  {
    icon: Sparkles,
    color: "#d1d5db",
    title: "100% Custom Designs",
    description:
      "Every tattoo is created from scratch, inspired by your personal story and energy. No flash. No templates. Fully custom creation.",
    imagePosition: "left",
    image: "/custom-tattoo-design.jpg",
  },
  {
    icon: Eye,
    color: "#d1d5db",
    title: "High-Precision Realism",
    description:
      "Details, contrast, and textures that turn skin into living art. Influenced by European realism masters.",
    imagePosition: "right",
    image: "/hyperrealistic-portrait-tattoo.jpg",
  },
  {
    icon: User,
    color: "#d1d5db",
    title: "Exclusive Artistic Experience",
    description:
      "Direct communication with you—no middlemen. A clear, professional process from consultation to aftercare.",
    imagePosition: "left",
    image: "/black-and-grey-realism-tattoo.jpg",
  },
  {
    icon: Layers,
    color: "#d1d5db",
    title: "Perfect Anatomical Composition",
    description:
      "Each piece adapts to your body's movement and shape for complete visual harmony. Art that flows with you.",
    imagePosition: "right",
    image: "/full-sleeve-tattoo-realism.jpg",
  },
  {
    icon: Crown,
    color: "#d1d5db",
    title: "Premium Atmosphere, Human Approach",
    description:
      "Sessions designed to connect, inspire, and experience art with calm and respect. Luxury studio environment.",
    imagePosition: "left",
    image: "/portrait-tattoo-detail.jpg",
  },
]

function FeatureItem({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const ref = useRef(null)

  // Staggered top value so cards stack nicely
  const topOffset = 150 + index * 40;

  const Icon = feature.icon

  return (
    <motion.div
      ref={ref}
      className={`sticky flex flex-col md:flex-row gap-12 items-center p-8 md:p-12 mb-24 rounded-3xl border border-gray-300/20 shadow-2xl backdrop-blur-xl bg-[#131313]/90 overflow-hidden`}
      style={{ top: `${topOffset}px` }}
      initial={{ opacity: 0, scale: 0.95, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <div className={`w-full md:w-1/2 z-10 ${feature.imagePosition === "right" ? "md:order-1" : "md:order-2"}`}>
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-metal-plateado/10 mb-8 border border-gray-300/30">
          <Icon className="w-8 h-8" style={{ color: feature.color }} />
        </div>
        <h3 className="font-heading text-4xl md:text-5xl text-white mb-6 font-light leading-tight">{feature.title}</h3>
        <p className="text-xl text-[#D1D5DB] leading-relaxed font-light">{feature.description}</p>
      </div>

      <div
        className={`relative w-full md:w-1/2 h-[450px] md:h-[600px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] ${feature.imagePosition === "right" ? "md:order-2" : "md:order-1"
          }`}
      >
        <Image
          src={feature.image || "/placeholder.svg"}
          alt={feature.title}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-black/80 via-transparent to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

export default function FeaturesShowcase() {
  return (
    <section className="relative bg-black py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {features.map((feature, index) => (
          <FeatureItem key={index} feature={feature} index={index} />
        ))}
      </div>
    </section>
  )
}
