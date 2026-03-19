# 📖 Referencia Rápida - TattooBooking

Referencia rápida para consultas frecuentes.

---

## 🚀 Inicio Rápido

```bash
# 1. Instalar dependencias
npm install framer-motion lucide-react

# 2. Configurar .env.local
RESEND_API_KEY=re_xxxxx
BUDIBASE_API_KEY=xxxxx
BUDIBASE_APP_ID=xxxxx
BUDIBASE_TABLE_ID=xxxxx
BUDIBASE_URL=https://xxxxx.budibase.app
RESEND_FROM_EMAIL=reservas@tudominio.com
ADMIN_EMAIL=admin@tudominio.com

# 3. Importar componente
import TattooBooking from "@/components/tattoo-booking"

# 4. Usar en página
<TattooBooking />

# 5. Dev server
npm run dev
```

---

## 📁 Estructura de Archivos

```
components/tattoo-booking.tsx          ← Componente principal
app/api/save-lead/route.ts             ← Endpoint API
app/booking/page.tsx                   ← Página de ejemplo
```

---

## 🎯 Pasos del Formulario

| # | Campo | Validación |
|---|-------|-----------|
| 1 | Nombre | Mín. 2 caracteres |
| 2 | Teléfono | Mín. 10 dígitos |
| 3 | Email | Formato válido |
| 4 | Tipo de Tatuaje | Obligatorio |
| 5 | Tamaño | Chico/Mediano/Grande |
| 6 | Zona del Cuerpo | Obligatorio |
| 7 | Descripción | Mín. 10 caracteres |

---

## 🔌 Payload Enviado

```json
{
  "name": "Juan Pérez",
  "phone": "+541160000000",
  "email": "juan@example.com",
  "tattooType": "Realista",
  "size": "Mediano",
  "bodyArea": "Brazo derecho",
  "message": "Quiero un tatuaje de lobo realista",
  "status": "nuevo"
}
```

---

## 🎨 Personalización

### Cambiar Colores

En `components/tattoo-booking.tsx`:

```tsx
// Busca: from-red-600 to-red-500
// Reemplaza con: from-[#tu-color] to-[#tu-color]
```

### Cambiar Título

```tsx
// Busca: "Reserva tu Tatuaje"
// Reemplaza con: "Tu título"
```

### Agregar Tipo de Tatuaje

```typescript
const TATTOO_TYPES = [
  "Tradicional",
  "Tu tipo aquí",  // ← Agrega aquí
]
```

---

## 🧪 Testing

### Test en Navegador

```javascript
fetch('/api/save-lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test',
    phone: '+541160000000',
    email: 'test@example.com',
    tattooType: 'Realista',
    size: 'Mediano',
    bodyArea: 'Brazo',
    message: 'Test message with at least 10 characters',
    status: 'nuevo'
  })
}).then(r => r.json()).then(console.log)
```

---

## 🔗 Integración

### Opción A: Página Dedicada

```tsx
import TattooBooking from "@/components/tattoo-booking"

export default function BookingPage() {
  return <TattooBooking />
}
```

### Opción B: Sección en Landing

```tsx
import TattooBooking from "@/components/tattoo-booking"

export default function Home() {
  return (
    <main>
      <section className="py-20">
        <TattooBooking />
      </section>
    </main>
  )
}
```

### Opción C: Modal

```tsx
"use client"
import { useState } from "react"
import TattooBooking from "@/components/tattoo-booking"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Reservar</button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50">
          <TattooBooking />
        </div>
      )}
    </>
  )
}
```

---

## 🔧 Backend

### Implementación Básica

```typescript
// app/api/save-lead/route.ts
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // TODO: Guardar en Budibase
    // TODO: Enviar email con Resend
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar" },
      { status: 500 }
    )
  }
}
```

---

## 📚 Documentación

| Documento | Uso |
|-----------|-----|
| QUICK_START.md | Inicio rápido |
| TATTOO_BOOKING_GUIDE.md | Guía completa |
| INTEGRATION_EXAMPLE.md | Ejemplos |
| BACKEND_IMPLEMENTATION.md | Backend |
| ENV_SETUP.md | Variables |
| IMPLEMENTATION_CHECKLIST.md | Checklist |
| DOCUMENTATION_INDEX.md | Índice |

---

## 🆘 Troubleshooting

| Problema | Solución |
|----------|----------|
| "Module not found" | `npm install framer-motion lucide-react` |
| Estilos no aplican | Verifica Tailwind CSS |
| Endpoint falla | Verifica `.env.local` |
| Emails no se envían | Verifica `RESEND_API_KEY` |
| Datos no se guardan | Verifica credenciales Budibase |

---

## 🎯 Tipos de Tatuaje

```
Tradicional
Minimalista
Realista
Color
Linework
Geométrico
Acuarela
Tribal
```

---

## 📱 Breakpoints

```
Mobile:   < 640px
Tablet:   640px - 1024px
Desktop:  > 1024px
```

---

## 🔐 Variables de Entorno

```env
RESEND_API_KEY=re_xxxxx
BUDIBASE_API_KEY=xxxxx
BUDIBASE_APP_ID=xxxxx
BUDIBASE_TABLE_ID=xxxxx
BUDIBASE_URL=https://xxxxx.budibase.app
RESEND_FROM_EMAIL=reservas@tudominio.com
ADMIN_EMAIL=admin@tudominio.com
STUDIO_NAME=Victor Mane Tattoo
```

---

## 🎨 Colores

```
Primario:     #dc2626 (Red-600)
Secundario:   #d1d5db (Orange)
Fondo:        #000000 (Black)
Superficie:   #1a1a1a (Gray-950)
Borde:        #374151 (Gray-700)
Texto:        #ffffff (White)
Texto Débil:  #9ca3af (Gray-400)
Éxito:        #16a34a (Green-600)
Error:        #dc2626 (Red-600)
```

---

## 📊 Estadísticas

| Métrica | Valor |
|---------|-------|
| Líneas de código | ~600 |
| Componentes | 9 |
| Validaciones | 7 |
| Pasos | 7 |
| Documentos | 9 |
| Ejemplos | 20+ |

---

## 🚀 Deploy Vercel

```bash
# 1. Push a GitHub
git add .
git commit -m "Add TattooBooking"
git push

# 2. Agregar variables en Vercel
RESEND_API_KEY=...
BUDIBASE_API_KEY=...
# ... etc

# 3. Redeploy
# Vercel redeploya automáticamente
```

---

## 📞 Recursos

- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Budibase](https://budibase.com/)
- [Resend](https://resend.com/)
- [Next.js](https://nextjs.org/)

---

## ✅ Checklist Rápido

- [ ] Dependencias instaladas
- [ ] .env.local configurado
- [ ] Componente importado
- [ ] Backend implementado
- [ ] Probado localmente
- [ ] Integrado en landing page
- [ ] Deploy en Vercel
- [ ] Monitoreo configurado

---

**Versión:** 1.0.0
**Última actualización:** 2024
