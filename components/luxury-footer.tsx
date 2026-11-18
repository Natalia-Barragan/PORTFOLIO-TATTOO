"use client"

import Image from "next/image"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"
import FAQModal from "./faq-modal"
import AftercareModal from "./aftercare-modal"
import { useLanguage } from "@/lib/i18n"
import BackToTopArrow from "@/components/scroll-to-top"

export default function LuxuryFooter() {
  const { t } = useLanguage()
  return (
    <footer className="relative bg-black border-t border-gray-300/20 py-16">
      <BackToTopArrow />
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-10 md:gap-12 mb-12 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <h3 className="font-heading text-2xl text-white font-light tracking-[0.2em] uppercase">CONI PEREZ</h3>
            </div>
            <div className="w-12 h-[1px] bg-gray-400/40 mb-4 md:hidden" />
            <p className="text-[#D1D5DB] mb-6 leading-relaxed max-w-sm mx-auto md:mx-0 text-sm md:text-base">
              {t("footer_desc")}
            </p>
            <a
              href="https://instagram.com/coni.perez"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/20 hover:border-metal-plateado hover:bg-white/5 transition-all duration-300 group"
            >
              <Instagram className="w-4 h-4 text-white/80 group-hover:text-metal-plateado transition-colors" />
              <span className="text-sm text-[#D1D5DB] group-hover:text-white transition-colors">@coni.perez</span>
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-xl text-white mb-4 md:mb-6 font-light tracking-wide">{t("footer_contact")}</h4>
            <div className="space-y-3 flex flex-col items-center md:items-start">
              <a
                href="mailto:soyconiperez@gmail.com"
                className="inline-flex items-center justify-center md:justify-start gap-2.5 text-[#D1D5DB] hover:text-metal-plateado transition-colors text-sm md:text-base"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>soyconiperez@gmail.com</span>
              </a>
              <div className="inline-flex items-center justify-center md:justify-start gap-2.5 text-[#D1D5DB] text-sm md:text-base">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>{t("footer_city")}</span>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-heading text-xl text-white mb-4 md:mb-6 font-light tracking-wide">{t("footer_location")}</h4>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-300/20 shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235293.45422619!2d-43.3502016!3d-22.9132525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f163682fd901e3!2sRio%20de%20Janeiro%2C%20RJ%2C%20Brasil!5e0!3m2!1ses!2sbr!4v1742221083000!5m2!1ses!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-300/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#D1D5DB]/70 text-center md:text-left">
          <p>
            © 2025 Coni Perez Tattoo.
            <span className="mx-1">{t("footer_made_by")}</span>
            <a
              href={`https://nbdigital.lat`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/85 hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.45)] underline-offset-4 hover:underline transition-all duration-300"
            >
              NB DIGITAL
            </a>.
          </p>
          <div className="flex justify-center md:justify-end gap-6 w-full md:w-auto mt-4 md:mt-0">
            <FAQModal />
            <AftercareModal />
          </div>
        </div>
      </div>
    </footer>
  )
}
