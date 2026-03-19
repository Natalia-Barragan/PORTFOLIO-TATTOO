"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function FinalCTA() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="consultation" className="relative bg-linear-to-br from-black via-[#1A1A1A] to-[#0A0D1A] py-40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-light text-5xl md:text-7xl text-white mb-6">
            Transforma Tu Visión en Arte Vivo
          </h2>
          <p className="text-xl md:text-2xl text-[#D1D5DB] font-light mb-4">
            Disponibilidad limitada. Reserva tu consulta hoy.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-metal-plateado/70 uppercase tracking-widest">
            <span>💎 Solo Consultas Premium</span>
            <span className="hidden md:inline">|</span>
            <span>Espacios Limitados Mensuales</span>
          </div>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form
            onSubmit={handleSubmit}
            className="bg-[#1A1A1A] border border-gray-300/20 rounded-sm p-8 md:p-12 space-y-6"
          >
            <h3 className="font-heading text-3xl text-metal-plateado mb-8 font-light">Comienza Tu Viaje</h3>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-heading">
                Nombre Completo *
              </Label>
              <Input
                id="name"
                required
                className="bg-[#2A2A2A] border-gray-300/30 text-white focus:border-gray-300"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-heading">
                  Correo Electrónico *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-[#2A2A2A] border-gray-300/30 text-white focus:border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white font-heading">
                  Teléfono *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  className="bg-[#2A2A2A] border-gray-300/30 text-white focus:border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-method" className="text-white font-heading">
                Método de Contacto Preferido
              </Label>
              <Select>
                <SelectTrigger className="bg-[#2A2A2A] border-gray-300/30 text-white">
                  <SelectValue placeholder="Selecciona método" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">Correo</SelectItem>
                  <SelectItem value="phone">Teléfono</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision" className="text-white font-heading">
                Describe Tu Visión *
              </Label>
              <Textarea
                id="vision"
                required
                rows={6}
                placeholder="Cuéntame sobre el tatuaje que estás imaginando. Incluye tamaño, ubicación, preferencias de estilo y detalles significativos."
                className="bg-[#2A2A2A] border-gray-300/30 text-white focus:border-gray-300 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size" className="text-white font-heading">
                Tamaño Aproximado
              </Label>
              <Select>
                <SelectTrigger className="bg-[#2A2A2A] border-gray-300/30 text-white">
                  <SelectValue placeholder="Selecciona tamaño" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Pequeño (5-10 cm)</SelectItem>
                  <SelectItem value="medium">Mediano (10-20 cm)</SelectItem>
                  <SelectItem value="large">Grande (20-30 cm)</SelectItem>
                  <SelectItem value="xlarge">Extra Grande (30+ cm)</SelectItem>
                  <SelectItem value="sleeve">Manga completa/espalda</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-white font-heading">
                Rango de Fechas Preferido
              </Label>
              <Input
                id="date"
                placeholder="p.ej., Marzo 2025 o flexible"
                className="bg-[#2A2A2A] border-gray-300/30 text-white focus:border-gray-300"
              />
            </div>

            <div className="flex items-start space-x-3 pt-4">
              <Checkbox id="terms" required className="border-gray-300/30 data-[state=checked]:bg-metal-plateado" />
              <Label htmlFor="terms" className="text-sm text-[#D1D5DB] leading-relaxed cursor-pointer font-heading">
                Entiendo que esto es una solicitud de consulta y los precios finales se discutirán después de la aprobación del diseño
              </Label>
            </div>

            <Button
              type="submit"
              disabled={submitted}
              className="w-full bg-linear-to-r from-gray-300 to-gray-400 hover:shadow-[0_0_60px_rgba(192, 192, 192,0.6)] text-black font-semibold py-6 text-lg transition-all duration-500"
            >
              {submitted ? (
                <>
                  <Check className="mr-2 w-5 h-5" />
                  ¡Consulta Solicitada!
                </>
              ) : (
                <>
                  <Calendar className="mr-2 w-5 h-5" />
                  Solicitar Consulta
                </>
              )}
            </Button>

            <p className="text-xs text-[#D1D5DB]/70 text-center mt-4">
              Típicamente respondemos en 24 horas. Tu información es confidencial.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
