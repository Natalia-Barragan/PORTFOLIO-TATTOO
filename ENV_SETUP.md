# Configuración de Variables de Entorno

## 📋 Variables Requeridas

Para que el módulo TattooBooking funcione completamente, necesitas configurar las siguientes variables de entorno.

### 1. Resend (Email)

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Cómo obtenerla:**
1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta o inicia sesión
3. Ve a Settings → API Keys
4. Copia tu API Key

### 2. Budibase (CRM)

```bash
BUDIBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_TABLE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_URL=https://your-instance.budibase.app
```

**Cómo obtenerlas:**
1. Ve a tu instancia de Budibase
2. Ve a Settings → API Keys
3. Crea una nueva API Key
4. Copia los valores necesarios

### 3. Configuración de Correos

```bash
# Email desde el cual se enviarán los correos
RESEND_FROM_EMAIL=reservas@tudominio.com

# Email del administrador para recibir notificaciones
ADMIN_EMAIL=admin@tudominio.com

# Nombre del estudio
STUDIO_NAME=Victor Mane Tattoo
```

## 🔧 Archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con el siguiente contenido:

```env
# Resend Email API
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=reservas@victormane.com

# Budibase CRM
BUDIBASE_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_TABLE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
BUDIBASE_URL=https://your-instance.budibase.app

# Admin
ADMIN_EMAIL=admin@victormane.com
STUDIO_NAME=Victor Mane Tattoo
```

## ⚠️ Seguridad

- **Nunca** commits `.env.local` a Git
- **Nunca** compartas tus API Keys
- Usa variables de entorno diferentes para desarrollo y producción
- En Vercel, agrega las variables en Settings → Environment Variables

## 🚀 Deployment en Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Agrega cada variable:
   - `RESEND_API_KEY`
   - `BUDIBASE_API_KEY`
   - `BUDIBASE_APP_ID`
   - `BUDIBASE_TABLE_ID`
   - `BUDIBASE_URL`
   - `RESEND_FROM_EMAIL`
   - `ADMIN_EMAIL`
   - `STUDIO_NAME`

4. Redeploy tu aplicación

## 📝 Ejemplo de .env.local Completo

```env
# ===== RESEND EMAIL =====
RESEND_API_KEY=re_abc123def456ghi789jkl012mno345
RESEND_FROM_EMAIL=reservas@victormane.com

# ===== BUDIBASE CRM =====
BUDIBASE_API_KEY=abc123def456ghi789jkl012mno345pqr
BUDIBASE_APP_ID=app_abc123def456ghi789jkl012mno345
BUDIBASE_TABLE_ID=tbl_abc123def456ghi789jkl012mno345
BUDIBASE_URL=https://victormane.budibase.app

# ===== ADMIN =====
ADMIN_EMAIL=admin@victormane.com
STUDIO_NAME=Victor Mane Tattoo

# ===== OPCIONAL =====
# Para desarrollo local
NODE_ENV=development
```

## 🔍 Verificar Configuración

Después de configurar las variables, prueba que funcionen:

```bash
# En la consola del navegador
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

## 🆘 Problemas Comunes

### "Error: RESEND_API_KEY is not defined"
- Verifica que `.env.local` exista en la raíz del proyecto
- Reinicia el dev server: `npm run dev`
- Verifica que la clave esté correcta en Resend

### "Error: BUDIBASE_API_KEY is not defined"
- Verifica que la variable esté en `.env.local`
- Verifica que la clave sea válida en Budibase
- Reinicia el dev server

### "Error: 401 Unauthorized"
- Las API Keys pueden estar expiradas
- Verifica que las claves sean correctas
- Genera nuevas claves si es necesario

### "Error: 403 Forbidden"
- Verifica que la tabla en Budibase exista
- Verifica que el usuario tenga permisos de escritura
- Verifica que el `BUDIBASE_TABLE_ID` sea correcto

## 📚 Recursos

- [Resend Documentation](https://resend.com/docs)
- [Budibase API Documentation](https://docs.budibase.com/docs/api)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)

---

**Última actualización:** 2024
