"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Trophy } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import BackToTopArrow from "@/components/scroll-to-top"

const portfolioItems = [
  {
    id: 1,
    image: "/hyperrealistic-portrait-tattoo.jpg",
    title: "Hyper-Realistic Portrait",
    category: "Portrait",
    year: 2024,
    description: "Custom portrait with European precision",
    awards: ["Best Portrait 2024"],
    rotation: -9,
  },
  {
    id: 2,
    image: "/black-and-grey-realism-tattoo.jpg",
    title: "Black and Grey Masterpiece",
    category: "Realism",
    year: 2024,
    description: "Detailed work showing European technique",
    rotation: 6,
  },
  {
    id: 3,
    image: "/full-sleeve-tattoo-realism.jpg",
    title: "Full Sleeve Composition",
    category: "Full Sleeve",
    year: 2023,
    description: "Anatomically fluid design across the arm",
    awards: ["Best Realism 2023"],
    rotation: -6,
  },
  {
    id: 4,
    image: "/realistic-animal-tattoo.jpg",
    title: "Wildlife Realism",
    category: "Realism",
    year: 2024,
    description: "Capturing the spirit of nature",
    rotation: 8,
  },
  {
    id: 5,
    image: "/portrait-tattoo-detail.jpg",
    title: "Emotional Portrait",
    category: "Portrait",
    year: 2023,
    description: "Depth and emotion in every detail",
    rotation: -7,
  },
  {
    id: 6,
    image: "/custom-tattoo-design.jpg",
    title: "Custom Creation",
    category: "Custom",
    year: 2024,
    description: "Unique design tailored to the client's story",
    rotation: 5,
  },
]

