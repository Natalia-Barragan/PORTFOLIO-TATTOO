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
  artist?: string;
  budget?: string;
  contactMethod?: string;
  date?: string;
  terms?: boolean;
  imageUrl?: string; // 👈 AGREGAMOS ESTO: Ahora esperamos una URL
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
        artist: formData.get("artist") as string,
        budget: formData.get("budget") as string,
        contactMethod: formData.get("contactMethod") as string,
        date: formData.get("date") as string,
        terms: formData.get("terms") === "true",
        imageUrl: referenceImage || undefined, // Guardamos la URL 
      };

    } else {
      body = await request.json();
    }

    if (!body.name || !body.email || !body.phone || !body.vision || !body.size || !body.date || !body.terms) {
      return NextResponse.json(
        { error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    await Promise.all([

      // Mail al Tatuador
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "reservas@tattoostudio.com",
        to: ARTIST_EMAIL,
        subject: `🔥 NEW LEAD: ${body.name}`,
        react: <EmailTemplate
          name={body.name}
          email={body.email}
          phone={body.phone}
          vision={body.vision}
          size={body.size}
          artist={body.artist || "No especificado"}
          budget={body.budget || "No especificado"}
          date={body.date}
          contactMethod={body.contactMethod || "Email"}
          imageUrl={body.imageUrl} //  PASAMOS LA URL A LA PLANTILLA
          type="artist"
        />,
      }),

      // Mail al Cliente 
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "reservas@tattoostudio.com",
        to: body.email,
        subject: `Booking Received - Studio`,
        react: <EmailTemplate
          name={body.name}
          email={body.email}
          phone={body.phone}
          vision={body.vision}
          size={body.size}
          artist={body.artist || "No especificado"}
          budget={body.budget || "No especificado"}
          date={body.date}
          contactMethod={body.contactMethod || "Email"}
          imageUrl={body.imageUrl} // PASAMOS LA URL A LA PLANTILLA
          type="client"
        />,
      })
    ]);

    return NextResponse.json(
      { success: true, message: "Enviado con éxito", data: body },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error interno" },
      { status: 500 }
    );
  }
}