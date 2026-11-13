"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, Trophy } from "lucide-react"
import { useLanguage, type Language } from "@/lib/i18n"
import BackToTopArrow from "@/components/scroll-to-top"

interface PortfolioItem {
  id: number
  image: string
  category: string
  categoryKey: string
  year: number
  rotation: number
  title: Record<Language, string>
  description: Record<Language, string>
  awards?: string[]
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    image: "/Captura de pantalla 2026-11-12 134940.png",
    category: "Botanical",
    categoryKey: "cat_botanical",
    year: 2024,
    rotation: 5,
    title: {
      es: "Espíritu Indómito",
      en: "Untamed Spirit",
      pt: "Espírito Indomável",
    },
    description: {
      es: "Retrato equino con movimiento fluido y sombreado de puntillismo fino",
      en: "Equine portrait with fluid motion and fine stipple shading",
      pt: "Retrato equino com movimento fluido e sombreado de pontilhismo fino",
    },
  },
  {
    id: 2,
    image: "/DSC_0204.jpeg",
    category: "Botanical",
    categoryKey: "cat_botanical",
    year: 2024,
    rotation: 6,
    title: {
      es: "Ave del Paraíso",
      en: "Bird of Paradise",
      pt: "Ave do Paraíso",
    },
    description: {
      es: "Composición botánica anatómica con texturas orgánicas en hombro y brazo",
      en: "Anatomical botanical composition with organic textures on shoulder and arm",
      pt: "Composição botânica anatômica com texturas orgânicas no ombro e braço",
    },
  },
  {
    id: 3,
    image: "/IMG_0266.jpg",
    category: "Botanical",
    categoryKey: "cat_botanical",
    year: 2024,
    rotation: -6,
    title: {
      es: "Martín Pescador",
      en: "Kingfisher",
      pt: "Martim-Pescador",
    },
    description: {
      es: "Ilustración de fauna con alto nivel de detalle y textura en el plumaje",
      en: "Wildlife illustration with high detail and plumage texture",
      pt: "Ilustração de fauna com alto nível de detalhe e textura na plumagem",
    },
  },
  {
    id: 4,
    image: "/CE0D139D-F735-42A8-8AF1-36B5E5299260.jpg",
    category: "Custom",
    categoryKey: "cat_custom",
    year: 2024,
    rotation: 8,
    title: {
      es: "Sagrado Corazón y Mirada",
      en: "Sacred Heart & Gaze",
      pt: "Sagrado Coração e Olhar",
    },
    description: {
      es: "Diseño de autor combinando simbolismo clásico, puntillismo y realismo expresivo",
      en: "Signature design combining classic symbolism, dotwork, and expressive realism",
      pt: "Design autoral combinando simbolismo clássico, pontilhismo e realismo expressivo",
    },
  },
  {
    id: 5,
    image: "/DSC_0013.JPG",
    category: "Botanical",
    categoryKey: "cat_botanical",
    year: 2024,
    rotation: -7,
    title: {
      es: "Brote de Helecho",
      en: "Unfurling Fern",
      pt: "Broto de Samambaia",
    },
    description: {
      es: "Pieza botánica que acompaña el movimiento natural del antebrazo",
      en: "Botanical piece flowing with the natural movement of the forearm",
      pt: "Peça botânica que acompanha o movimento natural do antebraço",
    },
  },
  {
    id: 6,
    image: "/IMG_2580.jpg",
    category: "Fine Line",
    categoryKey: "cat_fineline",
    year: 2024,
    rotation: 5,
    title: {
      es: "Mariposa en Línea Fina",
      en: "Fine Line Butterfly",
      pt: "Borboleta em Fine Line",
    },
    description: {
      es: "Trazo delicado y sutil con microdetalles en las alas",
      en: "Delicate and subtle stroke with micro-details on the wings",
      pt: "Traço delicado e sutil com microdetalhes nas asas",
    },
  },
  {
    id: 7,
    image: "/9782E20A-CD9F-4EA8-8758-F595A9DBDB93.jpg",
    category: "Portrait",
    categoryKey: "cat_portrait",
    year: 2024,
    rotation: -9,
    title: {
      es: "Busto Clásico",
      en: "Classical Bust",
      pt: "Busto Clássico",
    },
    description: {
      es: "Escultura grecorromana trabajada con sombreado de puntillismo y línea fina",
      en: "Greco-Roman sculpture crafted with stipple shading and fine line",
      pt: "Escultura greco-romana trabalhada com sombreado pontilhado e linha fina",
    },
  },
  {
    id: 8,
    image: "/IMG_0803.JPG",
    category: "Fine Line",
    categoryKey: "cat_fineline",
    year: 2024,
    rotation: 7,
    title: {
      es: "Mirada Sensible",
      en: "Sensitive Gaze",
      pt: "Olhar Sensível",
    },
    description: {
      es: "Ojo expresivo con pupila de corazón y detalles botánicos en trazo fino",
      en: "Expressive eye with heart pupil and fine line botanical details",
      pt: "Olho expressivo com pupila de coração e detalhes botânicos em traço fino",
    },
  },
  {
    id: 9,
    image: "/IMG_1762.jpg",
    category: "Portrait",
    categoryKey: "cat_portrait",
    year: 2024,
    rotation: -8,
    title: {
      es: "Ilustración Anime Fine Line",
      en: "Fine Line Anime Illustration",
      pt: "Ilustração Anime Fine Line",
    },
    description: {
      es: "Líneas limpias y contraste sólido para capturar la esencia del personaje",
      en: "Clean lines and solid contrast capturing the character's essence",
      pt: "Linhas limpas e contraste sólido para capturar a essência da personagem",
    },
  },
  {
    id: 10,
    image: "/4FBE15E3-3008-4C24-A6A0-C4CE367CD900.jpg",
    category: "Fine Line",
    categoryKey: "cat_fineline",
    year: 2024,
    rotation: -4,
    title: {
      es: "Destello Minimalista",
      en: "Minimalist Sparkle",
      pt: "Brilho Minimalista",
    },
    description: {
      es: "Geometría limpia y trazo fino impecable sobre la piel",
      en: "Clean geometry and impeccable fine line on the skin",
      pt: "Geometria limpa e traço fino impecável sobre a pele",
    },
  },
  {
    id: 11,
    image: "/Captura de pantalla 2026-11-12 134822.png",
    category: "Custom",
    categoryKey: "cat_custom",
    year: 2024,
    rotation: 7,
    title: {
      es: "Mirada Radiante",
      en: "Radiant Gaze",
      pt: "Olhar Radiante",
    },
    description: {
      es: "Ojo realista enmarcado en destellos de línea sólida y sombreado sutil",
      en: "Realistic eye framed by solid line rays and subtle shading",
      pt: "Olho realista emoldurado por raios de linha sólida e sombreado sutil",
    },
  },
  {
    id: 12,
    image: "/Captura de pantalla 2026-11-12 134920.png",
    category: "Botanical",
    categoryKey: "cat_botanical",
    year: 2024,
    rotation: -6,
    title: {
      es: "Mariposa Blackwork",
      en: "Blackwork Butterfly",
      pt: "Borboleta Blackwork",
    },
    description: {
      es: "Contraste profundo y puntillismo orgánico en las alas",
      en: "Deep contrast and organic dotwork across the wings",
      pt: "Contraste profundo e pontilhismo orgânico nas asas",
    },
  },
  {
    id: 13,
    image: "/IMG_3593.jpg",
    category: "Custom",
    categoryKey: "cat_custom",
    year: 2024,
    rotation: -5,
    title: {
      es: "Sagrado Corazón en Llamas",
      en: "Flaming Sacred Heart",
      pt: "Sagrado Coração em Chamas",
    },
    description: {
      es: "Composición simétrica central en pecho con sombreado suave y espinas",
      en: "Central symmetrical chest composition with soft shading and thorns",
      pt: "Composição simétrica central no peito com sombreado suave e espinhos",
    },
  },
]