export default function PortfolioGallery() {
  const { t } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxItem, setLightboxItem] = useState<(typeof portfolioItems)[0] | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const hasMountedRef = useRef(false)

  const categories = [
    { id: "All", label: t("cat_all") },
    { id: "Portrait", label: t("cat_portrait") },
    { id: "Realism", label: t("cat_realism") },
    { id: "Full Sleeve", label: t("cat_full_sleeve") },
    { id: "Custom", label: t("cat_custom") },
  ]

  // El deck queda montado siempre completo; el filtro sólo decide qué
  // tarjetas participan de la grilla abierta y cuáles quedan ocultas, así
  // el cambio de categoría reacomoda en el lugar sin volver a apilar todo.
  useEffect(() => {
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v))
    const smooth = (t: number) => t * t * (3 - 2 * t)

    const section = sectionRef.current
    const sticky = stickyRef.current
    const deck = deckRef.current
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => c !== null)
    if (!section || !sticky || !deck || cards.length === 0) return

    // El scroll mueve las tarjetas 1 a 1, sin transition (si no, se sienten
    // "atrasadas" respecto del scroll). Sólo al cambiar de filtro se anima
    // el reacomodo, con una transition temporal que se saca enseguida.
    let filterTransitionTimeout: ReturnType<typeof setTimeout> | null = null
    if (hasMountedRef.current) {
      cards.forEach((c) => {
        c.style.transition = "transform 350ms ease-out, opacity 300ms ease-out"
      })
      filterTransitionTimeout = setTimeout(() => {
        cards.forEach((c) => {
          c.style.transition = ""
        })
      }, 380)
    }
    hasMountedRef.current = true

    let targets: { x: number; y: number }[] = []
    let scrubDistance = 0
    let closedY = 0

    function isVisible(index: number) {
      const item = portfolioItems[index]
      return selectedCategory === "All" || item.category === selectedCategory
    }

    function sectionProgress() {
      const r = section!.getBoundingClientRect()
      if (scrubDistance <= 0) return 0
      return clamp(-r.top / scrubDistance, 0, 1)
    }

    function layout() {
      const w = window.innerWidth
      const cols = w < 768 ? 1 : w < 1024 ? 2 : 3
      const gap = w < 768 ? 20 : 32
      const availableWidth = Math.min(w * 0.92, 1216)
      const cw = Math.min(400, (availableWidth - (cols - 1) * gap) / cols)
      const ch = cw * 0.85
      const visibleCount = portfolioItems.filter((_, i) => isVisible(i)).length
      const rows = Math.max(1, Math.ceil(visibleCount / cols))

      const gw = cols * cw + (cols - 1) * gap
      const gh = rows * ch + (rows - 1) * gap

      deck!.style.height = `${gh}px`
      deck!.style.width = `${gw}px`
      closedY = ch / 2 + 80

      cards.forEach((c) => {
        c.style.width = `${cw}px`
        c.style.height = `${ch}px`
      })

      targets = Array.from({ length: visibleCount }, (_, j) => {
        const col = j % cols
        const row = Math.floor(j / cols)
        return {
          x: col * (cw + gap) - gw / 2 + cw / 2,
          y: row * (ch + gap) + ch / 2,
        }
      })

      const stickyHeight = sticky!.getBoundingClientRect().height
      scrubDistance = Math.max(window.innerHeight * 1.1, stickyHeight * 0.5)
      section!.style.height = `${scrubDistance + stickyHeight}px`
    }

    function render() {
      const p = sectionProgress()
      let j = 0
      cards.forEach((c, i) => {
        const baseRot = Number(c.dataset.r) || 0
        const angle = ((i * 63) % 360) * (Math.PI / 180)
        const closedX = Math.cos(angle) * 70
        const closedYi = closedY + Math.sin(angle) * 45

        if (!isVisible(i)) {
          c.style.transform = `translate(-50%, -50%) translate(${closedX}px, ${closedYi}px) rotate(${baseRot}deg) scale(0.8)`
          c.style.opacity = "0"
          c.style.pointerEvents = "none"
          c.style.zIndex = "0"
          return
        }

        const target = targets[j] || { x: closedX, y: closedYi }
        const cp = clamp((p - 0.05 - j * 0.04) / 0.62, 0, 1)
        const e = smooth(cp)
        const tx = closedX + (target.x - closedX) * e
        const ty = closedYi + (target.y - closedYi) * e
        const rot = baseRot * (1 - e)
        const sc = 0.86 + e * 0.14
        c.style.transform = `translate(-50%, -50%) translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${sc})`
        c.style.opacity = "1"
        c.style.pointerEvents = "auto"
        c.style.zIndex = String(j)
        j++
      })
    }

    let ticking = false
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          render()
          ticking = false
        })
        ticking = true
      }
    }
    function onResize() {
      layout()
      render()
    }

    layout()
    render()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      if (filterTransitionTimeout) clearTimeout(filterTransitionTimeout)
    }
  }, [selectedCategory])

  return (
    <>
    <section ref={sectionRef} className="relative">
      <div ref={stickyRef} className="sticky top-0 overflow-hidden bg-linear-to-b from-[#1A1A1A] to-black pb-16">
        <BackToTopArrow />

        <motion.div
          className="text-center pt-20 pb-6 px-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-light text-3xl md:text-5xl text-white mb-3">{t("gallery_title")}</h2>
          <p className="text-lg md:text-xl text-[#D1D5DB] font-light">{t("gallery_subtitle")}</p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-8 px-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-2 rounded-full border transition-all duration-300 font-medium ${selectedCategory === cat.id
                ? "bg-metal-plateado text-black border-white glow-accent scale-105"
                : "bg-white/5 backdrop-blur-md text-white/60 border-white/10 hover:border-metal-plateado hover:text-white hover:bg-white/10"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Deck: fotos apiladas que se abren en grilla al scrollear */}
        <div ref={deckRef} className="relative mx-auto">
          {portfolioItems.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              data-r={item.rotation}
              onClick={() => setLightboxItem(item)}
              className="group absolute left-1/2 top-0 w-full cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_22px_55px_rgba(0,0,0,0.5)] [will-change:transform]"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[10px] uppercase tracking-widest text-metal-plateado mb-1">{item.category}</p>
                <h4 className="font-heading text-lg font-light text-white">{item.title}</h4>
                {item.awards && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5 text-metal-plateado" />
                    <span className="text-[10px] text-metal-plateado">{item.awards[0]}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* CTA After Gallery: fuera de la section pinneada, para que no se
          superponga con el scroll fijo de la galería */}
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <a
          href="/booking"
          className="inline-block px-12 py-5 bg-metal-plateado text-black font-semibold text-lg rounded-full glow-accent hover:bg-white transition-all duration-500 hover:scale-105"
        >
          {t("gallery_cta")}
        </a>
      </motion.div>

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
              className="absolute top-8 right-8 text-white hover:text-metal-plateado transition-colors"
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
                <p className="text-sm uppercase tracking-widest text-metal-plateado mb-2">
                  {lightboxItem.category} • {lightboxItem.year}
                </p>
                <h3 className="font-heading text-3xl text-white mb-3 font-light">{lightboxItem.title}</h3>
                <p className="text-lg text-[#D1D5DB]">{lightboxItem.description}</p>
                {lightboxItem.awards && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <Trophy className="w-5 h-5 text-metal-plateado" />
                    <span className="text-metal-plateado">{lightboxItem.awards[0]}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
