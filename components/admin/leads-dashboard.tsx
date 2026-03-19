"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { format } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, Phone, Mail, FileText, Image as ImageIcon, Calendar as CalendarIcon, CheckCircle2, Clock, Check, LayoutGrid, List, Languages, ArrowLeft, AlertCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type Lead = {
    id: string
    created_at: string
    name: string
    email: string
    phone: string
    contact_method: string
    vision: string
    size: string
    artist: string
    budget: string
    date: string
    terms: boolean
    image_url: string | null
    status: string
}

export default function LeadsDashboard() {
    const router = useRouter()
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filter, setFilter] = useState("all")
    const [viewMode, setViewMode] = useState<"grid" | "table" | "calendar">("grid")
    const [editingLead, setEditingLead] = useState<string | null>(null)
    const [editingData, setEditingData] = useState<{ 
        date: string, 
        vision: string,
        name: string,
        phone: string,
        size: string,
        budget: string
    }>({ 
        date: "", 
        vision: "",
        name: "",
        phone: "",
        size: "",
        budget: ""
    })
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [translations, setTranslations] = useState<{ [id: string]: string }>({})
    const [translating, setTranslating] = useState<{ [id: string]: boolean }>({})
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null)

    useEffect(() => {
        const token = localStorage.getItem("admin_token")
        if (token === "authorized_session_2026") {
            setIsAuthenticated(true)
            fetchLeads()
        } else {
            router.push("/admin/login")
        }
    }, [router])

    // Helper para parsear la fecha guardada (que puede ser texto libre o ISO)
    const parseLeadDate = (dateStr: string): Date | null => {
        if (!dateStr) return null
        const d = new Date(dateStr)
        return isNaN(d.getTime()) ? null : d
    }

    // Obtener días que tienen turnos reservados
    const bookedDays = leads
        .filter(l => l.status === 'booked')
        .map(l => parseLeadDate(l.date))
        .filter(d => d !== null) as Date[]

    const fetchLeads = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) {
                throw error
            }

            if (data) {
                setLeads(data as Lead[])
            }
        } catch (error) {
            console.error("Error fetching leads:", error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const { error } = await supabase
                .from('leads')
                .update({ status: newStatus })
                .eq('id', id)

            if (error) throw error

            setLeads(leads.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead))
        } catch (error) {
            console.error("Error updating status:", error)
        }
    }

    const saveChanges = async (id: string, lead: Lead) => {
        try {
            setLoading(true)
            const response = await fetch('/api/confirm-appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    date: editingData.date,
                    vision: editingData.vision,
                    name: editingData.name,
                    phone: editingData.phone,
                    size: editingData.size,
                    budget: editingData.budget,
                    email: lead.email,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || "Error al actualizar")
            }

            setLeads(leads.map(l => l.id === id ? { 
                ...l, 
                date: editingData.date, 
                vision: editingData.vision,
                name: editingData.name,
                phone: editingData.phone,
                size: editingData.size,
                budget: editingData.budget,
                status: 'booked'
            } : l))
            setEditingLead(null)
            setNotification({ message: "Datos actualizados y email enviado con éxito", type: 'success' })
            setTimeout(() => setNotification(null), 5000)
        } catch (error) {
            console.error("Error saving changes:", error)
            setNotification({ message: "Error al guardar: " + (error instanceof Error ? error.message : "Error desconocido"), type: 'error' })
            setTimeout(() => setNotification(null), 5000)
        } finally {
            setLoading(false)
        }
    }

    const startEditing = (lead: Lead) => {
        setEditingLead(lead.id)
        setEditingData({ 
            date: lead.date, 
            vision: lead.vision,
            name: lead.name,
            phone: lead.phone,
            size: lead.size,
            budget: lead.budget
        })
    }

    const translateText = async (id: string, text: string) => {
        if (!text) return
        try {
            setTranslating({ ...translating, [id]: true })
            const response = await fetch('/api/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            })
            const data = await response.json()
            if (data.translatedText) {
                setTranslations({ ...translations, [id]: data.translatedText })
            }
        } catch (error) {
            console.error("Translation error:", error)
        } finally {
            setTranslating({ ...translating, [id]: false })
        }
    }

    const filteredLeads = leads.filter(lead => {
        const matchesFilter = filter === "all" || lead.status === filter
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
            lead.name.toLowerCase().includes(searchLower) ||
            lead.email.toLowerCase().includes(searchLower) ||
            lead.phone.includes(searchTerm)

        return matchesFilter && matchesSearch
    })

    // Para evitar errores si format_date tira warning en fechas raras
    const safeFormatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), 'dd/MM/yyyy - HH:mm')
        } catch (e) {
            return "Fecha inválida"
        }
    }

    // Traductor simple para el campo de fecha preferida del usuario
    const translateUserDate = (dateStr: string) => {
        if (!dateStr) return "No especificada"
        const translations: { [key: string]: string } = {
            "january": "enero", "february": "febrero", "march": "marzo", "april": "abril", "may": "mayo", "june": "junio",
            "july": "julio", "august": "agosto", "september": "septiembre", "october": "octubre", "november": "noviembre", "december": "diciembre",
            "jan": "ene", "feb": "feb", "mar": "mar", "apr": "abr", "jun": "jun", "jul": "jul", "aug": "ago", "sep": "sep", "oct": "oct", "nov": "nov", "dec": "dic",
            "monday": "lunes", "tuesday": "martes", "wednesday": "miércoles", "thursday": "jueves", "friday": "viernes", "saturday": "sábado", "sunday": "domingo",
            "mon": "lun", "tue": "mar", "wed": "mié", "thu": "jue", "fri": "vie", "sat": "sáb", "sun": "dom"
        }
        let translated = dateStr.toLowerCase()
        Object.keys(translations).forEach(key => {
            const regex = new RegExp(`\\b${key}\\b`, 'g')
            translated = translated.replace(regex, translations[key])
        })
        return translated.charAt(0).toUpperCase() + translated.slice(1)
    }

    if (!isAuthenticated) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-metal-plateado border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div className="min-h-screen bg-black relative">
            {/* Background Image from Hero */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/fondo-geometrico_53876-90650.jpg"
                    alt="Background"
                    fill
                    priority
                    className="object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black via-black/90 to-black/95" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 relative z-10">
                {/* Notificación Custom */}
            {/* Notificación Custom */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className={`fixed top-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 min-w-[300px] backdrop-blur-xl ${
                            notification.type === 'success' 
                            ? 'bg-green-500/10 border-green-500/50 text-green-500' 
                            : 'bg-red-500/10 border-red-500/50 text-red-500'
                        }`}
                    >
                        {notification.type === 'success' ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        <span className="font-medium">{notification.message}</span>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-4">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-heading text-white mb-2 uppercase tracking-tight">Panel de Administración</h1>
                    <p className="text-[#9CA3AF] text-lg">Gestiona tus solicitudes de tatuaje y contactos entrantes.</p>
                </div>
                
                <Link 
                    href="/" 
                    className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full text-sm font-semibold transition-all flex items-center gap-2 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.3)] w-fit"
                >
                    <ArrowLeft className="w-4 h-4" /> Volver a la web
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 bg-white/[0.03] p-6 rounded-2xl border border-white/[0.05] backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Buscar contactos..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 bg-[#1A1A1A] border border-gray-300/30 rounded-md text-white focus:outline-hidden focus:border-gray-300 w-full sm:w-64"
                        />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 bg-[#1A1A1A] border border-gray-300/30 rounded-md text-white focus:outline-hidden focus:border-gray-300 appearance-none"
                        >
                            <option value="all">Todos los estados</option>
                            <option value="new">Nuevos</option>
                            <option value="contacted">Contactados</option>
                            <option value="booked">Reservados</option>
                            <option value="completed">Terminados</option>
                        </select>
                    </div>
                </div>

                <div className="flex bg-[#1A1A1A] border border-gray-300/30 rounded-md p-1 shadow-inner h-fit">
                    <button
                        onClick={() => setViewMode("table")}
                        className={`p-2 rounded-sm transition-colors ${viewMode === "table" ? "bg-metal-plateado/20 text-metal-plateado" : "text-gray-500 hover:text-white"}`}
                        title="Vista de Tabla"
                    >
                        <List className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-sm transition-colors ${viewMode === "grid" ? "bg-metal-plateado/20 text-metal-plateado" : "text-gray-500 hover:text-white"}`}
                        title="Vista de Cuadrícula"
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode("calendar")}
                        className={`p-2 rounded-sm transition-colors ${viewMode === "calendar" ? "bg-metal-plateado/20 text-metal-plateado" : "text-gray-500 hover:text-white"}`}
                        title="Vista de Calendario"
                    >
                        <CalendarIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="w-10 h-10 border-4 border-gray-300/30 border-t-[#d1d5db] rounded-full animate-spin"></div>
                </div>
            ) : filteredLeads.length === 0 ? (
                <div className="bg-[#1A1A1A] border border-gray-300/20 rounded-lg p-12 text-center">
                    <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl text-white font-heading mb-2">No se encontraron contactos</h3>
                    <p className="text-gray-400">Prueba ajustando los filtros o términos de búsqueda.</p>
                </div>
            ) : (
                viewMode === "calendar" ? (
                    <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-8">
                        <div className="bg-[#1A1A1A] p-8 rounded-lg border border-gray-300/20 flex justify-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate}
                                onSelect={setSelectedDate}
                                className="rounded-md border border-gray-300/10 bg-black"
                                modifiers={{
                                    booked: bookedDays
                                }}
                                modifiersClassNames={{
                                    booked: "bg-metal-plateado/30 text-metal-plateado font-bold ring-2 ring-metal-plateado"
                                }}
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-heading text-white mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5" /> Turnos para {selectedDate ? format(selectedDate, 'dd/MM') : '...'}
                            </h3>
                            {leads.filter(l => {
                                const d = parseLeadDate(l.date)
                                return l.status === 'booked' && d && selectedDate && 
                                    d.getDate() === selectedDate.getDate() &&
                                    d.getMonth() === selectedDate.getMonth() &&
                                    d.getFullYear() === selectedDate.getFullYear()
                            }).map(lead => (
                                <div key={lead.id} className="bg-[#1A1A1A] p-4 rounded-md border border-gray-300/10">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="font-bold text-white">{lead.name}</div>
                                        <div className="text-xs text-metal-plateado">{lead.date.includes('T') ? format(new Date(lead.date), 'HH:mm') : 'Hora s/d'}</div>
                                    </div>
                                    <div className="text-xs text-gray-400 mb-2 truncate">{lead.vision}</div>
                                    <button 
                                        onClick={() => {
                                            setViewMode("grid")
                                            setSearchTerm(lead.name)
                                        }}
                                        className="text-[10px] text-gray-500 hover:text-white underline"
                                    >
                                        Ver detalles
                                    </button>
                                </div>
                            ))}
                            {leads.filter(l => {
                                const d = parseLeadDate(l.date)
                                return d && selectedDate && 
                                    d.getDate() === selectedDate.getDate() &&
                                    d.getMonth() === selectedDate.getMonth() &&
                                    d.getFullYear() === selectedDate.getFullYear()
                            }).length === 0 && (
                                <p className="text-gray-500 text-center py-8 italic">No hay turnos agendados para este día.</p>
                            )}
                        </div>
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredLeads.map((lead) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={lead.id}
                                className="bg-[#1A1A1A] border border-gray-300/20 rounded-lg overflow-hidden flex flex-col hover:border-gray-300/50 transition-colors"
                            >
                                {/* Header Card */}
                                <div className="p-5 border-b border-[#2A2A2A] bg-black">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1 min-w-0">
                                            {editingLead === lead.id ? (
                                                <input
                                                    className="text-xl font-heading text-white bg-[#2A2A2A] p-1 rounded-md border border-gray-300/30 w-full"
                                                    value={editingData.name}
                                                    onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                                                />
                                            ) : (
                                                <h3 className="text-2xl font-heading text-white truncate pr-2">{lead.name}</h3>
                                            )}
                                            <div className="flex items-center gap-2 mt-1 text-gray-400 text-[10px] font-mono">
                                                <Clock className="w-3 h-3" /> {safeFormatDate(lead.created_at)}
                                            </div>
                                        </div>

                                        {/* Status Badge Dinámico al margen derecho */}
                                        <span className={`px-2 py-1 text-[9px] rounded-full font-bold uppercase tracking-wider whitespace-nowrap ${
                                            lead.status === 'new' ? 'bg-metal-plateado/20 text-metal-plateado' :
                                            lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-500' :
                                            lead.status === 'booked' ? 'bg-green-500/20 text-green-500' :
                                            'bg-gray-500/20 text-gray-500'
                                        }`}>
                                            {lead.status === 'new' ? 'NUEVO' :
                                                lead.status === 'contacted' ? 'CONTACTADO' :
                                                lead.status === 'booked' ? 'RESERVADO' :
                                                'TERMINADO'}
                                        </span>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-metal-plateado transition-colors">
                                            <Mail className="w-4 h-4" /> {lead.email}
                                        </a>
                                        <a href={`tel:${lead.phone}`} className="flex items-center gap-2 text-sm text-gray-300 hover:text-metal-plateado transition-colors">
                                            <Phone className="w-4 h-4" /> {lead.phone}
                                        </a>
                                    </div>
                                </div>

                                {/* Body Card */}
                                <div className="p-5 flex-1 bg-[#151515]">
                                    <div className="mb-4">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-500 text-xs block">Visión del Tatuaje</span>
                                                {!translations[lead.id] && (
                                                    <button
                                                        onClick={() => translateText(lead.id, lead.vision)}
                                                        disabled={translating[lead.id]}
                                                        className="text-[10px] text-metal-plateado underline hover:text-white transition-colors disabled:opacity-50"
                                                    >
                                                        {translating[lead.id] ? "Traduciendo..." : "Traducir a Español"}
                                                    </button>
                                                )}
                                            </div>

                                            {editingLead === lead.id ? (
                                                <textarea
                                                    className="w-full h-32 text-sm bg-[#2A2A2A] p-2 rounded-md border border-gray-300/30 text-white resize-none"
                                                    value={editingData.vision}
                                                    onChange={(e) => setEditingData({ ...editingData, vision: e.target.value })}
                                                />
                                            ) : (
                                                <div className="space-y-3">
                                                    <p className="text-[#D1D5DB] text-sm italic leading-relaxed">"{lead.vision}"</p>
                                                    {translations[lead.id] && (
                                                        <div className="p-3 bg-metal-plateado/5 border-l-2 border-metal-plateado rounded-r-sm">
                                                            <p className="text-xs text-metal-plateado mb-1 font-bold flex items-center gap-1">
                                                                <Languages className="w-3 h-3" /> TRADUCCIÓN:
                                                            </p>
                                                            <p className="text-sm text-white italic">"{translations[lead.id]}"</p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                        <div>
                                            <span className="text-gray-500 text-xs block mb-1">Tamaño</span>
                                            {editingLead === lead.id ? (
                                                <input
                                                    className="bg-[#2A2A2A] text-xs p-1 rounded-md border border-gray-300/30 text-white w-full"
                                                    value={editingData.size}
                                                    onChange={(e) => setEditingData({ ...editingData, size: e.target.value })}
                                                />
                                            ) : (
                                                <span className="text-white capitalize">{lead.size}</span>
                                            )}
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs block mb-1">Cita Profesional</span>
                                            {editingLead === lead.id ? (
                                                <input
                                                    type="datetime-local"
                                                    className="w-full text-xs bg-[#2A2A2A] p-1 rounded-md border border-gray-300/30 text-white"
                                                    value={editingData.date.includes(' ') ? '' : editingData.date} // Avoid trying to show text in datetime input
                                                    onChange={(e) => setEditingData({ ...editingData, date: e.target.value })}
                                                />
                                            ) : (
                                                <div className="flex items-center gap-1 text-white truncate"><CalendarIcon className="w-3 h-3" /> {translateUserDate(lead.date)}</div>
                                            )}
                                        </div>
                                        <div>
                                            <span className="text-gray-500 text-xs block mb-1">Presupuesto</span>
                                            {editingLead === lead.id ? (
                                                <input
                                                    className="bg-[#2A2A2A] text-xs p-1 rounded-md border border-gray-300/30 text-white w-full"
                                                    value={editingData.budget}
                                                    onChange={(e) => setEditingData({ ...editingData, budget: e.target.value })}
                                                />
                                            ) : (
                                                <span className="text-white">{lead.budget}</span>
                                            )}
                                        </div>
                                    </div>

                                    {lead.image_url && (
                                        <div className="mt-4">
                                            <a
                                                href={lead.image_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block rounded-md overflow-hidden border border-gray-300/30 group relative"
                                            >
                                                <div className="aspect-[4/3] bg-[#2A2A2A] relative">
                                                    <img
                                                        src={lead.image_url}
                                                        alt="Referencia"
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <ImageIcon className="w-8 h-8 text-white" />
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Actions */}
                                <div className="p-4 border-t border-[#2A2A2A] bg-[#1A1A1A] flex flex-wrap justify-between gap-2">
                                    {editingLead === lead.id ? (
                                        <>
                                            <button
                                                onClick={() => saveChanges(lead.id, lead)}
                                                className="flex-1 py-2 text-xs font-bold rounded-md bg-green-500/20 text-green-500 hover:bg-green-500/30 transition-colors"
                                            >
                                                Guardar
                                            </button>
                                            <button
                                                onClick={() => setEditingLead(null)}
                                                className="flex-1 py-2 text-xs font-medium rounded-md bg-gray-500/10 text-gray-400 hover:bg-gray-500/20 transition-colors"
                                            >
                                                X
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startEditing(lead)}
                                            className="px-6 py-2 text-xs font-bold rounded-md bg-metal-plateado text-black hover:bg-white transition-colors shadow-md"
                                        >
                                            EDITAR DATOS
                                        </button>
                                    )}
                                    <div className="flex flex-1 gap-2">
                                        <button
                                            onClick={() => updateStatus(lead.id, 'new')}
                                            className={`flex-1 py-2 text-[10px] font-medium rounded-md flex items-center justify-center gap-1 transition-colors ${lead.status === 'new' ? 'bg-metal-plateado/20 text-metal-plateado' : 'text-gray-400 hover:bg-[#2A2A2A]'}`}
                                        >
                                            <Clock className="w-3 h-3" /> Nuevo
                                        </button>
                                        <button
                                            onClick={() => updateStatus(lead.id, 'contacted')}
                                            className={`flex-1 py-2 text-[10px] font-medium rounded-md flex items-center justify-center gap-1 transition-colors ${lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-500' : 'text-gray-400 hover:bg-[#2A2A2A]'}`}
                                        >
                                            <Mail className="w-3 h-3" /> Contact.
                                        </button>
                                        <button
                                            onClick={() => updateStatus(lead.id, 'booked')}
                                            className={`flex-1 py-2 text-[10px] font-medium rounded-md flex items-center justify-center gap-1 transition-colors ${lead.status === 'booked' ? 'bg-green-500/20 text-green-500' : 'text-gray-400 hover:bg-[#2A2A2A]'}`}
                                        >
                                            <Check className="w-3 h-3" /> Reserv.
                                        </button>
                                        <button
                                            onClick={() => updateStatus(lead.id, 'completed')}
                                            className={`flex-1 py-2 text-[10px] font-medium rounded-md flex items-center justify-center gap-1 transition-colors ${lead.status === 'completed' ? 'bg-gray-500/20 text-gray-500' : 'text-gray-400 hover:bg-[#2A2A2A]'}`}
                                        >
                                            <CheckCircle2 className="w-3 h-3" /> Terminado
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-[#1A1A1A] border border-gray-300/20 rounded-lg overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#2A2A2A] text-gray-400 text-sm">
                                    <th className="p-4 font-medium uppercase text-xs">Cliente</th>
                                    <th className="p-4 font-medium uppercase text-xs">Contacto</th>
                                    <th className="p-4 font-medium uppercase text-xs">Fecha Pref.</th>
                                    <th className="p-4 font-medium uppercase text-xs">Tamaño y Presup.</th>
                                    <th className="p-4 font-medium uppercase text-xs">Referencia</th>
                                    <th className="p-4 font-medium uppercase text-xs">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2A2A2A]">
                                {filteredLeads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-[#202020] transition-colors">
                                        <td className="p-4">
                                            {editingLead === lead.id ? (
                                                <input
                                                    className="text-sm font-heading text-white bg-[#2A2A2A] p-1 rounded-md border border-gray-300/30 w-full mb-1"
                                                    value={editingData.name}
                                                    onChange={(e) => setEditingData({ ...editingData, name: e.target.value })}
                                                />
                                            ) : (
                                                <div className="font-heading text-white">{lead.name}</div>
                                            )}
                                            <div className="text-xs text-gray-500">{safeFormatDate(lead.created_at)}</div>
                                            <div className="mt-3">
                                                {editingLead === lead.id ? (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => saveChanges(lead.id, lead)} className="px-3 py-1 bg-green-500 text-black text-[10px] font-bold rounded hover:bg-green-400 transition-colors">GUARDAR</button>
                                                        <button onClick={() => setEditingLead(null)} className="px-3 py-1 bg-gray-600 text-white text-[10px] font-bold rounded hover:bg-gray-500 transition-colors">CANCELAR</button>
                                                    </div>
                                                ) : (
                                                    <button 
                                                        onClick={() => startEditing(lead)} 
                                                        className="px-4 py-1.5 bg-metal-plateado text-black text-[10px] font-bold rounded-md hover:bg-white transition-all shadow-sm border border-black/10 flex items-center gap-1"
                                                    >
                                                        <FileText className="w-3 h-3" /> EDITAR DATOS
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-gray-300 flex items-center gap-2"><Mail className="w-3 h-3" /> {lead.email}</div>
                                            {editingLead === lead.id ? (
                                                <input
                                                    className="bg-[#2A2A2A] text-xs p-1 rounded-md border border-gray-300/30 text-white w-full mt-1"
                                                    value={editingData.phone}
                                                    onChange={(e) => setEditingData({ ...editingData, phone: e.target.value })}
                                                />
                                            ) : (
                                                <div className="text-sm text-gray-300 flex items-center gap-2"><Phone className="w-3 h-3" /> {lead.phone}</div>
                                            )}
                                        </td>
                                        <td className="p-4 text-sm text-white">
                                            {editingLead === lead.id ? (
                                                <input
                                                    type="datetime-local"
                                                    className="w-full text-xs bg-[#2A2A2A] p-1 rounded-md border border-gray-300/30 text-white"
                                                    value={editingData.date.includes(' ') ? '' : editingData.date}
                                                    onChange={(e) => setEditingData({ ...editingData, date: e.target.value })}
                                                />
                                            ) : (
                                                translateUserDate(lead.date)
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {editingLead === lead.id ? (
                                                <div className="space-y-1">
                                                    <input
                                                        className="bg-[#2A2A2A] text-xs p-1 rounded-md border border-gray-300/30 text-white w-full"
                                                        value={editingData.size}
                                                        onChange={(e) => setEditingData({ ...editingData, size: e.target.value })}
                                                        placeholder="Tamaño"
                                                    />
                                                    <input
                                                        className="bg-[#2A2A2A] text-xs p-1 rounded-md border border-gray-300/30 text-white w-full"
                                                        value={editingData.budget}
                                                        onChange={(e) => setEditingData({ ...editingData, budget: e.target.value })}
                                                        placeholder="Presupuesto"
                                                    />
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="text-sm text-white capitalize">{lead.size}</div>
                                                    <div className="text-xs text-gray-400">{lead.budget}</div>
                                                </>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {lead.image_url ? (
                                                <a href={lead.image_url} target="_blank" rel="noopener noreferrer" className="inline-block">
                                                    <div className="w-12 h-12 rounded bg-[#2A2A2A] overflow-hidden border border-gray-300/30 hover:border-gray-300">
                                                        <img src={lead.image_url} alt="Ref" className="w-full h-full object-cover" />
                                                    </div>
                                                </a>
                                            ) : (
                                                <span className="text-xs text-gray-600">Sin imagen</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={lead.status}
                                                onChange={(e) => updateStatus(lead.id, e.target.value)}
                                                className={`text-xs px-2 py-1 rounded-md outline-hidden border-none cursor-pointer ${lead.status === 'new' ? 'bg-metal-plateado/20 text-metal-plateado' :
                                                        lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-500' :
                                                        lead.status === 'booked' ? 'bg-green-500/20 text-green-500' :
                                                        lead.status === 'completed' ? 'bg-gray-500/20 text-gray-500' :
                                                            ''
                                                    }`}
                                            >
                                                <option value="new" className="bg-[#1A1A1A] text-white">NUEVO</option>
                                                <option value="contacted" className="bg-[#1A1A1A] text-white">CONTACTADO</option>
                                                <option value="booked" className="bg-[#1A1A1A] text-white">RESERVADO</option>
                                                <option value="completed" className="bg-[#1A1A1A] text-white">TERMINADO</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )
            }
            </div>
        </div>
    )
}
