"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, Droplet, Sun, HeartPulse } from "lucide-react"
import { useLanguage } from "@/lib/i18n"

export default function AftercareModal() {
    const { t } = useLanguage()
    
    const steps = [
        { icon: Shield, title: t("aftercare_step1_title"), desc: t("aftercare_step1_desc") },
        { icon: Droplet, title: t("aftercare_step2_title"), desc: t("aftercare_step2_desc") },
        { icon: Sun, title: t("aftercare_step3_title"), desc: t("aftercare_step3_desc") },
        { icon: HeartPulse, title: t("aftercare_step4_title"), desc: t("aftercare_step4_desc") },
    ]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="hover:text-metal-plateado transition-colors bg-transparent border-none p-0 cursor-pointer text-sm">
                    {t("aftercare_modal_trigger")}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl bg-[#0a0a0a] border-gray-300/20 text-white max-h-[85vh] overflow-y-auto w-[95vw] sm:w-[90vw] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-metal-plateado/20 hover:[&::-webkit-scrollbar-thumb]:bg-metal-plateado/40 [&::-webkit-scrollbar-thumb]:rounded-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl font-heading font-light mb-8 text-center">
                        {t("aftercare_modal_title")}
                    </DialogTitle>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-8 px-4 pb-8">
                    {steps.map((step, idx) => (
                        <div key={idx} className="bg-[#1A1A1A] p-6 rounded-md border border-gray-300/10 hover:border-gray-300/30 transition-all">
                            <step.icon className="w-10 h-10 text-metal-plateado mb-4" />
                            <h4 className="font-heading text-xl mb-3">{step.title}</h4>
                            <p className="text-[#D1D5DB] text-sm leading-relaxed whitespace-pre-line">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}
