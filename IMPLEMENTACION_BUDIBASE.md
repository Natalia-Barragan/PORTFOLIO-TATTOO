# Documentación Técnica: Integración de Formulario Next.js con Budibase

Esta implementación utiliza un patrón de **"Proxy Seguro"** para proteger las credenciales de la aplicación.

**El problema:** Si conectamos el formulario del navegador directamente con Budibase, tendríamos que exponer nuestras claves secretas (`API Key` y `App ID`) en el código del cliente (Frontend), lo cual permitiría que cualquiera las robe.

**La solución:** Creamos una API interna en Next.js que actúa como intermediario. El formulario envía los datos a nuestro servidor (Next.js), y nuestro servidor se los envía a Budibase de forma segura.

---

## 1. Frontend (El Cliente)
**Archivo:** Componente del formulario (ej. `contact-form.tsx`)

En el navegador, capturamos los datos del usuario y los enviamos a **nuestra propia API** (`/api/budibase`).

*Nota: Aquí NO ponemos claves ni headers secretos. Solo empaquetamos los datos en un FormData.*

```javascript
const handleSubmit = async (e) => {
  e.preventDefault(); 
  
  // 1. Capturamos todos los datos del formulario automáticamente en un FormData
  const formDataToSend = new FormData(e.currentTarget);

  // 2. Enviamos a nuestra API interna (el intermediario)
  // IMPORTANTE: No enviamos a Budibase directo. Enviamos a "/api/budibase"
  const responseData = await fetch("/api/budibase", {
    method: "POST",
    body: formDataToSend,
  });

  if (responseData.ok) {
    console.log("Datos enviados correctamente al servidor");
  } else {
    console.error("Error al enviar el formulario");
  }
}
```

---

## 2. Backend (La API Route)
**Archivo:** `app/api/budibase/route.ts`

Este archivo es el **"Puente de Seguridad"**. Su función es recibir el paquete del cliente, agregarle las credenciales secretas y reenviarlo a Budibase.

```typescript
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // 1. Mapeamos los datos del formulario a un objeto JSON limpio
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      vision: formData.get("vision"),
      size: formData.get("size"),
      artist: formData.get("artist"),
      budget: formData.get("budget"),
      date: formData.get("date"),
      contactMethod: formData.get("contactMethod"),
      imageUrl: formData.get("referenceImage")
    };

    // 2. VALIDACIÓN: Asegurarnos de que tenemos la URL configurada en el servidor
    if (!process.env.BUDIBASE_WEBHOOK_URL) {
      console.error("Error: Falta la variable BUDIBASE_WEBHOOK_URL en el archivo .env");
      return new Response("Server Configuration Error", { status: 500 });
    }

    // 3. ENVIAMOS A BUDIBASE (Aquí ocurre la magia de seguridad)
    // Inyectamos las claves que están ocultas en las variables de entorno
    const response = await fetch(process.env.BUDIBASE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Estas dos líneas son OBLIGATORIAS y SECRETAS:
        "x-budibase-app-id": process.env.BUDIBASE_APP_ID || "",
        "x-budibase-api-key": process.env.BUDIBASE_API_KEY || ""
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Leemos el error que nos devuelve el servidor para entender qué pasó
      const errorText = await response.text();
      console.error("Error Budibase:", errorText);
      return new Response(`Error Webhook: ${errorText}`, { status: 500 });
    }

    return new Response("OK");

  } catch (error) {
    console.error("Error en el servidor:", error);
    return new Response("Server Error", { status: 500 });
  }
} 
```

---

## 3. Configuración de Variables (.env)

Para que el Backend funcione, las siguientes claves deben estar definidas en el archivo `.env.local` (y en las variables de entorno de Vercel). 

**NUNCA subir estas claves al repositorio público.**

```env
# La URL del Webhook (Se obtiene en la sección 'Automation' de Budibase)
BUDIBASE_WEBHOOK_URL=[https://tu-instancia.budibase.app/api/public/v1/webhooks/xyz](https://tu-instancia.budibase.app/api/public/v1/webhooks/xyz)...

# El ID de tu App (Se encuentra en la configuración de la App en Budibase)
BUDIBASE_APP_ID=app_tu_id_secreto

# La API Key (Se genera desde el portal de administración de Budibase)
BUDIBASE_API_KEY=secret_tu_clave_secreta
```