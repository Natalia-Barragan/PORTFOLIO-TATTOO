"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useLanguage } from "@/lib/i18n"



interface TypeformBookingProps {
  isQuickConsultation: boolean
  onBack?: () => void
}

export default function TypeformBooking({ isQuickConsultation, onBack }: TypeformBookingProps) {
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // estados para controlar subida de imagen
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string }[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  // estado para guardar los errores de validacion
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    contactMethod: "",
    vision: "",
    size: "",
    date: "",
    budget: "",
    terms: false,
  })

  const quickSteps = [
    { id: "name", title: t("step_title_name"), field: "name" },
    { id: "contact", title: t("step_title_contact"), field: "email" },
    { id: "vision", title: t("step_title_vision_quick"), field: "vision" },
    { id: "date", title: t("step_title_date"), field: "date" },
  ]

  const fullSteps = [
    { id: "name", title: t("step_title_name"), field: "name" },
    { id: "contact", title: t("step_title_contact"), field: "email" },
    { id: "vision", title: t("step_title_vision"), field: "vision" },
    { id: "upload", title: t("step_title_upload"), field: "upload" },
    { id: "details", title: t("step_title_details"), field: "size" },
    { id: "date", title: t("step_title_date_full"), field: "date" },
  ]

  const steps = isQuickConsultation ? quickSteps : fullSteps
  const progress = ((currentStep + 1) / steps.length) * 100

  const validateStep = () => {
    const currentStepId = steps[currentStep].id
    let newErrors: { [key: string]: string } = {}
    let isValid = true

    if (currentStepId === "name") {
      if (!formData.name.trim()) {
        newErrors.name = t("form_error_name")
        isValid = false
      }
    }

    if (currentStepId === "contact") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email) {
        newErrors.email = t("form_error_email")
        isValid = false
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = t("form_error_email")
        isValid = false
      }

      const phoneRegex = /^\+[0-9]{10,15}$/
      if (!formData.phone) {
        newErrors.phone = t("form_error_phone")
        isValid = false
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = t("form_error_phone")
        isValid = false
      }
    }

    if (currentStepId === "vision") {
      if (!formData.vision.trim()) {
        newErrors.vision = t("form_error_vision")
        isValid = false
      }
    }

    if (currentStepId === "details") {
      if (!formData.size) {
        newErrors.size = t("form_error_size") || "Por favor selecciona un tamaño"
        isValid = false
      }
    }

    if (currentStepId === "date") {
      if (!formData.date.trim()) {
        newErrors.date = t("form_error_date") || "Por favor indica una fecha aproximada"
        isValid = false
      }
      if (!formData.terms) {
        newErrors.terms = t("form_error_terms") || "Debes aceptar los términos y condiciones"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (!validateStep()) return

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsUploading(true) // Bloquear botones durante el envío
    try {
      const formDataToSend = new FormData()

      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("contactMethod", formData.contactMethod)
      formDataToSend.append("vision", formData.vision)
      formDataToSend.append("size", formData.size)
      formDataToSend.append("date", formData.date)
      formDataToSend.append("budget", formData.budget)
      formDataToSend.append("terms", String(formData.terms))

      if (imageUrl) {
        formDataToSend.append("referenceImage", imageUrl)
      }

      const response = await fetch("/api/save-lead", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al guardar el lead");
      }

      setSubmitted(true)

    } catch (error: any) {
      console.error("Submit error:", error)
      setErrors({ submit: error.message || "Error al enviar el formulario. Intentá nuevamente." })
    } finally {
      setIsUploading(false)
    }
  };

  const removeFile = () => {
    setUploadedFiles([])
    setImageUrl("")
    if (errors.upload) {
      const { upload, ...rest } = errors
      setErrors(rest)
    }
  }

  if (submitted) {
    return (
      <section className="relative bg-linear-to-br from-black via-[#1A1A1A] to-[#0A0D1A] py-40 min-h-screen flex items-center">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-24 h-24 bg-linear-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12 text-black" />
          </motion.div>
          <h2 className="font-heading text-5xl text-white mb-6 font-light">{t("form_success_thanks")}</h2>
          <p className="text-xl text-[#D1D5DB] mb-8">
            {isQuickConsultation
              ? t("form_success_desc_quick")
              : t("form_success_desc_full")}
          </p>

          <Link href="/">
            <Button
              className="bg-[#2A2A2A] hover:bg-metal-plateado/20 text-metal-plateado border border-gray-300/30 hover:border-gray-300"
            >
              {t("form_success_back")}
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-linear-to-br from-black via-[#1A1A1A] to-[#0A0D1A] py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              disabled={isUploading}
              className="flex items-center gap-2 text-metal-plateado hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              {t("form_back")}
            </button>
            <span className="text-metal-plateado font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-gray-300 to-gray-400"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-2 text-sm text-[#D1D5DB]/70">{t("form_step")} {currentStep + 1} {t("form_of")} {steps.length}</div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1A1A1A] border border-gray-300/20 rounded-sm p-8 md:p-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-8 font-light">{steps[currentStep].title}</h2>

            {steps[currentStep].id === "name" && (
              <div className="space-y-4">
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    if (errors.name) setErrors({ ...errors, name: "" })
                  }}
                  placeholder={t("form_placeholder_name")}
                  className={`bg-[#2A2A2A] text-white text-xl py-6 focus:border-gray-300 ${errors.name ? "border-red-500" : "border-gray-300/30"}`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
              </div>
            )}

            {steps[currentStep].id === "contact" && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-2 block font-heading">Email *</Label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value })
                      if (errors.email) setErrors({ ...errors, email: "" })
                    }}
                    placeholder={t("form_placeholder_email")}
                    className={`bg-[#2A2A2A] text-white text-xl py-6 focus:border-gray-300 ${errors.email ? "border-red-500" : "border-gray-300/30"}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label className="text-white mb-2 block font-heading">{t("form_label_phone")}</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: "" })
                    }}
                    placeholder={t("form_placeholder_phone")}
                    className={`bg-[#2A2A2A] text-white text-xl py-6 focus:border-gray-300 ${errors.phone ? "border-red-500" : "border-gray-300/30"}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label className="text-white mb-2 block font-heading">{t("form_label_contact")}</Label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(val) => setFormData({ ...formData, contactMethod: val })}
                  >
                    <SelectTrigger className="bg-[#2A2A2A] border-gray-300/30 text-white text-xl py-6">
                      <SelectValue placeholder={t("form_contact_select")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {steps[currentStep].id === "vision" && (
              <div className="space-y-4">
                <Textarea
                  value={formData.vision}
                  onChange={(e) => {
                    setFormData({ ...formData, vision: e.target.value })
                    if (errors.vision) setErrors({ ...errors, vision: "" })
                  }}
                  placeholder={t("form_placeholder_vision")}
                  rows={8}
                  className={`bg-[#2A2A2A] text-white text-lg focus:border-gray-300 resize-none ${errors.vision ? "border-red-500" : "border-gray-300/30"}`}
                />
                {errors.vision && <p className="text-red-500 text-sm mt-2">{errors.vision}</p>}
              </div>
            )}

            {steps[currentStep].id === "upload" && (
              <div className="space-y-6">
                <p className="text-[#D1D5DB] mb-4">{t("form_upload_title")}</p>

                <div
                  className={`border-2 border-dashed rounded-sm p-8 text-center hover:border-gray-300 transition-colors cursor-pointer ${errors.upload ? "border-red-500" : "border-gray-300/30"}`}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (!file) return

                      setIsUploading(true)
                      setUploadedFiles([])
                      if (errors.upload) {
                        const { upload, ...rest } = errors
                        setErrors(rest)
                      }

                      try {
                        const data = new FormData()
                        data.append("file", file)

                        const res = await fetch("/api/upload-image", {
                          method: "POST",
                          body: data,
                        })

                        const result = await res.json()

                        if (!res.ok) {
                          throw new Error(result.error || "Error al subir la imagen")
                        }

                        setImageUrl(result.url)
                        setUploadedFiles([{ name: file.name }])
                      } catch (err: any) {
                        setErrors({ ...errors, upload: err.message || "Error al subir la imagen. Intentá con un archivo más pequeño." })
                      } finally {
                        setIsUploading(false)
                        // Resetear input para permitir volver a elegir el mismo archivo
                        if (fileInputRef.current) fileInputRef.current.value = ""
                      }
                    }}
                  />

                  {isUploading ? (
                    <div className="text-metal-plateado animate-pulse font-medium py-4">
                      {t("form_uploading")}
                    </div>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 text-metal-plateado mx-auto mb-4" />
                      <p className="text-white mb-2">{t("form_upload_label")}</p>
                      <p className="text-sm text-[#D1D5DB]/70">PNG, JPG, WEBP hasta 10MB</p>
                    </>
                  )}
                </div>

                {errors.upload && <p className="text-red-500 text-sm text-center mt-2">⚠️ {errors.upload}</p>}

                {uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-[#2A2A2A] p-3 rounded-sm border border-green-500/30">
                      <span className="text-white text-sm truncate flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        {uploadedFiles[0].name}
                      </span>
                      <button onClick={removeFile} className="text-metal-plateado hover:text-white transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {steps[currentStep].id === "details" && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-2 block font-heading">{t("form_label_size")}</Label>
                  <Select
                    value={formData.size}
                    onValueChange={(val) => {
                      setFormData({ ...formData, size: val })
                      if (errors.size) setErrors({ ...errors, size: "" })
                    }}
                  >
                    <SelectTrigger className={`bg-[#2A2A2A] text-white text-xl py-6 ${errors.size ? "border-red-500" : "border-gray-300/30"}`}>
                      <SelectValue placeholder={t("form_size_select")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (5-10 cm)</SelectItem>
                      <SelectItem value="medium">Medium (10-20 cm)</SelectItem>
                      <SelectItem value="large">Large (20-30 cm)</SelectItem>
                      <SelectItem value="xlarge">Extra Large (30+ cm)</SelectItem>
                      <SelectItem value="sleeve">Full sleeve/back</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.size && <p className="text-red-500 text-sm mt-2">{errors.size}</p>}
                </div>
                <div>
                  <Label className="text-white mb-2 block font-heading">{t("form_label_budget")}</Label>
                  <Select value={formData.budget} onValueChange={(val) => setFormData({ ...formData, budget: val })}>
                    <SelectTrigger className="bg-[#2A2A2A] border-gray-300/30 text-white text-xl py-6">
                      <SelectValue placeholder={t("form_budget_select")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-2500">$1,000 - $2,500</SelectItem>
                      <SelectItem value="2500-5000">$2,500 - $5,000</SelectItem>
                      <SelectItem value="5000+">$5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}


            {steps[currentStep].id === "date" && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Input
                    value={formData.date}
                    onChange={(e) => {
                      setFormData({ ...formData, date: e.target.value })
                      if (errors.date) setErrors({ ...errors, date: "" })
                    }}
                    placeholder={t("form_placeholder_date")}
                    className={`bg-[#2A2A2A] text-white text-xl py-6 focus:border-gray-300 ${errors.date ? "border-red-500" : "border-gray-300/30"}`}
                  />
                  {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
                </div>

                {currentStep === steps.length - 1 && (
                  <div className="space-y-3 pt-4">
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={(checked) => {
                          setFormData({ ...formData, terms: checked as boolean })
                          if (errors.terms) setErrors({ ...errors, terms: "" })
                        }}
                        className={`border-gray-300/30 data-[state=checked]:bg-metal-plateado mt-1 ${errors.terms ? "border-red-500" : ""}`}
                      />
                      <Label htmlFor="terms" className={`text-sm leading-relaxed cursor-pointer font-heading ${errors.terms ? "text-red-500" : "text-[#D1D5DB]"}`}>
                        {t("form_terms")}
                      </Label>
                    </div>
                    {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}
                  </div>
                )}
              </div>
            )}

            {errors.submit && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-sm">
                <p className="text-red-500 text-sm text-center">⚠️ {errors.submit}</p>
              </div>
            )}

            <div className="flex gap-4 mt-12">
              {currentStep > 0 && (
                <Button
                  onClick={handleBack}
                  disabled={isUploading}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white border border-gray-300/30 px-8 py-6 disabled:opacity-50"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  {t("form_back")}
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isUploading}
                className="flex-1 bg-linear-to-r from-gray-300 to-gray-400 hover:shadow-[0_0_60px_rgba(192, 192, 192,0.6)] text-black font-semibold py-6 text-lg transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  t("form_continue") + "..."
                ) : (
                  currentStep === steps.length - 1 ? (
                    <>
                      <Check className="mr-2 w-5 h-5" />
                      {t("form_submit")}
                    </>
                  ) : (
                    <>
                      {t("form_continue")}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )
                )}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
