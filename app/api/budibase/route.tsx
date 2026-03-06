export async function POST(req: Request) {
  try {
    const formData = await req.formData();

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

    // VALIDACIÓN: Asegurarnos de que tenemos la URL configurada
    if (!process.env.BUDIBASE_WEBHOOK_URL) {
      console.error("Error: Falta la variable BUDIBASE_WEBHOOK_URL en el archivo .env");
      return new Response("Server Configuration Error", { status: 500 });
    }

    // 3. Enviamos al NUEVO Budibase (Tu servidor privado)
    const response = await fetch(process.env.BUDIBASE_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Estas dos líneas son OBLIGATORIAS para tu servidor privado:
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