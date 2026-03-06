# 📸 Documentación de Implementación: ImageKit + Next.js

Este documento describe la arquitectura implementada para la gestión de imágenes en el sistema de reservas. Se utiliza **ImageKit** como proveedor de almacenamiento en la nube (CDN) para optimizar la carga y entrega de archivos visuales.

## 🎯 Objetivo
Permitir que los usuarios adjunten una imagen de referencia en el formulario de contacto sin sobrecargar el servidor de la aplicación, asegurando que la imagen sea accesible públicamente a través de una URL optimizada que se adjunta al correo de notificación.

----

## 🏗️ Arquitectura de la Solución

La implementación sigue un flujo de carga directa desde el cliente (Client-Side Uploading) pero asegurada por el servidor.

### 1. Autenticación Segura (Handshake)
Para evitar exponer las credenciales privadas en el navegador del cliente, se implementó un sistema de firma digital:
* El **Frontend** solicita permiso de carga al Backend antes de subir cualquier archivo.
* El **Backend** utiliza la `PRIVATE_KEY` para generar un token de autenticación temporal y firmado.
* Este token se devuelve al Frontend, permitiéndole subir el archivo directamente a la nube de ImageKit.

### 2. Componente de Carga (Frontend)
Se integró el SDK oficial en el formulario de reservas.
* El componente de carga se mantiene oculto visualmente y se activa mediante una interfaz personalizada (Drag & Drop).
* Al completarse la subida exitosa, ImageKit devuelve la URL pública del archivo.
* El formulario guarda **únicamente la URL** (string) en su estado interno, descartando el archivo binario pesado.

### 3. Procesamiento de Datos (API Route)
La ruta de la API encargada de guardar el "lead" (`save-lead`) fue refactorizada para adaptarse a este nuevo flujo:
* Ya no recibe ni procesa archivos adjuntos binarios (Buffers/Blobs).
* Recibe la URL de la imagen como un campo de texto más dentro del formulario.
* Envía esta URL a la plantilla de correo electrónico.

### 4. Visualización en Emails
Las plantillas de correo transaccional (Resend) fueron actualizadas para renderizar la imagen:
* Se utiliza un componente de imagen HTML optimizado.
* Se incluye un enlace de respaldo para ver la imagen en tamaño completo en caso de que el cliente de correo bloquee la visualización.
* El diseño es responsivo, adaptándose a dispositivos móviles sin romper el formato del correo.

---

## 🔑 Configuración requerida

Para que el sistema funcione en cualquier entorno (Local o Producción), se requieren las siguientes variables de entorno:

* **NEXT_PUBLIC_PUBLIC_KEY:** La clave pública de ImageKit (visible para el navegador).
* **NEXT_PUBLIC_URL_ENDPOINT:** La URL base de la biblioteca de medios.
* **PRIVATE_KEY:** La clave secreta para firmar las peticiones (solo servidor).

---

## 🛡️ Seguridad y Validaciones

* **Validación de Tipos:** El formulario solo acepta archivos de imagen.
* **Manejo de Errores:** Se implementaron notificaciones visuales en el formulario en caso de fallos en la red o autenticación.
* **CORS:** Se configuraron los orígenes permitidos en el panel de ImageKit para aceptar peticiones desde el dominio de la aplicación.

---

## 🚀 Beneficios de esta implementación
1.  **Rendimiento:** El servidor de Next.js no procesa la subida de archivos pesados, liberando recursos.
2.  **Entregabilidad:** Al no enviar archivos adjuntos pesados en el correo, se reduce drásticamente la probabilidad de caer en SPAM.
3.  **UX:** El usuario tiene feedback inmediato sobre la carga de su imagen.
=======


# 📸 Documentación de Implementación: ImageKit + Next.js.






