"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AdminLogin() {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        // Para este proyecto de artista único, usamos una contraseña directa
        // En un entorno de producción real, esto debería ser vía Supabase Auth,
        // pero para facilidad de la usuaria simplificamos con una entrada de código maestro.
        if (password === "CONI2026") { // Contraseña maestra temporal
            localStorage.setItem("admin_token", "authorized_session_2026")
            router.push("/admin")
        } else {
            setError("Contraseña incorrecta. Inténtalo de nuevo.")
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 bg-[url('/fondo-geometrico_53876-90650.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md bg-[#111111]/80 backdrop-blur-2xl p-8 rounded-3xl border border-white/10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-metal-plateado rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                        <Lock className="w-8 h-8 text-black" />
                    </div>
                    <h1 className="text-3xl font-heading text-white">Admin Access</h1>
                    <p className="text-gray-400 mt-2">Ingresa tu clave maestra para continuar</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 p-4 rounded-xl text-white focus:outline-none focus:border-metal-plateado transition-all placeholder:text-gray-600"
                            required
                        />
                        {error && <p className="text-red-500 text-sm mt-2 ml-2">{error}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-metal-plateado text-black font-bold rounded-xl hover:bg-white transition-all transform active:scale-[0.98]"
                    >
                        {loading ? "Verificando..." : "Entrar al Panel"}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <Link href="/" className="text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm">
                        <ArrowLeft className="w-4 h-4" /> Volver a la web
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
