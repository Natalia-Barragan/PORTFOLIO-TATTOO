"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, CheckCircle, AlertCircle, Loader } from "lucide-react"

// Types
interface FormData {
  name: string
  phone: string
  email: string
  tattooType: string
  size: string
  bodyArea: string
  message: string
}

interface ValidationError {
  [key: string]: string
}

// Constants
const TATTOO_TYPES = [
  "Tradicional",
  "Minimalista",
  "Realismo",
  "Color",
  "Líneas",
  "Geométrico",
  "Acuarela",
  "Tribal",
]

const SIZES = ["Pequeño", "Mediano", "Grande"]

const STEPS = [
  { id: 1, label: "Nombre", field: "name" },
  { id: 2, label: "Teléfono", field: "phone" },
  { id: 3, label: "Correo", field: "email" },
  { id: 4, label: "Tipo", field: "tattooType" },
  { id: 5, label: "Tamaño", field: "size" },
  { id: 6, label: "Área", field: "bodyArea" },
  { id: 7, label: "Descripción", field: "message" },
]

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10
}

const validateStep = (
  step: number,
  data: FormData
): { isValid: boolean; error?: string } => {
  switch (step) {
    case 1:
      if (!data.name.trim()) return { isValid: false, error: "El nombre es requerido" }
      if (data.name.trim().length < 2) return { isValid: false, error: "El nombre debe tener al menos 2 caracteres" }
      return { isValid: true }

    case 2:
      if (!data.phone.trim()) return { isValid: false, error: "El teléfono es requerido" }
      if (!validatePhone(data.phone)) return { isValid: false, error: "Formato de teléfono inválido" }
      return { isValid: true }

    case 3:
      if (!data.email.trim()) return { isValid: false, error: "El correo es requerido" }
      if (!validateEmail(data.email)) return { isValid: false, error: "Formato de correo inválido" }
      return { isValid: true }

    case 4:
      if (!data.tattooType) return { isValid: false, error: "Selecciona un tipo de tatuaje" }
      return { isValid: true }

    case 5:
      if (!data.size) return { isValid: false, error: "Selecciona un tamaño" }
      return { isValid: true }

    case 6:
      if (!data.bodyArea.trim()) return { isValid: false, error: "El área del cuerpo es requerida" }
      return { isValid: true }

    case 7:
      if (!data.message.trim()) return { isValid: false, error: "La descripción es requerida" }
      if (data.message.trim().length < 10) return { isValid: false, error: "La descripción debe tener al menos 10 caracteres" }
      return { isValid: true }

    default:
      return { isValid: true }
  }
}

// Step components
const StepName = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <label className="block text-sm text-gray-300 font-heading font-light">¿Cuál es tu nombre?</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Juan Pérez"
      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0044FF] focus:ring-1 focus:ring-[#0044FF] transition-colors"
      autoFocus
    />
  </motion.div>
)

const StepPhone = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <label className="block text-sm text-gray-300 font-heading font-light">¿Cuál es tu teléfono?</label>
    <input
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="+1 (555) 000-0000"
      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0044FF] focus:ring-1 focus:ring-[#0044FF] transition-colors"
      autoFocus
    />
  </motion.div>
)

const StepEmail = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <label className="block text-sm text-gray-300 font-heading font-light">¿Cuál es tu correo?</label>
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="tu@correo.com"
      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0044FF] focus:ring-1 focus:ring-[#0044FF] transition-colors"
      autoFocus
    />
  </motion.div>
)

const StepTattooType = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <label className="block text-sm text-gray-300 font-heading font-light">¿Qué tipo de tatuaje deseas?</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#0044FF] focus:ring-1 focus:ring-[#0044FF] transition-colors"
      autoFocus
    >
      <option value="">Selecciona un tipo</option>
      {TATTOO_TYPES.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  </motion.div>
)

const StepSize = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <label className="block text-sm text-gray-300 font-heading font-light">¿Qué tamaño aproximadamente?</label>
    <div className="grid grid-cols-3 gap-3">
      {SIZES.map((size) => (
        <button
          key={size}
          onClick={() => onChange(size)}
          className={`py-3 px-4 rounded-lg font-medium transition-all ${value === size
              ? "bg-[#0044FF] text-black border-[#0044FF]"
              : "bg-gray-900 text-gray-300 border border-gray-700 hover:border-[#0044FF]"
            }`}
        >
          {size}
        </button>
      ))}
    </div>
  </motion.div>
)

const StepBodyArea = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <label className="block text-sm text-gray-300 font-heading font-light">¿Qué área del cuerpo?</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="P.ej: Brazo derecho, Espalda, Pecho..."
      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0044FF] focus:ring-1 focus:ring-[#0044FF] transition-colors"
      autoFocus
    />
  </motion.div>
)

const StepMessage = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <label className="block text-sm text-gray-300 font-heading font-light">Cuéntanos más sobre tu idea</label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Describe tu idea de tatuaje, inspiración, estilo, etc..."
      rows={5}
      className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#0044FF] focus:ring-1 focus:ring-[#0044FF] transition-colors resize-none"
      autoFocus
    />
  </motion.div>
)

