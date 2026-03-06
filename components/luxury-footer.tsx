"use client"

import Image from "next/image"
import { Instagram, Mail, Phone, MapPin } from "lucide-react"

export default function LuxuryFooter() {
  return (
    <footer className="relative bg-black border-t border-[#0044FF]/20 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-heading text-2xl text-[#0044FF] font-light">INK STUDIO</h3>
            </div>
            <p className="text-[#D1D5DB] mb-6 leading-relaxed">
              Tattoo studio specialized in custom designs and precision art. Premium experience for unique body art.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/tattoo_artist_model"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-[#0044FF]/30 flex items-center justify-center hover:border-[#0044FF] hover:bg-[#0044FF]/10 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-[#0044FF]" />
              </a>
              <span className="self-center text-sm text-[#D1D5DB]">@tattoo_artist_model</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 font-light">Contact</h4>
            <div className="space-y-4">
              <a
                href="mailto:info@tattoostudio.com"
                className="flex items-center gap-3 text-[#D1D5DB] hover:text-[#0044FF] transition-colors"
              >
                <Mail className="w-5 h-5" />
                info@tattoostudio.com
              </a>
              <div className="flex items-center gap-3 text-[#D1D5DB]">
                <MapPin className="w-5 h-5" />
                Premium Studio
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-heading text-xl text-white mb-6 font-light">Location</h4>
            <div className="w-full h-48 rounded-sm overflow-hidden border border-[#0044FF]/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
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
        <div className="pt-8 border-t border-[#0044FF]/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[#D1D5DB]/70">
          <p>
            © 2025 Tattoo Studio.
            <span className="mx-1">Made by</span>
            <a
              href={`https://protoly.lat/en`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0044FF] transition-colors"
            >
              Protoly.lat/en
            </a>.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#0044FF] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#0044FF] transition-colors">
              Booking Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
