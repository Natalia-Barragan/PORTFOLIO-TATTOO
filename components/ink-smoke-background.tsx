"use client"

import { motion } from "framer-motion"

// Nebulosa generada (no una foto): un filamento de gas con textura real de
// ruido fractal, magenta en una punta y azul en la otra. Nada de bordes de
// recorte ni artefactos de imagen — es 100% CSS/SVG.
function cloudDataUri(
  baseFrequency: string,
  octaves: number,
  seed: number,
  rgb: [number, number, number],
  alphaMul: number,
  alphaOffset: number
) {
  const [r, g, b] = rgb
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='900' height='900'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${baseFrequency}' numOctaves='${octaves}' seed='${seed}' stitchTiles='stitch' result='noise'/><feColorMatrix in='noise' type='matrix' values='0 0 0 0 ${r}  0 0 0 0 ${g}  0 0 0 0 ${b}  0 0 0 ${alphaMul} ${alphaOffset}'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

// La frecuencia del ruido es distinta en cada eje (fx << fy): eso alarga
// las formas en una dirección, dando el filamento fino y largo real.
const magentaCloud = cloudDataUri("0.006 0.02", 5, 11, [0.85, 0.2, 0.7], 3, -1.3)
const blueCloud = cloudDataUri("0.007 0.021", 5, 29, [0.15, 0.55, 0.95], 3, -1.3)

// PRNG determinístico (misma secuencia en servidor y cliente, sin
// mismatches de hidratación) para tirar el cielo estrellado.
function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

// El plateado/blanco predomina; sólo una minoría de estrellas tiene un
// tinte de color (celeste o dorado pálido) para dar variedad real de cielo.
const starColors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#cfe0ff", "#ffe9c2"]

const rand = seededRandom(42)
const stars = Array.from({ length: 100 }, () => {
  const size = 1.5 + rand() * 3
  return {
    top: `${rand() * 100}%`,
    left: `${rand() * 100}%`,
    size,
    duration: 2 + rand() * 3.5,
    delay: rand() * 5,
    peak: 0.65 + rand() * 0.35,
    color: starColors[Math.floor(rand() * starColors.length)],
  }
})

// Estrellas "hero": más grandes, con destello en cruz, para que haya
// puntos que realmente se noten a simple vista.
const heroStars = [
  { top: "14%", left: "76%", size: 34, breathe: 4.5, delay: 0 },
  { top: "68%", left: "14%", size: 30, breathe: 5.2, delay: 1.2 },
  { top: "36%", left: "90%", size: 22, breathe: 3.8, delay: 2.4 },
  { top: "84%", left: "58%", size: 26, breathe: 4.8, delay: 0.6 },
  { top: "6%", left: "38%", size: 20, breathe: 4, delay: 3 },
]

function HeroStar({
  top,
  left,
  size,
  breathe,
  delay,
}: {
  top: string
  left: string
  size: number
  breathe: number
  delay: number
}) {
  return (
    <motion.div
      className="absolute"
      style={{ top, left, width: size, height: size }}
      animate={{ scale: [0.5, 1, 0.5], opacity: [0.35, 1, 0.35] }}
      transition={{ duration: breathe, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        style={{ width: size * 0.16, height: size * 0.16, boxShadow: `0 0 ${size * 0.5}px rgba(255,255,255,0.95)` }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-full w-[1.5px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "linear-gradient(180deg, transparent, #fff 50%, transparent)" }}
      />
      <div
        className="absolute left-1/2 top-1/2 h-[1.5px] w-full -translate-x-1/2 -translate-y-1/2"
        style={{ background: "linear-gradient(90deg, transparent, #fff 50%, transparent)" }}
      />
    </motion.div>
  )
}

// Estrellas fugaces: grandes, brillantes, con glow, cruzando la pantalla
// en diagonal y desvaneciéndose. Varias, para que se note el efecto.
const shootingStars = [
  { top: "8%", left: "4%", dx: 380, dy: 200, duration: 1.6, delay: 0.5, repeatDelay: 5 },
  { top: "62%", left: "90%", dx: -360, dy: 180, duration: 1.4, delay: 3, repeatDelay: 5.5 },
  { top: "18%", left: "72%", dx: -320, dy: 220, duration: 1.7, delay: 5.5, repeatDelay: 4.5 },
  { top: "80%", left: "8%", dx: 360, dy: -190, duration: 1.5, delay: 1.8, repeatDelay: 6 },
  { top: "4%", left: "45%", dx: 300, dy: 240, duration: 1.5, delay: 7, repeatDelay: 5 },
  { top: "45%", left: "6%", dx: 340, dy: -160, duration: 1.6, delay: 4.2, repeatDelay: 5.8 },
  { top: "88%", left: "60%", dx: -330, dy: -200, duration: 1.4, delay: 8.5, repeatDelay: 5.2 },
]

function ShootingStar({
  top,
  left,
  dx,
  dy,
  duration,
  delay,
  repeatDelay,
}: {
  top: string
  left: string
  dx: number
  dy: number
  duration: number
  delay: number
  repeatDelay: number
}) {
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI
  return (
    <motion.div
      className="absolute"
      style={{
        top,
        left,
        width: 190,
        height: 3,
        background: "linear-gradient(90deg, transparent, #cfcfe0 40%, #ffffff)",
        borderRadius: 9999,
        transformOrigin: "0% 50%",
        rotate: `${angle}deg`,
        filter: "drop-shadow(0 0 6px rgba(255,255,255,0.9)) drop-shadow(0 0 14px rgba(200,200,220,0.6))",
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: [0, 1, 1, 0], x: [0, dx], y: [0, dy] }}
      transition={{
        duration,
        delay,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay,
        ease: "easeIn",
        times: [0, 0.1, 0.7, 1],
      }}
    />
  )
}

export default function InkSmokeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Galaxia lejana, chica y confinada a la esquina superior derecha:
          un solo filamento con magenta en una punta y azul en la otra,
          recortado limpio dentro de esta caja (sin bordes duros). */}
      <div
        className="absolute overflow-hidden -top-[6%] -right-[6%] w-[75vw] h-[75vw] md:-top-[22%] md:-right-[22%] md:w-[82vw] md:h-[82vw]"
        style={{
          maxWidth: 920,
          maxHeight: 920,
          maskImage: "radial-gradient(circle at 62% 32%, black 0%, black 24%, transparent 52%)",
          WebkitMaskImage: "radial-gradient(circle at 62% 32%, black 0%, black 24%, transparent 52%)",
        }}
      >
        <motion.div
          className="absolute"
          style={{
            inset: "-150%",
            backgroundImage: `url("${magentaCloud}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
            filter: "blur(6px)",
            opacity: 0.85,
            rotate: "-25deg",
            maskImage: "linear-gradient(115deg, black 0%, black 40%, transparent 58%)",
            WebkitMaskImage: "linear-gradient(115deg, black 0%, black 40%, transparent 58%)",
          }}
          animate={{ x: [0, 15, -8, 0], y: [0, -10, 8, 0] }}
          transition={{ duration: 42, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute"
          style={{
            inset: "-150%",
            backgroundImage: `url("${blueCloud}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "screen",
            filter: "blur(6px)",
            opacity: 0.8,
            rotate: "-25deg",
            maskImage: "linear-gradient(115deg, transparent 42%, black 60%, black 100%)",
            WebkitMaskImage: "linear-gradient(115deg, transparent 42%, black 60%, black 100%)",
          }}
          animate={{ x: [0, -10, 8, 0], y: [0, 8, -6, 0] }}
          transition={{ duration: 36, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Cielo estrellado: puntitos que titilan bien fuerte y claro */}
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
          }}
          animate={{ opacity: [0.2, s.peak, 0.2], scale: [0.8, 1.4, 0.8] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Estrellas hero, con destello en cruz */}
      {heroStars.map((s, i) => (
        <HeroStar key={i} {...s} />
      ))}

      {/* Estrellas fugaces cruzando la pantalla */}
      {shootingStars.map((s, i) => (
        <ShootingStar key={i} {...s} />
      ))}

      {/* Grano sutil para textura cinematográfica */}
      <div
        className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
