"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, ArrowRight, Check, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// provider de imagekit para el envoltorio
import { ImageKitProvider, IKUpload } from "imagekitio-next"

// config de imagekit (asegurarse que esten en el .env.local)
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

// funcion para pedir permiso de subida al backend
const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit-auth");
    if (!response.ok) throw new Error("Auth failed");
    return await response.json();
  } catch (error) {
    throw new Error(`Auth error: ${error}`);
  }
};

interface TypeformBookingProps {
  isQuickConsultation: boolean
  onBack?: () => void
}

export default function TypeformBooking({ isQuickConsultation, onBack }: TypeformBookingProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // estados para controlar subida de imagen
  const [isUploading, setIsUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>("")
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string }[]>([])

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
    artist: "",
    budget: "",
    terms: false,
  })

  const quickSteps = [
    { id: "name", title: "What's your name?", field: "name" },
    { id: "contact", title: "How can we contact you?", field: "email" },
    { id: "vision", title: "Tell us about your tattoo idea", field: "vision" },
    { id: "date", title: "When are you thinking about it?", field: "date" },
  ]

  const fullSteps = [
    { id: "name", title: "What's your name?", field: "name" },
    { id: "contact", title: "How can we contact you?", field: "email" },
    { id: "vision", title: "Describe your vision", field: "vision" },
    { id: "upload", title: "Do you have reference images?", field: "upload" },
    { id: "details", title: "Tell us more details", field: "size" },
    { id: "artist", title: "Artist preference?", field: "artist" },
    { id: "date", title: "Preferred date range?", field: "date" },
  ]

  const steps = isQuickConsultation ? quickSteps : fullSteps
  const progress = ((currentStep + 1) / steps.length) * 100

  const validateStep = () => {
    const currentStepId = steps[currentStep].id
    let newErrors: { [key: string]: string } = {}
    let isValid = true

    if (currentStepId === "name") {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required"
        isValid = false
      } else if (formData.name.length < 3) {
        newErrors.name = "Name must be at least 3 characters"
        isValid = false
      }
    }

    if (currentStepId === "contact") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!formData.email) {
        newErrors.email = "Email is required"
        isValid = false
      } else if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address"
        isValid = false
      }

      const phoneRegex = /^\+[0-9]{10,15}$/
      if (!formData.phone) {
        newErrors.phone = "Phone number is required"
        isValid = false
      } else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = "Format required: +1234... (Country code + number)"
        isValid = false
      }
    }

    if (currentStepId === "vision") {
      if (!formData.vision.trim()) {
        newErrors.vision = "Please describe your idea"
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    // si no pasa validacion, cortamos aca
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
    try {
      const formDataToSend = new FormData()

      // append de todos los campos
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("contactMethod", formData.contactMethod)
      formDataToSend.append("vision", formData.vision)
      formDataToSend.append("size", formData.size)
      formDataToSend.append("date", formData.date)
      formDataToSend.append("artist", formData.artist)
      formDataToSend.append("budget", formData.budget)
      formDataToSend.append("terms", String(formData.terms))

      // si hay imagen subida, mandamos el link
      if (imageUrl) {
        formDataToSend.append("referenceImage", imageUrl)
      }

      const response = await fetch("/api/save-lead", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        console.error("API Error:", await response.text())
        return
      }

      const responseData = await fetch("/api/budibase", {
        method: "POST",
        body: formDataToSend,
      })

      setSubmitted(true)

    } catch (error) {
      console.error("Submit error:", error)
    }
  };

  // limpiar archivo seleccionado
  const removeFile = () => {
    setUploadedFiles([])
    setImageUrl("")
    // si habia error de upload, lo limpiamos tmb
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
            className="w-24 h-24 bg-linear-to-r from-[#0044FF] to-[#0044FF] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12 text-black" />
          </motion.div>
          <h2 className="font-heading text-5xl text-white mb-6 font-light">Thank you!</h2>
          <p className="text-xl text-[#D1D5DB] mb-8">
            {isQuickConsultation
              ? "Your consultation request has been received. We'll reach out within 24 hours to schedule your free 15-minute consultation."
              : "Your booking request has been received. We'll review your details and contact you within 24 hours to confirm your appointment."}
          </p>

          {/* boton que te lleva al home */}
          <Link href="/">
            <Button
              className="bg-[#2A2A2A] hover:bg-[#0044FF]/20 text-[#0044FF] border border-[#0044FF]/30 hover:border-[#0044FF]"
            >
              Back to Start
            </Button>
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-linear-to-br from-black via-[#1A1A1A] to-[#0A0D1A] py-20 min-h-screen">
      <div className="max-w-3xl mx-auto px-6">
        {/* barra de progreso */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onBack}
              disabled={isUploading}
              className="flex items-center gap-2 text-[#0044FF] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <span className="text-[#0044FF] font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full h-2 bg-[#2A2A2A] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-[#0044FF] to-[#0044FF]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="mt-2 text-sm text-[#D1D5DB]/70">Step {currentStep + 1} of {steps.length}</div>
        </div>

        {/* steps del formulario */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-[#1A1A1A] border border-[#0044FF]/20 rounded-sm p-8 md:p-12"
          >
            <h2 className="font-heading text-4xl md:text-5xl text-white mb-8 font-light">{steps[currentStep].title}</h2>

            {/* Step Content */}
            {steps[currentStep].id === "name" && (
              <div className="space-y-4">
                <Input
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value })
                    // limpiamos error al escribir
                    if (errors.name) setErrors({ ...errors, name: "" })
                  }}
                  placeholder="Enter your full name"
                  className={`bg-[#2A2A2A] text-white text-xl py-6 focus:border-[#0044FF] ${errors.name ? "border-red-500" : "border-[#0044FF]/30"}`}
                />
                {/* mensaje de error rojo */}
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
                    placeholder="you@example.com"
                    className={`bg-[#2A2A2A] text-white text-xl py-6 focus:border-[#0044FF] ${errors.email ? "border-red-500" : "border-[#0044FF]/30"}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <Label className="text-white mb-2 block font-heading">Phone * (include country code)</Label>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: "" })
                    }}
                    placeholder="+1 234 567 8900"
                    className={`bg-[#2A2A2A] text-white text-xl py-6 focus:border-[#0044FF] ${errors.phone ? "border-red-500" : "border-[#0044FF]/30"}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <Label className="text-white mb-2 block font-heading">Preferred Contact Method</Label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(val) => setFormData({ ...formData, contactMethod: val })}
                  >
                    <SelectTrigger className="bg-[#2A2A2A] border-[#0044FF]/30 text-white text-xl py-6">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
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
                  placeholder="Tell us about the tattoo you're imagining. Include size, placement, style preferences, and meaningful details..."
                  rows={8}
                  className={`bg-[#2A2A2A] text-white text-lg focus:border-[#0044FF] resize-none ${errors.vision ? "border-red-500" : "border-[#0044FF]/30"}`}
                />
                {errors.vision && <p className="text-red-500 text-sm mt-2">{errors.vision}</p>}
              </div>
            )}

            {/* integracion de imagekit */}
            {steps[currentStep].id === "upload" && (
              <ImageKitProvider
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticator={authenticator}
              >
                <div className="space-y-6">
                  <p className="text-[#D1D5DB] mb-4">Upload images to help us understand your request (optional)</p>

                  <div className={`border-2 border-dashed rounded-sm p-8 text-center hover:border-[#0044FF] transition-colors relative ${errors.upload ? "border-red-500" : "border-[#0044FF]/30"}`}>

                    <IKUpload
                      id="file-upload"
                      fileName="referencia-cliente"
                      useUniqueFileName={true}
                      className="hidden"

                      onUploadStart={() => {
                        setIsUploading(true)
                        setUploadedFiles([])
                        // borramos error viejo si hay
                        if (errors.upload) {
                          const { upload, ...rest } = errors
                          setErrors(rest)
                        }
                      }}

                      onSuccess={(res) => {
                        setIsUploading(false)
                        setImageUrl(res.url)
                        setUploadedFiles([{ name: res.name }])
                        console.log("Upload success:", res.url)
                      }}

                      onError={(err) => {
                        setIsUploading(false)
                        console.log("Upload error", err)
                        // mostramos error rojo abajo del input, nada de alerts feos
                        setErrors({ ...errors, upload: "Failed to upload image. Please try again or use a smaller file." })
                      }}
                    />

                    <label htmlFor="file-upload" className="cursor-pointer block w-full h-full">
                      {isUploading ? (
                        <div className="text-[#0044FF] animate-pulse font-medium">
                          Uploading to cloud... please wait ☁️
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-[#0044FF] mx-auto mb-4" />
                          <p className="text-white mb-2">Click to upload or drag and drop</p>
                          <p className="text-sm text-[#D1D5DB]/70">PNG, JPG up to 10MB</p>
                        </>
                      )}
                    </label>
                  </div>

                  {/* mensaje error de imagen */}
                  {errors.upload && <p className="text-red-500 text-sm text-center mt-2">⚠️ {errors.upload}</p>}

                  {/* preview archivo subido */}
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-[#2A2A2A] p-3 rounded-sm border border-green-500/30">
                        <span className="text-white text-sm truncate flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          File uploaded: {uploadedFiles[0].name}
                        </span>
                        <button
                          onClick={removeFile}
                          className="text-[#0044FF] hover:text-white transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </ImageKitProvider>
            )}

            {steps[currentStep].id === "details" && (
              <div className="space-y-6">
                <div>
                  <Label className="text-white mb-2 block font-heading">Approximate Size</Label>
                  <Select value={formData.size} onValueChange={(val) => setFormData({ ...formData, size: val })}>
                    <SelectTrigger className="bg-[#2A2A2A] border-[#0044FF]/30 text-white text-xl py-6">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Small (5-10 cm)</SelectItem>
                      <SelectItem value="medium">Medium (10-20 cm)</SelectItem>
                      <SelectItem value="large">Large (20-30 cm)</SelectItem>
                      <SelectItem value="xlarge">Extra Large (30+ cm)</SelectItem>
                      <SelectItem value="sleeve">Full sleeve/back</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white mb-2 block font-heading">Budget Range (Optional)</Label>
                  <Select value={formData.budget} onValueChange={(val) => setFormData({ ...formData, budget: val })}>
                    <SelectTrigger className="bg-[#2A2A2A] border-[#0044FF]/30 text-white text-xl py-6">
                      <SelectValue placeholder="Select budget" />
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

            {steps[currentStep].id === "artist" && (
              <div className="space-y-4">
                <Select value={formData.artist} onValueChange={(val) => setFormData({ ...formData, artist: val })}>
                  <SelectTrigger className="bg-[#2A2A2A] border-[#0044FF]/30 text-white text-xl py-6">
                    <SelectValue placeholder="Select an artist or 'No preference'" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-preference">No Preference</SelectItem>
                    <SelectItem value="artist1">Lead Artist (Realism Specialist)</SelectItem>
                    <SelectItem value="artist2">Artist 2 (Portrait Expert)</SelectItem>
                    <SelectItem value="artist3">Artist 3 (Black and Grey)</SelectItem>
                    <SelectItem value="artist4">Artist 4 (Color Realism)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {steps[currentStep].id === "date" && (
              <div className="space-y-6">
                <Input
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="e.g., March 2025 or flexible"
                  className="bg-[#2A2A2A] border-[#0044FF]/30 text-white text-xl py-6 focus:border-[#0044FF]"
                />

                {currentStep === steps.length - 1 && (
                  <div className="flex items-start space-x-3 pt-4">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
                      className="border-[#0044FF]/30 data-[state=checked]:bg-[#0044FF] mt-1"
                    />
                    <Label htmlFor="terms" className="text-sm text-[#D1D5DB] leading-relaxed cursor-pointer font-heading">
                      I understand this is a {isQuickConsultation ? "consultation" : "booking"} request and final pricing will be discussed after design approval
                    </Label>
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-4 mt-12">
              {currentStep > 0 && (
                <Button
                  onClick={handleBack}
                  disabled={isUploading}
                  className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white border border-[#0044FF]/30 px-8 py-6 disabled:opacity-50"
                >
                  <ArrowLeft className="mr-2 w-5 h-5" />
                  Back
                </Button>
              )}
              <Button
                onClick={handleNext}
                disabled={isUploading}
                className="flex-1 bg-linear-to-r from-[#0044FF] to-[#0044FF] hover:shadow-[0_0_60px_rgba(0,68,255,0.6)] text-black font-semibold py-6 text-lg transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUploading ? (
                  "Uploading..."
                ) : (
                  currentStep === steps.length - 1 ? (
                    <>
                      <Check className="mr-2 w-5 h-5" />
                      Submit
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )
                )}
              </Button>
            </div>

            <p className="text-xs text-[#D1D5DB]/70 text-center mt-6">Press Enter to continue or use the buttons above</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
