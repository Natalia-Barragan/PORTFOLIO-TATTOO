import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Cliente con service role key para poder subir archivos desde el servidor
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    // Validar tipo de archivo
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Tipo de archivo no permitido. Solo JPG, PNG, WEBP o GIF." }, { status: 400 });
    }

    // Validar tamaño (10MB máximo)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: "El archivo es demasiado grande. Máximo 10MB." }, { status: 400 });
    }

    // Generar nombre único para el archivo
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const fileName = `referencia-${timestamp}.${extension}`;
    const filePath = `referencias/${fileName}`;

    // Convertir File a ArrayBuffer para subir
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const BUCKET_NAME = "Tattoo";

    // Crear el bucket si no existe
    const { data: buckets } = await supabaseAdmin.storage.listBuckets();
    const bucketExists = buckets?.some((b) => b.name === BUCKET_NAME);

    if (!bucketExists) {
      const { error: bucketError } = await supabaseAdmin.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"],
      });
      if (bucketError) {
        console.error("Error creating bucket:", bucketError);
        return NextResponse.json({ error: `Error creando bucket: ${bucketError.message}` }, { status: 500 });
      }
    }

    // Subir a Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Error uploading to Supabase Storage:", error);
      return NextResponse.json({ error: `Supabase error: ${error.message}` }, { status: 500 });
    }

    // Obtener la URL pública del archivo
    const { data: urlData } = supabaseAdmin.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return NextResponse.json({ url: urlData.publicUrl }, { status: 200 });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
