import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, targetLang = "es" } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    // Usamos MyMemory API (Gratis, hasta 1000 palabras/día)
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`
    );

    const data = await response.json();

    if (data.responseData) {
      return NextResponse.json({ translatedText: data.responseData.translatedText });
    } else {
      throw new Error("Translation failed");
    }
  } catch (error) {
    console.error("Translation error:", error);
    return NextResponse.json({ error: "Error translating text" }, { status: 500 });
  }
}