export default function PortfolioGallery() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const deckRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const hasMountedRef = useRef(false)

  const categories = [
    { id: "All", label: t("cat_all") },
    { id: "Fine Line", label: t("cat_fineline") },
    { id: "Botanical", label: t("cat_botanical") },
    { id: "Portrait", label: t("cat_portrait") },
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

    let targets: { x: number; y: number }[] = []
    let scrubDistance = 0
    let closedY = 0

    function isVisible(_index: number) {
      return true
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
        const itemsInThisRow = row === rows - 1 ? visibleCount - row * cols : cols
        const rowWidth = itemsInThisRow * cw + (itemsInThisRow - 1) * gap
        return {
          x: col * (cw + gap) - rowWidth / 2 + cw / 2,
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
        const isTopCard = i === cards.length - 1
        const baseRot = Number(c.dataset.r) || 0
        const angle = ((i * 63) % 360) * (Math.PI / 180)
        const closedX = isTopCard ? 0 : Math.cos(angle) * 70
        const closedYi = isTopCard ? closedY : closedY + Math.sin(angle) * 45

        if (!isVisible(i)) {
          c.style.transform = `translate(-50%, -50%) translate(${closedX}px, ${closedYi}px) rotate(${baseRot}deg) scale(0.8)`
          c.style.opacity = "0"
          c.style.pointerEvents = "none"
          c.style.zIndex = "0"
          return
        }

        const target = targets[j] || { x: closedX, y: closedYi }
        const stagger = targets.length > 1 ? Math.min(0.04, 0.28 / (targets.length - 1)) : 0
        const cp = clamp((p - 0.05 - j * stagger) / 0.62, 0, 1)
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
    }
  })

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
          {/* <motion.div
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
          </motion.div> */}

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
                  alt={item.title[language]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 filter group-hover:brightness-110"
                />
                {/* <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-[10px] uppercase tracking-widest text-metal-plateado">{t(item.categoryKey)}</p>
                </div> */}
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
              <div className="relative h-[80vh]">
                <Image
                  src={lightboxItem.image || "/placeholder.svg"}
                  alt={t(lightboxItem.categoryKey)}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
