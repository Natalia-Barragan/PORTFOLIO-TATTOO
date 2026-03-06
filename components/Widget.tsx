"use client"
import { useEffect, useRef } from "react";
import Script from "next/script";

// 1. Solución para TypeScript (si usas TS)
// Esto le dice a TS que confíe en que esta propiedad existirá en window
declare global {
  interface Window {
    TattooWidget: {
      mount: (element: HTMLElement | null, config: any) => void;
    };
  }
}

export default function Widget() {
  const isMounted = useRef(false);

  const initWidget = () => {
    // Verificación de seguridad
    if (!window.TattooWidget) {
      console.error("TattooWidget no se cargó correctamente");
      return;
    }

    const container = document.getElementById("tattoo-widget-root");
    
    // Evitamos montar el widget dos veces si React renderiza doble (React.StrictMode)
    if (container && !container.hasChildNodes()) {
       window.TattooWidget.mount(container, {
        apiUrl: "https://widgetchat.protolylat.com/booking/chatkit",
      });
      isMounted.current = true;
    }
  };

  return (
    <>
      {/* 2. Cargamos el script de manera optimizada */}
      <Script 
        src="https://widgetchat.protolylat.com/cdn/widget.js" // Pon aquí la URL del .js (ej. script.js)
        strategy="lazyOnload" // Carga el script después de que la página sea interactiva
        onLoad={() => {
          // 3. Se ejecuta SOLO cuando el script ha terminado de cargar
          initWidget();
        }}
      />
      <div id="tattoo-widget-root"></div>
    </>
  );
}