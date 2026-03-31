"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useLanguage } from "@/lib/i18n"
import BackToTopArrow from "@/components/scroll-to-top"

export default function AboutMe() {
  const { t } = useLanguage()
  const [currentImage, setCurrentImage] = useState(0)
  const images = ["/Coni1.jpg", "/Coni2.jpg"]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const stats = [
    { number: "500+", label: t("about_stat1") },
    { number: "15+", label: t("about_stat2") },
    { number: "100%", label: t("about_stat3") },
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
      <BackToTopArrow />
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <p className="text-metal-plateado text-sm font-semibold tracking-widest uppercase mb-4">
            {t("about_label")}
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
            <div className="relative w-full aspect-square overflow-hidden rounded-lg shadow-2xl border border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[currentImage]}
                    alt="Coni Pérez"
                    fill
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none z-10" />
              
              {/* Image Indicators */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImage === i ? "bg-white w-6" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
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
                {t("about_title")}
              </h2>
              <p className="text-metal-plateado text-2xl font-semibold">
                {t("about_subtitle")}
              </p>
            </div>

            {/* Description */}
            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              {t("about_desc1")}
            </p>

            <p className="text-[#D1D5DB] text-lg leading-relaxed">
              {t("about_desc2")}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-300/20">
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
                  <p className="text-metal-plateado text-3xl font-bold mb-1">
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
