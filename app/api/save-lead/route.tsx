import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../../templates-emails/booking-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const ARTIST_EMAIL = process.env.ARTIST_EMAIL || "";

interface LeadData {
  name: string;
  phone: string;
  email: string;
  vision: string;
  size: string;
  budget?: string;
  contactMethod?: string;
  date?: string;
  terms?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    let body: LeadData;
    let attachment: { filename: string; content: Buffer } | undefined;

    // 1. PROCESAR DATOS (sin guardar en base de datos)
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      if (file && file.size > 0) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
          return NextResponse.json(
            { error: "Tipo de archivo no permitido. Solo JPG, PNG, WEBP o GIF." },
            { status: 400 }
          );
        }

        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
          return NextResponse.json(
            { error: "El archivo es demasiado grande. Máximo 10MB." },
            { status: 400 }
          );
        }

        const arrayBuffer = await file.arrayBuffer();
        attachment = {
          filename: file.name || "referencia.jpg",
          content: Buffer.from(arrayBuffer),
        };
      }

      body = {
        name: formData.get("name") as string,
        phone: formData.get("phone") as string,
        email: formData.get("email") as string,
        vision: formData.get("vision") as string,
        size: formData.get("size") as string,
        budget: formData.get("budget") as string,
        contactMethod: formData.get("contactMethod") as string,
        date: formData.get("date") as string,
        terms: formData.get("terms") === "true",
      };
    } else {
      body = await request.json();
    }

    if (!body.vision) {
      body.vision = (body as any).message || (body as any).tattooType || "";
    }

    if (!body.name || !body.email || !body.vision) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, teléfono, visión o términos)." },
        { status: 400 }
      );
    }

    // 2. ENVIAR EMAILS CON ADJUNTO DIRECTO (sin base de datos)
    const emailData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      vision: body.vision,
      size: body.size || "No especificado",
      budget: body.budget || "No especificado",
      date: body.date || "No especificada",
      contactMethod: body.contactMethod || "Email",
      attachmentName: attachment?.filename,
    };

    const fromAddress = process.env.RESEND_FROM_EMAIL || "reservas@coniperez.com";

    // Mail al Tatuador (con la foto adjunta si existe)
    const artistMailResult = await resend.emails.send({
      from: fromAddress,
      to: ARTIST_EMAIL,
      replyTo: body.email,
      subject: `🔥 Nueva Reserva: ${body.name}`,
      attachments: attachment ? [attachment] : undefined,
      react: <EmailTemplate {...emailData} type="artist" />,
    });

    if (artistMailResult.error) {
      console.error("Error enviando mail al artista:", artistMailResult.error);
      return NextResponse.json(
        { error: "No se pudo enviar el correo", details: artistMailResult.error.message },
        { status: 500 }
      );
    }

    // Mail de confirmación al Cliente (no bloqueante si se usa dominio de prueba de Resend)
    try {
      await resend.emails.send({
        from: fromAddress,
        to: body.email,
        subject: `Booking Received - Coni Pérez`,
        react: <EmailTemplate {...emailData} type="client" />,
      });
    } catch (clientMailErr) {
      console.warn("Aviso: no se pudo enviar copia al cliente:", clientMailErr);
    }

    return NextResponse.json(
      { success: true, message: "Enviado con éxito", data: body },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error interno al procesar la solicitud" },
      { status: 500 }
    );
  }
}
