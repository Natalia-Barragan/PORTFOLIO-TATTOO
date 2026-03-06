# 🚀 Quick Start - TattooBooking

Comienza en 5 minutos con el módulo TattooBooking.

---

## ⚡ 5 Pasos Rápidos

### 1️⃣ Instalar Dependencias

```bash
npm install framer-motion lucide-react
```

✅ **Verificar:** `npm list framer-motion lucide-react`

---

### 2️⃣ Configurar Variables de Entorno

Crea `.env.local` en la raíz del proyecto:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_TABLE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_URL=https://your-instance.budibase.app
RESEND_FROM_EMAIL=reservas@tudominio.com
ADMIN_EMAIL=admin@tudominio.com
STUDIO_NAME=Victor Mane Tattoo
```

✅ **Verificar:** Reinicia dev server con `npm run dev`

---

### 3️⃣ Usar el Componente

En cualquier página:

```tsx
import TattooBooking from "@/components/tattoo-booking"

export default function Page() {
  return <TattooBooking />
}
```

✅ **Verificar:** Navega a `http://localhost:3000/booking`

---

### 4️⃣ Implementar Backend

Reemplaza el contenido de `app/api/save-lead/route.ts` con el código de `BACKEND_IMPLEMENTATION.md`.

✅ **Verificar:** Prueba el endpoint con curl o el navegador

---

### 5️⃣ Probar Flujo Completo

1. Llena el formulario
2. Verifica que aparezca en Budibase
3. Verifica que recibas emails
4. ¡Listo! 🎉

---

## 📋 Checklist Rápido

```
✅ Dependencias instaladas
✅ Variables de entorno configuradas
✅ Componente importado
✅ Backend implementado
✅ Flujo probado
```

---

## 🎯 Opciones de Integración

### Opción A: Página Dedicada (Más Simple)

```tsx
// app/booking/page.tsx
import TattooBooking from "@/components/tattoo-booking"

export default function BookingPage() {
  return <TattooBooking />
}
```

**Ventajas:** Simple, directo, URL clara
**Desventajas:** Requiere navegación separada

---

### Opción B: Sección en Landing (Más Integrado)

```tsx
// app/page.tsx
import TattooBooking from "@/components/tattoo-booking"

export default function Home() {
  return (
    <main>
      {/* Otras secciones */}
      <section className="py-20">
        <TattooBooking />
      </section>
    </main>
  )
}
```

**Ventajas:** Todo en una página, mejor UX
**Desventajas:** Página más larga

---

### Opción C: Modal (Más Elegante)

```tsx
"use client"

import { useState } from "react"
import TattooBooking from "@/components/tattoo-booking"

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main>
      <button onClick={() => setIsOpen(true)}>
        Reservar Ahora
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/80 z-50">
          <TattooBooking />
          <button onClick={() => setIsOpen(false)}>Cerrar</button>
        </div>
      )}
    </main>
  )
}
```

**Ventajas:** No interrumpe flujo, elegante
**Desventajas:** Requiere más código

---

## 🧪 Testing Rápido

### En el Navegador

```javascript
// Abre la consola (F12) y pega esto:
fetch('/api/save-lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Test User',
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

## 🎨 Personalización Rápida

### Cambiar Colores

En `components/tattoo-booking.tsx`:

Busca: `from-red-600 to-red-500`
Reemplaza con: `from-[#tu-color] to-[#tu-color]`

### Cambiar Título

Busca: `"Reserva tu Tatuaje"`
Reemplaza con: `"Tu título"`

### Agregar Tipo de Tatuaje

En `components/tattoo-booking.tsx`, línea ~30:

```typescript
const TATTOO_TYPES = [
  "Tradicional",
  "Minimalista",
  "Realista",
  "Tu tipo aquí",  // ← Agrega aquí
]
```

---

## 🔗 URLs Importantes

| Recurso | URL |
|---------|-----|
| Componente | `components/tattoo-booking.tsx` |
| Endpoint | `app/api/save-lead/route.ts` |
| Página | `app/booking/page.tsx` |
| Guía Completa | `TATTOO_BOOKING_GUIDE.md` |
| Ejemplos | `INTEGRATION_EXAMPLE.md` |
| Backend | `BACKEND_IMPLEMENTATION.md` |
| Variables | `ENV_SETUP.md` |

---

## 🆘 Problemas Comunes

| Problema | Solución |
|----------|----------|
| "Module not found" | `npm install framer-motion lucide-react` |
| Estilos no aplican | Verifica Tailwind CSS en `tailwind.config.ts` |
| Endpoint falla | Verifica `.env.local` y reinicia servidor |
| Emails no se envían | Verifica `RESEND_API_KEY` |
| Datos no se guardan | Verifica credenciales de Budibase |

---

## 📚 Documentación Completa

Para más detalles, consulta:

1. **TATTOO_BOOKING_GUIDE.md** - Guía principal
2. **INTEGRATION_EXAMPLE.md** - 6 ejemplos de integración
3. **BACKEND_IMPLEMENTATION.md** - Implementación completa
4. **IMPLEMENTATION_CHECKLIST.md** - Checklist paso a paso
5. **PROJECT_STRUCTURE.md** - Estructura del proyecto

---

## 🎯 Próximos Pasos

1. ✅ Instala dependencias
2. ✅ Configura variables de entorno
3. ✅ Prueba el componente
4. ✅ Implementa el backend
5. ✅ Integra en tu landing page
6. ✅ Deploy en Vercel

---

## 💡 Tips

- 💡 Usa `npm run dev` para desarrollo local
- 💡 Revisa los logs en la consola del navegador
- 💡 Prueba todas las validaciones antes de deploy
- 💡 Configura alertas en Vercel
- 💡 Revisa regularmente la tabla de leads en Budibase

---

## 🎉 ¡Listo!

El módulo TattooBooking está listo para usar. 

**¿Necesitas ayuda?** Consulta la documentación incluida.

---

**Versión:** 1.0.0
**Tiempo estimado:** 5-10 minutos
**Dificultad:** ⭐⭐ (Fácil)


