import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import EmailTemplate from "../../../templates-emails/booking-email";
import { createClient } from "@supabase/supabase-js";

// Cliente con service role key para bypass de RLS en el servidor
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

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
  imageUrl?: string;
}

export async function POST(request: NextRequest) {
  try {
    let body: LeadData;

    // 1. PROCESAR DATOS
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();

      // Recuperamos la URL de ImageKit
      const referenceImage = formData.get("referenceImage") as string;

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
        imageUrl: referenceImage || undefined,
      };

    } else {
      body = await request.json();
    }

    // Compatibilidad con versiones anteriores del formulario
    if (!body.vision) {
      body.vision = (body as any).message || (body as any).tattooType || "";
    }

    if (!body.name || !body.email || !body.phone || !body.vision || !body.terms) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (nombre, email, teléfono, visión o términos)." },
        { status: 400 }
      );
    }

    // 2. GUARDAR EN SUPABASE
    const { data: dbData, error: dbError } = await supabase
      .from('leads')
      .insert([
        {
          name: body.name,
          email: body.email,
          phone: body.phone,
          contact_method: body.contactMethod || "Email",
          vision: body.vision,
          size: body.size || "No especificado",
          budget: body.budget || "No especificado",
          date: body.date || "No especificada",
          terms: body.terms,
          image_url: body.imageUrl || null,
          status: 'new'
        }
      ])
      .select();

    if (dbError) {
      console.error("Error inserting into Supabase:", dbError);
      return NextResponse.json(
        { error: "Error al guardar en la base de datos", details: dbError.message },
        { status: 500 }
      );
    }

    // 3. ENVIAR EMAILS (con fallbacks para evitar errores de tipo)
    const emailData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      vision: body.vision,
      size: body.size || "No especificado",
      budget: body.budget || "No especificado",
      date: body.date || "No especificada",
      contactMethod: body.contactMethod || "Email",
      imageUrl: body.imageUrl,
    };

    await Promise.all([
      // Mail al Tatuador
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "reservas@tattoostudio.com",
        to: ARTIST_EMAIL,
        subject: `🔥 NEW LEAD: ${body.name}`,
        react: <EmailTemplate
          {...emailData}
          type="artist"
        />,
      }),

      // Mail al Cliente 
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "reservas@tattoostudio.com",
        to: body.email,
        subject: `Booking Received - Studio`,
        react: <EmailTemplate
          {...emailData}
          type="client"
        />,
      })
    ]);

    return NextResponse.json(
      { success: true, message: "Enviado con éxito", data: body, dbData },
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