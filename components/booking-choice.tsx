"use client"

import { motion } from "framer-motion"
import { Calendar, MessageCircle, Upload, Clock, DollarSign, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n"

interface BookingChoiceProps {
  onSelectQuick: () => void
  onSelectFull: () => void
}

export default function BookingChoice({ onSelectQuick, onSelectFull }: BookingChoiceProps) {
  const { t } = useLanguage()

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
            {t("booking_choice_title")}
          </h2>
          <p className="text-xl md:text-2xl text-[#D1D5DB] font-light mb-4">
            {t("booking_choice_subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Quick Consultation */}
          <motion.div
            className="bg-[#1A1A1A] border border-gray-300/20 rounded-sm p-8 md:p-10 hover:border-gray-300/50 transition-all duration-300"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <MessageCircle className="w-12 h-12 text-metal-plateado mb-4" />
              <h3 className="font-heading text-3xl text-white mb-3 font-light">{t("booking_quick_title")}</h3>
              <p className="text-[#D1D5DB] leading-relaxed mb-6">
                {t("booking_quick_desc")}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Clock className="w-5 h-5 text-metal-plateado" />
                <span>{t("booking_quick_feat1")}</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Palette className="w-5 h-5 text-metal-plateado" />
                <span>{t("booking_quick_feat2")}</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <DollarSign className="w-5 h-5 text-metal-plateado" />
                <span>{t("booking_quick_feat3")}</span>
              </div>
            </div>

            <Button
              onClick={onSelectQuick}
              className="w-full bg-[#2A2A2A] hover:bg-metal-plateado/20 text-metal-plateado border border-gray-300/30 hover:border-gray-300 font-semibold py-6 text-lg transition-all duration-300"
            >
              {t("booking_quick_btn")}
            </Button>
          </motion.div>

          {/* Ready to Book */}
          <motion.div
            className="bg-linear-to-br from-[#1A1A1A] to-[#0A0D1A] border border-gray-300/40 rounded-sm p-8 md:p-10 hover:border-gray-300 transition-all duration-300 relative overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-4 right-4 bg-metal-plateado text-black text-xs font-bold px-3 py-1 rounded-full">
              {t("booking_recommended")}
            </div>

            <div className="mb-6">
              <Calendar className="w-12 h-12 text-metal-plateado mb-4" />
              <h3 className="font-heading text-3xl text-white mb-3 font-light">{t("booking_full_title")}</h3>
              <p className="text-[#D1D5DB] leading-relaxed mb-6">
                {t("booking_full_desc")}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Calendar className="w-5 h-5 text-metal-plateado" />
                <span>{t("booking_full_feat1")}</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Upload className="w-5 h-5 text-metal-plateado" />
                <span>{t("booking_full_feat2")}</span>
              </div>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <Clock className="w-5 h-5 text-metal-plateado" />
                <span>{t("booking_full_feat3")}</span>
              </div>
            </div>

            <Button
              onClick={onSelectFull}
              className="w-full bg-metal-plateado hover:shadow-[0_0_60px_rgba(192,192,192,0.6)] text-black font-semibold py-6 text-lg transition-all duration-500"
            >
              {t("booking_full_btn")}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
