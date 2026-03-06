"use client"

import { motion } from "framer-motion"
import { Calendar, MessageCircle, Upload, Clock, Users, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"

interface BookingChoiceProps {
  onSelectQuick: () => void
  onSelectFull: () => void
}

export default function BookingChoice({ onSelectQuick, onSelectFull }: BookingChoiceProps) {
  return (
    <section id="consultation" className="relative bg-linear-to-br from-black via-[#1A1A1A] to-[#2A1810] py-40">
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
            Elige tu camino hacia el arte de tatuaje excepcional
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Quick Consultation */}
          <motion.div
            className="bg-[#1A1A1A] border border-[#0044FF]/20 rounded-sm p-8 md:p-10 hover:border-[#0044FF]/50 transition-all duration-300"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <MessageCircle className="w-12 h-12 text-[#0044FF] mb-4" />
              <h3 className="font-heading text-3xl text-white mb-3 font-light">Consulta Rápida</h3>
              <p className="text-[#D1D5DB] leading-relaxed mb-6">
                ¿No estás seguro de tu diseño o qué artista elegir? Reserva una consulta rápida primero. Nuestros expertos te ayudarán a planificar el tatuaje perfecto.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Clock className="w-5 h-5 text-[#0044FF]" />
                <span>Consulta gratuita de 15 minutos</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Users className="w-5 h-5 text-[#0044FF]" />
                <span>Guía de diseño y emparejamiento de artista</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <DollarSign className="w-5 h-5 text-[#0044FF]" />
                <span>Estimaciones de precios</span>
              </div>
            </div>

            <Button
              onClick={onSelectQuick}
              className="w-full bg-[#2A2A2A] hover:bg-[#0044FF]/20 text-[#0044FF] border border-[#0044FF]/30 hover:border-[#0044FF] font-semibold py-6 text-lg transition-all duration-300"
            >
              Reservar Consulta
            </Button>
          </motion.div>

          {/* Ready to Book */}
          <motion.div
            className="bg-linear-to-br from-[#1A1A1A] to-[#2A1810] border border-[#0044FF]/40 rounded-sm p-8 md:p-10 hover:border-[#0044FF] transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-4 right-4 bg-[#0044FF] text-black text-xs font-bold px-3 py-1 rounded-full">
              RECOMENDADO
            </div>

            <div className="mb-6">
              <Calendar className="w-12 h-12 text-[#0044FF] mb-4" />
              <h3 className="font-heading text-3xl text-white mb-3 font-light">Listo para Reservar</h3>
              <p className="text-[#D1D5DB] leading-relaxed mb-6">
                ¿Ya tienes tu diseño listo? Comienza el proceso de reserva y asegura tu cita con cualquiera de nuestros talentosos artistas.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Users className="w-5 h-5 text-[#0044FF]" />
                <span>Elige entre 10+ artistas residentes</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Upload className="w-5 h-5 text-[#0044FF]" />
                <span>Sube imágenes de referencia</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Calendar className="w-5 h-5 text-[#0044FF]" />
                <span>Horarios flexibles</span>
              </div>
            </div>

            <Button
              onClick={onSelectFull}
              className="w-full bg-[#0044FF] hover:shadow-[0_0_60px_rgba(255,140,66,0.6)] text-black font-semibold py-6 text-lg transition-all duration-500"
            >
              Comenzar Proceso de Reserva
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