const ReviewStep = ({ data }: { data: FormData }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
    className="space-y-4"
  >
    <h3 className="text-lg text-white mb-6 font-heading font-light">Revisa tu información</h3>
    <div className="space-y-3 bg-gray-900 rounded-lg p-4 border border-gray-700">
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Nombre:</span>
        <span className="text-white font-medium">{data.name}</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Teléfono:</span>
        <span className="text-white font-medium">{data.phone}</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Correo:</span>
        <span className="text-white font-medium">{data.email}</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Tipo de Tatuaje:</span>
        <span className="text-white font-medium">{data.tattooType}</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Tamaño:</span>
        <span className="text-white font-medium">{data.size}</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Área del Cuerpo:</span>
        <span className="text-white font-medium">{data.bodyArea}</span>
      </div>
      <div className="flex justify-between items-start">
        <span className="text-gray-400">Descripción:</span>
        <span className="text-white font-medium text-right max-w-xs">{data.message}</span>
      </div>
    </div>
  </motion.div>
)

const SuccessStep = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4 }}
    className="flex flex-col items-center justify-center space-y-6 py-12"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
    >
      <CheckCircle className="w-20 h-20 text-[#0044FF]" />
    </motion.div>
    <div className="text-center space-y-2">
      <h3 className="text-2xl text-white font-heading font-light">¡Éxito!</h3>
      <p className="text-gray-400">Tu reserva ha sido registrada</p>
      <p className="text-sm text-gray-500">Nos pondremos en contacto pronto para confirmar los detalles</p>
    </div>
  </motion.div>
)

// Main component
export default function TattooBooking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    tattooType: "",
    size: "",
    bodyArea: "",
    message: "",
  })
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleFieldChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("")
  }, [])

  const handleNext = useCallback(() => {
    const validation = validateStep(currentStep, formData)

    if (!validation.isValid) {
      setError(validation.error || "Error de validación")
      return
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
      setError("")
    } else if (currentStep === STEPS.length) {
      // Move to review step
      setCurrentStep(STEPS.length + 1)
      setError("")
    }
  }, [currentStep, formData])

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      setError("")
    }
  }, [currentStep])

  const handleSubmit = useCallback(async () => {
    setIsLoading(true)
    setError("")

    try {
      const payload = {
        ...formData,
        status: "nuevo",
      }

      const response = await fetch("/api/save-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Error al enviar el formulario")
      }

      setIsSuccess(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setCurrentStep(1)
        setFormData({
          name: "",
          phone: "",
          email: "",
          tattooType: "",
          size: "",
          bodyArea: "",
          message: "",
        })
        setIsSuccess(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      setIsLoading(false)
    }
  }, [formData])

  const progressPercentage = (currentStep / (STEPS.length + 1)) * 100

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl text-white mb-4 font-heading font-light">Reserva Tu Tatuaje</h1>
          <p className="text-gray-400 text-lg">Completa el formulario y nos pondremos en contacto</p>
        </motion.div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-400">
              Paso {isSuccess ? STEPS.length + 1 : currentStep} de {STEPS.length + 1}
            </span>
            <span className="text-sm font-medium text-[#0044FF]">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-[#0044FF] to-[#0044FF]"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="mb-12 hidden md:flex justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center flex-1">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${currentStep > step.id
                    ? "bg-[#0044FF] text-black"
                    : currentStep === step.id
                      ? "bg-[#0044FF] text-black ring-2 ring-[#0044FF]"
                      : "bg-gray-800 text-gray-500"
                  }`}
                animate={{
                  scale: currentStep === step.id ? 1.1 : 1,
                }}
              >
                {currentStep > step.id ? "✓" : step.id}
              </motion.div>
              <p className="text-xs text-gray-500 mt-2 text-center">{step.label}</p>
            </div>
          ))}
        </div>

        {/* Form container */}
        <motion.div
          className="bg-gray-950 border border-gray-800 rounded-2xl p-8 shadow-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 p-4 bg-[#0044FF]/15 border border-[#0044FF] rounded-lg flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-[#0044FF] shrink-0" />
                <span className="text-[#0044FF] text-sm">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form content */}
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <SuccessStep />
            ) : currentStep === STEPS.length + 1 ? (
              <ReviewStep data={formData} />
            ) : currentStep === 1 ? (
              <StepName value={formData.name} onChange={(v) => handleFieldChange("name", v)} />
            ) : currentStep === 2 ? (
              <StepPhone value={formData.phone} onChange={(v) => handleFieldChange("phone", v)} />
            ) : currentStep === 3 ? (
              <StepEmail value={formData.email} onChange={(v) => handleFieldChange("email", v)} />
            ) : currentStep === 4 ? (
              <StepTattooType value={formData.tattooType} onChange={(v) => handleFieldChange("tattooType", v)} />
            ) : currentStep === 5 ? (
              <StepSize value={formData.size} onChange={(v) => handleFieldChange("size", v)} />
            ) : currentStep === 6 ? (
              <StepBodyArea value={formData.bodyArea} onChange={(v) => handleFieldChange("bodyArea", v)} />
            ) : currentStep === 7 ? (
              <StepMessage value={formData.message} onChange={(v) => handleFieldChange("message", v)} />
            ) : null}
          </AnimatePresence>

          {/* Navigation buttons */}
          {!isSuccess && (
            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 1
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                    : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
              >
                <ChevronLeft className="w-5 h-5" />
                Atrás
              </motion.button>

              {currentStep === STEPS.length + 1 ? (
                <motion.button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0044FF] hover:bg-white text-black rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Confirmar Reserva
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0044FF] hover:bg-white text-black rounded-lg font-medium transition-all"
                >
                  Siguiente
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          )}
        </motion.div>

        {/* Footer text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-gray-500 text-sm mt-8"
        >
          Tus datos están seguros y solo se usarán para contactarte sobre tu reserva
        </motion.p>
      </div>
    </div>
  )
}
