import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Tipo de archivo no permitido. Solo JPG, PNG, WEBP o GIF." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "El archivo es demasiado grande. Máximo 10MB." },
        { status: 400 }
      );
    }

    const privateKey = (process.env.PRIVATE_KEY || "").trim();
    if (!privateKey) {
      return NextResponse.json(
        { error: "Falta configurar PRIVATE_KEY de ImageKit" },
        { status: 500 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64File = Buffer.from(arrayBuffer).toString("base64");
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const fileName = `referencia-${timestamp}.${extension}`;

    const ikForm = new FormData();
    ikForm.append("file", base64File);
    ikForm.append("fileName", fileName);
    ikForm.append("folder", "/referencias-tatuajes");

    const authHeader = "Basic " + Buffer.from(`${privateKey}:`).toString("base64");

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      headers: {
        Authorization: authHeader,
      },
      body: ikForm,
    });

    const result = await response.json();

    if (!response.ok || !result.url) {
      console.error("ImageKit upload error:", result);
      return NextResponse.json(
        { error: result.message || "Error al subir la imagen a ImageKit" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: result.url }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
