"use client"; 

import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-next";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const authenticator = async () => {
  try {

    const response = await fetch("/api/imagekit-auth");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error}`);
  }
};

export default function ImageKitTest() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Prueba de ImageKit</h1>

      <ImageKitProvider
        publicKey={publicKey}
        urlEndpoint={urlEndpoint}
        authenticator={authenticator}
      >
        {/* BOTÓN DE SUBIDA */}
        <h2 className="mb-2">Subir imagen:</h2>
        <IKUpload
          fileName="test-upload.png"
          onError={(err) => console.log("Error", err)}
          onSuccess={(res) => console.log("Éxito", res)}
          className="mb-10"
        />

        {/* MOSTRAR IMAGEN*/}
        <h2 className="mb-2">Mostrar imagen optimizada:</h2>
        <IKImage
          path="/default-image.jpg"
          width={400}
          height={300}
          alt="Imagen de prueba"
          className="rounded-lg shadow-lg"
        />
      </ImageKitProvider>
    </div>
  );
}