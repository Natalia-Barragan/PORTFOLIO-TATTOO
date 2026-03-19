"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Calendar } from "lucide-react"
import { useLanguage } from "@/lib/i18n"
import BackToTopArrow from "@/components/scroll-to-top"

export default function HomeCTA() {
    const { t } = useLanguage()
    return (
        <section className="relative py-32 bg-linear-to-b from-black via-[#0a0a0a] to-black border-t border-gray-300/10 overflow-hidden">
            <BackToTopArrow />
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-6xl font-heading font-light text-white mb-6">
                        {t("cta_title")}
                    </h2>
                    <p className="text-xl md:text-2xl text-[#D1D5DB] font-light mb-12">
                        {t("cta_subtitle")}
                    </p>

                    <Link
                        href="/booking"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-metal-plateado text-black rounded-full glow-accent hover:bg-white hover:text-black transition-all duration-300 font-semibold text-lg"
                    >
                        <Calendar className="w-6 h-6" />
                        {t("cta_button")}
                    </Link>
                </motion.div>
            </div>

            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-metal-plateado/5 blur-[120px] rounded-full pointer-events-none" />
        </section>
    )
}
