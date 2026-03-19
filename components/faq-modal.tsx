"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage, translations } from "@/lib/i18n"

export default function FAQModal() {
    const { t, language } = useLanguage()
    const currentFaqs = translations.faqs[language]

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="hover:text-metal-plateado transition-colors bg-transparent border-none p-0 cursor-pointer text-sm">
                    {t("faq_trigger")}
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl bg-[#0a0a0a] border-gray-300/20 text-white max-h-[85vh] overflow-y-auto w-[95vw] sm:w-[90vw] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-metal-plateado/20 hover:[&::-webkit-scrollbar-thumb]:bg-metal-plateado/40 [&::-webkit-scrollbar-thumb]:rounded-full">
                <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl font-heading font-light mb-4">
                        {t("faq_title")}
                    </DialogTitle>
                </DialogHeader>
                <Accordion type="single" collapsible className="space-y-4">
                    {currentFaqs.map((faq: any, index: number) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index}`}
                            className="bg-[#1A1A1A] border border-gray-300/20 rounded-sm px-6 hover:border-gray-300/40 transition-colors"
                        >
                            <AccordionTrigger className="text-left text-base md:text-lg text-white font-heading font-light hover:text-metal-plateado transition-colors py-4">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-[#D1D5DB] text-sm md:text-base leading-relaxed pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </DialogContent>
        </Dialog>
    )
}
