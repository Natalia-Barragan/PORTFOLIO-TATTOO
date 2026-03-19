import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import ConfirmationEmail from "../../../templates-emails/confirmacion-turno";
import { createClient } from "@supabase/supabase-js";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Server-side Supabase client with service role for full DB access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, date, email, name, vision, phone, size, budget } = body;

    if (!id || !date || !email || !name) {
      return NextResponse.json(
        { error: "Faltan campos requeridos (id, date, email, name)." },
        { status: 400 }
      );
    }

    // 1. Update Supabase record status and date
    const { error: dbError } = await supabase
      .from('leads')
      .update({ 
        date,
        name,
        phone: phone || "",
        size: size || "",
        budget: budget || "",
        vision: vision || "",
        status: 'booked' // Automatically change status to 'booked' when date is confirmed
      })
      .eq('id', id);

    if (dbError) {
      console.error("Error updating Supabase:", dbError);
      return NextResponse.json({ error: `Supabase error: ${dbError.message}` }, { status: 500 });
    }

    // 2. Send confirmation email to client
    const { error: emailError } = await resend.emails.send({
      from: `CONI PEREZ TATTOO <${process.env.RESEND_FROM_EMAIL}>`,
      to: [email],
      subject: "¡Turno de Tatuaje Confirmado! 💉",
      react: <ConfirmationEmail name={name} date={date} vision={vision || ""} />,
    });

    if (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // We don't return 500 because the DB update actually succeeded. 
      // But we inform the client.
    }

    return NextResponse.json(
      { success: true, message: "Turno confirmado y email enviado." },
      { status: 200 }
    );

  } catch (error) {
    console.error("Confirm appointment error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
