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
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-heading text-2xl text-white font-light tracking-widest uppercase">CONI PEREZ</h3>
            </div>
            <p className="text-[#D1D5DB] mb-6 leading-relaxed">
              {t("footer_desc")}
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/coni.perez"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-metal-plateado hover:bg-white/5 transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 text-white/80 group-hover:text-metal-plateado transition-colors" />
              </a>
              <span className="self-center text-sm text-[#D1D5DB] hover:text-white transition-colors cursor-default">@coni.perez</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 font-light">{t("footer_contact")}</h4>
            <div className="space-y-4">
              <a
                href="mailto:info@tattoostudio.com"
                className="flex items-center gap-3 text-[#D1D5DB] hover:text-metal-plateado transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@tattoostudio.com
              </a>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <MapPin className="w-5 h-5" />
                {t("footer_city")}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 font-light">{t("footer_location")}</h4>
            <div className="w-full h-48 rounded-sm overflow-hidden border border-gray-300/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235293.45422619!2d-43.3502016!3d-22.9132525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x997f58a6a00a9d%3A0x3f163682fd901e3!2sRio%20de%20Janeiro%2C%20RJ%2C%20Brasil!5e0!3m2!1ses!2sbr!4v1742221083000!5m2!1ses!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Studio Location"
              />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-300/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#D1D5DB]/70">
          <p>
            © 2025 Coni Perez Tattoo.
            <span className="mx-1">Made by</span>
            <a
              href={`https://nbdigital.lat`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-metal-plateado transition-colors"
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
