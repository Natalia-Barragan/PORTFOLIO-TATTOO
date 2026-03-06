# Implementación del Backend - TattooBooking

Guía completa para implementar la integración con Budibase y Resend.

## 📋 Tabla de Contenidos

1. [Configuración de Budibase](#configuración-de-budibase)
2. [Configuración de Resend](#configuración-de-resend)
3. [Implementación del Endpoint](#implementación-del-endpoint)
4. [Testing](#testing)

---

## 🗄️ Configuración de Budibase

### Paso 1: Crear la Tabla

1. Ve a tu instancia de Budibase
2. Crea una nueva tabla llamada `leads`
3. Agrega los siguientes campos:

| Campo | Tipo | Requerido | Notas |
|-------|------|-----------|-------|
| `name` | Texto | Sí | Nombre del cliente |
| `phone` | Texto | Sí | Teléfono de contacto |
| `email` | Texto | Sí | Email del cliente |
| `tattooType` | Texto | Sí | Tipo de tatuaje |
| `size` | Texto | Sí | Tamaño (Chico, Mediano, Grande) |
| `bodyArea` | Texto | Sí | Zona del cuerpo |
| `message` | Texto Largo | Sí | Descripción del tatuaje |
| `status` | Texto | Sí | Estado (nuevo, contactado, confirmado, completado) |
| `createdAt` | Fecha/Hora | Sí | Fecha de creación |
| `notes` | Texto Largo | No | Notas internas |

### Paso 2: Obtener Credenciales

1. Ve a Settings → API Keys
2. Crea una nueva API Key
3. Copia:
   - `API Key`
   - `App ID` (de la URL o dashboard)
   - `Table ID` (de la URL de la tabla)

### Paso 3: Crear Vista (Opcional)

Crea una vista para ver los leads recientes:

1. En la tabla `leads`, crea una nueva vista
2. Filtra por `status = "nuevo"`
3. Ordena por `createdAt` descendente

---

## 📧 Configuración de Resend

### Paso 1: Crear Cuenta

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta o inicia sesión
3. Verifica tu email

### Paso 2: Obtener API Key

1. Ve a Settings → API Keys
2. Crea una nueva API Key
3. Copia la clave (comienza con `re_`)

### Paso 3: Configurar Dominio (Opcional pero Recomendado)

Para enviar desde tu propio dominio:

1. Ve a Domains
2. Agrega tu dominio
3. Sigue las instrucciones para verificar DNS
4. Usa `reservas@tudominio.com` en lugar de `noreply@resend.dev`

---

## 🔧 Implementación del Endpoint

### Opción 1: Implementación Completa con Budibase y Resend

```typescript
// app/api/save-lead/route.ts
import { NextRequest, NextResponse } from "next/server"

interface LeadData {
  name: string
  phone: string
  email: string
  tattooType: string
  size: string
  bodyArea: string
  message: string
  status: string
}

// Tipos para Budibase
interface BudibaseRow {
  name: string
  phone: string
  email: string
  tattooType: string
  size: string
  bodyArea: string
  message: string
  status: string
  createdAt: string
  notes?: string
}

// Guardar en Budibase
async function saveToBuilbase(data: LeadData): Promise<any> {
  const row: BudibaseRow = {
    ...data,
    createdAt: new Date().toISOString(),
  }

  const response = await fetch(
    `${process.env.BUDIBASE_URL}/api/v1/tables/${process.env.BUDIBASE_TABLE_ID}/rows`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.BUDIBASE_API_KEY}`,
      },
      body: JSON.stringify(row),
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Budibase error: ${error}`)
  }

  return response.json()
}

// Enviar email al cliente
async function sendClientEmail(data: LeadData): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "reservas@victormane.com",
      to: data.email,
      subject: "Tu reserva ha sido registrada - Victor Mane Tattoo",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              .details { background: #fff; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>¡Gracias por tu reserva!</h1>
              </div>
              <div class="content">
                <p>Hola <strong>${data.name}</strong>,</p>
                <p>Hemos recibido tu solicitud de tatuaje. Nos pondremos en contacto contigo pronto en el número <strong>${data.phone}</strong>.</p>
                
                <div class="details">
                  <h3>Detalles de tu reserva:</h3>
                  <ul>
                    <li><strong>Tipo de tatuaje:</strong> ${data.tattooType}</li>
                    <li><strong>Tamaño:</strong> ${data.size}</li>
                    <li><strong>Zona del cuerpo:</strong> ${data.bodyArea}</li>
                    <li><strong>Descripción:</strong> ${data.message}</li>
                  </ul>
                </div>

                <p>Si tienes alguna pregunta, no dudes en contactarnos.</p>
                <p>Saludos,<br><strong>El equipo de Victor Mane Tattoo</strong></p>
              </div>
              <div class="footer">
                <p>Este es un email automático, por favor no respondas a este correo.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    console.error("Resend error:", error)
    throw new Error(`Email error: ${error}`)
  }
}

// Enviar email al admin
async function sendAdminEmail(data: LeadData): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM_EMAIL || "reservas@victormane.com",
      to: process.env.ADMIN_EMAIL || "admin@victormane.com",
      subject: `Nueva reserva: ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #dc2626; color: #fff; padding: 20px; text-align: center; }
              .content { padding: 20px; background: #f9f9f9; }
              table { width: 100%; border-collapse: collapse; }
              td { padding: 10px; border-bottom: 1px solid #ddd; }
              td:first-child { font-weight: bold; width: 150px; background: #f0f0f0; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Nueva Reserva Recibida</h1>
              </div>
              <div class="content">
                <table>
                  <tr>
                    <td>Nombre:</td>
                    <td>${data.name}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>${data.email}</td>
                  </tr>
                  <tr>
                    <td>Teléfono:</td>
                    <td>${data.phone}</td>
                  </tr>
                  <tr>
                    <td>Tipo de Tatuaje:</td>
                    <td>${data.tattooType}</td>
                  </tr>
                  <tr>
                    <td>Tamaño:</td>
                    <td>${data.size}</td>
                  </tr>
                  <tr>
                    <td>Zona del Cuerpo:</td>
                    <td>${data.bodyArea}</td>
                  </tr>
                  <tr>
                    <td>Descripción:</td>
                    <td>${data.message}</td>
                  </tr>
                  <tr>
                    <td>Fecha:</td>
                    <td>${new Date().toLocaleString("es-AR")}</td>
                  </tr>
                </table>
              </div>
            </div>
          </body>
        </html>
      `,
    }),
  })

  if (!response.ok) {
    console.error("Admin email error:", await response.text())
    // No fallar si el email al admin falla
  }
}

// Main handler
export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json()

    // Validar campos requeridos
    const requiredFields = ["name", "phone", "email", "tattooType", "size", "bodyArea", "message"]
    for (const field of requiredFields) {
      if (!body[field as keyof LeadData]) {
        return NextResponse.json(
          { error: `Campo requerido: ${field}` },
          { status: 400 }
        )
      }
    }

    // Guardar en Budibase
    const budibaseResult = await saveToBuilbase(body)
    console.log("Lead saved to Budibase:", budibaseResult)

    // Enviar emails
    await Promise.all([
      sendClientEmail(body),
      sendAdminEmail(body),
    ]).catch((err) => {
      console.error("Email error:", err)
      // No fallar la solicitud si los emails fallan
    })

    return NextResponse.json(
      {
        success: true,
        message: "Lead guardado correctamente",
        data: body,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing lead:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Error al procesar la solicitud",
      },
      { status: 500 }
    )
  }
}
```

### Opción 2: Implementación Simplificada (Solo Guardar)

Si solo quieres guardar los datos sin enviar emails:

```typescript
// app/api/save-lead/route.ts
import { NextRequest, NextResponse } from "next/server"

interface LeadData {
  name: string
  phone: string
  email: string
  tattooType: string
  size: string
  bodyArea: string
  message: string
  status: string
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json()

    // Validar campos
    if (!body.name || !body.phone || !body.email) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      )
    }

    // Guardar en Budibase
    const response = await fetch(
      `${process.env.BUDIBASE_URL}/api/v1/tables/${process.env.BUDIBASE_TABLE_ID}/rows`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BUDIBASE_API_KEY}`,
        },
        body: JSON.stringify({
          ...body,
          createdAt: new Date().toISOString(),
        }),
      }
    )

    if (!response.ok) {
      throw new Error("Error al guardar en Budibase")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: "Error al procesar" },
      { status: 500 }
    )
  }
}
```

---

## 🧪 Testing

### 1. Test Local

```bash
# Asegúrate de que .env.local esté configurado
npm run dev

