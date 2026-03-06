"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Trophy } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=800&auto=format&fit=crop",
    title: "Hyper-Realistic Portrait",
    category: "Portrait",
    year: 2024,
    description: "Custom portrait with European precision",
    awards: ["Best Portrait 2024"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=800&auto=format&fit=crop",
    title: "Black and Grey Masterpiece",
    category: "Realism",
    year: 2024,
    description: "Detailed work showing European technique",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?q=80&w=800&auto=format&fit=crop",
    title: "Full Sleeve Composition",
    category: "Full Sleeve",
    year: 2023,
    description: "Anatomically fluid design across the arm",
    awards: ["Best Realism 2023"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop",
    title: "Wildlife Realism",
    category: "Realism",
    year: 2024,
    description: "Capturing the spirit of nature",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1605963952402-ddc3501a4e1d?q=80&w=800&auto=format&fit=crop",
    title: "Emotional Portrait",
    category: "Portrait",
    year: 2023,
    description: "Depth and emotion in every detail",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1522864692735-86f3453b3b4f?q=80&w=800&auto=format&fit=crop",
    title: "Custom Creation",
    category: "Custom",
    year: 2024,
    description: "Unique design tailored to the client's story",
  },
]

const categories = ["All", "Portrait", "Realism", "Full Sleeve", "Custom"]

export default function PortfolioGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxItem, setLightboxItem] = useState<(typeof portfolioItems)[0] | null>(null)

  const filteredItems = selectedCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === selectedCategory)

  return (
    <section className="relative bg-linear-to-b from-[#1A1A1A] to-black py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white mb-6">Living Art Gallery</h2>
          <p className="text-xl md:text-2xl text-[#D1D5DB] font-light">Precision, emotion, and timeless beauty</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${selectedCategory === category
                ? "bg-[#0044FF] text-black border-[#0044FF] glow-accent scale-105"
                : "bg-black/40 glass-panel text-[#0044FF] border-[#0044FF]/30 hover:border-[#0044FF] hover:bg-[#0044FF]/10"
                }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.4 },
                }}
                className="group relative cursor-pointer rounded-sm overflow-hidden"
                onClick={() => setLightboxItem(item)}
              >
                <div className="relative h-[400px] md:h-[450px] rounded-2xl overflow-hidden shadow-xl border border-[#0044FF]/10">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 filter hover:brightness-110"
                  />

                  {/* Overlay */}
                  <motion.div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-8 left-8 right-8">
                      <p className="text-xs uppercase tracking-widest text-[#0044FF] mb-2">{item.category}</p>
                      <h4 className="text-2xl font-heading font-light text-white mb-2">{item.title}</h4>
                      <p className="text-sm text-[#D1D5DB]">{item.description}</p>
                      {item.awards && (
                        <div className="mt-3 flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-[#0044FF]" />
                          <span className="text-xs text-[#0044FF]">{item.awards[0]}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* CTA After Gallery */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <a
            href="/booking"
            className="inline-block px-12 py-5 bg-[#0044FF] text-black font-semibold text-lg rounded-full glow-accent hover:bg-white transition-all duration-500 hover:scale-105"
          >
            Ready for your masterpiece? Book your consultation
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
          >
            <button
              className="absolute top-8 right-8 text-white hover:text-[#0044FF] transition-colors"
              onClick={() => setLightboxItem(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <motion.div
              className="max-w-4xl w-full"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] mb-6">
                <Image
                  src={lightboxItem.image || "/placeholder.svg"}
                  alt={lightboxItem.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="text-center">
                <p className="text-sm uppercase tracking-widest text-[#0044FF] mb-2">
                  {lightboxItem.category} • {lightboxItem.year}
                </p>
                <h3 className="font-heading text-3xl text-white mb-3 font-light">{lightboxItem.title}</h3>
                <p className="text-lg text-[#D1D5DB]">{lightboxItem.description}</p>
                {lightboxItem.awards && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5 text-[#0044FF]" />
                    <span className="text-[#0044FF]">{lightboxItem.awards[0]}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
