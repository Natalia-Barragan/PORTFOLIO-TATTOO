import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Tailwind,
  Link,
} from '@react-email/components';

interface ConfirmationEmailProps {
  name: string;
  date: string;
  vision: string;
}

export const ConfirmationEmail: React.FC<ConfirmationEmailProps> = ({
  name,
  date,
  vision,
}) => {
  const brandColor = '#d1d5db';

  return (
    <Html lang="es" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>¡Tu turno ha sido confirmado! 💉</Preview>
        
        <Body className="bg-black font-sans py-5 px-2">
          <Container 
            className="bg-[#121212] mx-auto rounded-lg overflow-hidden border border-[#333333]"
            style={{ maxWidth: '600px', width: '100%' }}
          >
            
            {/* HEADER */}
            <Section className="px-8 py-8 text-center border-b border-[#333333]" style={{ backgroundColor: '#1A1A1A' }}>
              <Heading className="text-white text-2xl font-bold m-0 mb-2">
                Turno Confirmado
              </Heading>
              <Text className="text-base m-0 font-medium" style={{ color: brandColor }}>
                ¡Prepárate para tu sesión de tatuaje!
              </Text>
            </Section>

            {/* CONTENT */}
            <Section className="px-8 py-8">
              <Text className="text-white text-lg mb-4 leading-relaxed">
                Hola {name}, 👋
              </Text>
              
              <Text className="text-gray-400 text-base mb-8 leading-relaxed">
                Tenemos buenas noticias. Tu turno para realizar tu tatuaje ha sido agendado y confirmado oficialmente.
              </Text>

              {/* --- DETALLES --- */}
              <Section className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333333]">
                <Heading className="text-sm font-bold mb-6 m-0 uppercase tracking-widest" style={{ color: brandColor }}>
                  Detalles del Turno
                </Heading>
                
                <div className="space-y-5">
                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Fecha y Hora</Text>
                    <Text className="text-white text-xl m-0 font-bold" style={{ color: brandColor }}>
                        {date}
                    </Text>
                  </div>

                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Proyecto</Text>
                    <Text className="text-white text-base m-0 italic">
                        "{vision}"
                    </Text>
                  </div>
                </div>
              </Section>

              <Hr className="border-[#333333] my-8" />

              <Text className="text-gray-400 text-sm mb-6 leading-relaxed italic">
                * Recuerda asistir bien alimentado, hidratado y llevar ropa cómoda que permita el acceso a la zona del tatuaje.
              </Text>

              <Text className="text-white text-base font-bold m-0">
                ¡Nos vemos pronto! ⚡
              </Text>
              
            </Section>

            {/* Footer Legal */}
            <Section className="bg-[#000000] px-8 py-6 text-center border-t border-[#333333]">
              <Text className="text-gray-600 text-xs m-0 uppercase tracking-widest">
                CONI PEREZ TATTOO STUDIO
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationEmail;
