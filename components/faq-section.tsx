"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is your price range?",
    answer:
      "Each piece is a personalized investment in living art. Pricing varies by size, complexity, and session time. During your free consultation, we'll discuss your vision and provide a transparent quote. Most clients invest between $500–$5,000+ depending on scope.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "Due to limited monthly availability for exclusive consultations, I recommend booking 4–8 weeks in advance. I occasionally have openings for smaller pieces sooner. Contact me to check current availability.",
  },
  {
    question: "Do you require a deposit?",
    answer:
      "Yes, a 50% deposit is required to secure your appointment and begin custom design work. The deposit is non-refundable but can be applied to a rescheduled session with 48 hours' notice.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "I require 48 hours' notice for cancellations or rescheduling. With proper notice, your deposit may be transferred to a new date. Cancellations within 48 hours forfeit the deposit due to the exclusive nature of the booking.",
  },
  {
    question: "Can I bring reference images?",
    answer:
      "Reference images help me understand your aesthetic preferences and vision. However, every design is created from scratch as a unique piece tailored to you—never a direct copy.",
  },
  {
    question: "How long will my tattoo take?",
    answer:
      "Session length varies by size and complexity. Smaller pieces may take 2–4 hours, while larger works like sleeves require multiple sessions over several months. During the consultation, I'll provide a realistic timeline for your specific piece.",
  },
]

export default function FAQSection() {
  return (
    <section className="relative bg-linear-to-b from-[#1A1A1A] to-black py-32">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-heading font-light text-4xl md:text-6xl text-white mb-6">Frequently Asked Questions</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-[#1A1A1A] border border-[#0044FF]/20 rounded-sm px-8 hover:border-[#0044FF]/40 transition-colors"
              >
                <AccordionTrigger className="text-left text-lg md:text-xl text-white font-heading font-light hover:text-[#0044FF] transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[#D1D5DB] text-base md:text-lg leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
