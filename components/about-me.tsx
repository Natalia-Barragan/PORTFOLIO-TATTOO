"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutMe() {
  const stats = [
    { number: "500+", label: "Tattoos" },
    { number: "10+", label: "Years" },
    { number: "100%", label: "Passion" },
  ]

  return (
    <motion.section
      className="relative py-24 px-6 bg-black text-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
          },
        },
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <motion.div
          className="mb-12"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <p className="text-[#0044FF] text-sm font-semibold tracking-widest uppercase mb-4">
            About Me
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            <div className="relative w-full aspect-square overflow-hidden rounded-lg">
              {/* Diagonal accent line */}
              <div className="absolute inset-0 bg-linear-to-br from-[#0044FF]/20 to-transparent pointer-events-none z-10" />
              <Image
                src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=2000&auto=format&fit=crop"
                alt="Tattoo Artist"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="space-y-8"
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
          >
            {/* Heading */}
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-white mb-2 font-light">
                Passion for Art
              </h2>
              <p className="text-[#0044FF] text-2xl font-semibold">
                Love for Tattoo
              </p>
            </div>

            {/* Description */}
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              With years of experience in the tattoo world, I've developed a unique style that
              combines vibrant energy with European technical precision.
            </p>

            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              Each tattoo is a personalized work of art, designed to tell your story with the
              intensity of Orange Power.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#0044FF]/20">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.6, delay: 0.2 + index * 0.1 },
                    },
                  }}
                >
                  <p className="text-[#0044FF] text-3xl font-bold mb-1">
                    {stat.number}
                  </p>
                  <p className="text-[#9CA3AF] text-sm uppercase tracking-wider">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