# En otra terminal, usa curl
curl -X POST http://localhost:3000/api/save-lead \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "+541160000000",
    "email": "test@example.com",
    "tattooType": "Realista",
    "size": "Mediano",
    "bodyArea": "Brazo",
    "message": "This is a test message with at least 10 characters",
    "status": "nuevo"
  }'
```

### 2. Test en el Navegador

```javascript
// En la consola del navegador
fetch('/api/save-lead', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan Pérez',
    phone: '+541160000000',
    email: 'juan@example.com',
    tattooType: 'Realista',
    size: 'Mediano',
    bodyArea: 'Brazo derecho',
    message: 'Quiero un tatuaje de lobo realista con detalles',
    status: 'nuevo'
  })
})
.then(r => r.json())
.then(console.log)
```

### 3. Verificar en Budibase

1. Ve a tu tabla `leads` en Budibase
2. Deberías ver una nueva fila con los datos

### 4. Verificar Emails

- Revisa tu email para el correo de confirmación
- Revisa el email del admin para la notificación

---

## 🔐 Seguridad

### Rate Limiting

Agrega rate limiting para prevenir abuso:

```typescript
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 h"),
})

export async function POST(request: NextRequest) {
  const ip = request.ip || "unknown"
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes" },
      { status: 429 }
    )
  }

  // ... resto del código
}
```

### Validación de Email

```typescript
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

if (!isValidEmail(body.email)) {
  return NextResponse.json(
    { error: "Email inválido" },
    { status: 400 }
  )
}
```

---

## 📚 Recursos

- [Budibase API Docs](https://docs.budibase.com/docs/api)
- [Resend Email API](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

**Última actualización:** 2024
