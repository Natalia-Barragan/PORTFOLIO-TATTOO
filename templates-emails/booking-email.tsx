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
  Img,
  Link,
} from '@react-email/components';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  vision: string;
  size: string;
  artist: string;
  budget: string;
  date: string;
  contactMethod: string;
  imageUrl?: string;
  type?: 'client' | 'artist';
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  name,
  email,
  phone,
  vision,
  size,
  artist,
  budget,
  date,
  contactMethod,
  imageUrl,
  type = 'client',
}) => {
  const isArtist = type === 'artist';
  
  const brandColor = '#0044FF';

  const title = isArtist ? "New Booking Request 🚀" : "Booking Received! 🔥";
  const subTitle = isArtist ? "New lead from website" : "Thanks for choosing our Studio";
  const greeting = isArtist ? "Hello Team," : `Hey ${name}! 👋`;

  const mainText = isArtist 
    ? "A new client has submitted a booking request. Here are their contact details and project idea:"
    : "We've received your booking request. Our team is already reviewing your design idea to see how we can make it happen.";

  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>{title}</Preview>
        
        <Body className="bg-black font-sans py-5 px-2">
          <Container 
            className="bg-[#121212] mx-auto rounded-lg overflow-hidden border border-[#333333]"
            style={{ maxWidth: '600px', width: '100%' }}
          >
            
            {/* HEADER */}
            <Section className="px-8 py-8 text-center border-b border-[#333333]" style={{ backgroundColor: '#1A1A1A' }}>
              {/* Bajamos un poco el tamaño de letra para que no se vea gigante en movil */}
              <Heading className="text-white text-2xl font-bold m-0 mb-2">
                {isArtist ? "New Booking" : "Booking Received"}
              </Heading>
              <Text className="text-base m-0 font-medium" style={{ color: brandColor }}>
                {subTitle}
              </Text>
            </Section>

            {/* CONTENT */}
            <Section className="px-8 py-8">
              <Text className="text-white text-lg mb-4 leading-relaxed">
                {greeting}
              </Text>
              
              <Text className="text-gray-400 text-base mb-8 leading-relaxed">
                {mainText}
              </Text>

              {/* --- CLIENT CONTACT (Solo Artista) --- */}
              {/* Solucionado: Ahora es vertical para que no se choque el mail con el telefono */}
              {isArtist && (
                <Section className="bg-[#1A1A1A] rounded-lg p-6 mb-6 border border-[#333333]">
                  <Heading className="text-sm font-bold mb-4 m-0 uppercase tracking-widest" style={{ color: brandColor }}>
                    Client Contact
                  </Heading>
                  
                  <div className="space-y-4">
                    <div>
                       <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Full Name</Text>
                       <Text className="text-white text-base m-0 font-medium">{name}</Text>
                    </div>
                    <div>
                        <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Email</Text>
                        <Link href={`mailto:${email}`} className="text-white text-base m-0 font-medium no-underline">
                            {email}
                        </Link>
                    </div>
                    <div>
                        <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Phone</Text>
                        <Text className="text-white text-base m-0 font-medium">{phone}</Text>
                    </div>
                  </div>
                </Section>
              )}

              {/* --- PROJECT DETAILS --- */}
              {/* Solucionado: Quitamos el Grid que rompe en Gmail. Ahora es una lista vertical limpia */}
              <Section className="bg-[#1A1A1A] rounded-lg p-6 border border-[#333333]">
                <Heading className="text-sm font-bold mb-6 m-0 uppercase tracking-widest" style={{ color: brandColor }}>
                  Project Details
                </Heading>
                
                <div className="space-y-5">
                  
                  {/* Vision */}
                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Vision / Idea</Text>
                    <Text className="text-white text-base m-0 leading-relaxed border-l-2 pl-4 border-[#333] italic">
                        "{vision}"
                    </Text>
                  </div>

                  {/* Detalles en lista vertical */}
                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Artist Preference</Text>
                    <Text className="text-white text-base m-0">{artist || 'Any available'}</Text>
                  </div>

                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Approximate Size</Text>
                    <Text className="text-white text-base m-0">{size}</Text>
                  </div>

                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Estimated Budget</Text>
                    <Text className="text-white text-base m-0">{budget}</Text>
                  </div>

                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Preferred Date</Text>
                    <Text className="text-white text-base m-0">{date}</Text>
                  </div>

                  <div>
                    <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-1">Contact Method</Text>
                    <Text className="text-white text-base m-0">{contactMethod}</Text>
                  </div>

                  {/* IMAGEN */}
                  {imageUrl ? (
                    <div className="pt-4 mt-4 border-t border-[#333333]">
                      <Text className="text-gray-500 text-xs uppercase font-bold m-0 mb-3">
                        Reference Image
                      </Text>
                      
                      <div className="bg-black border border-[#333] rounded p-2 inline-block w-full text-center">
                         <Img 
                           src={imageUrl} 
                           alt="Tattoo Reference" 
                           width="100%"
                           className="rounded object-cover max-w-full h-auto mx-auto"
                         />
                      </div>
                      <div className="mt-3 text-center">
                        <Link 
                          href={imageUrl} 
                          className="text-sm font-bold underline decoration-dotted"
                          style={{ color: brandColor }}
                        >
                          Open full size image
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-2 mt-2 border-t border-[#333333]">
                        <Text className="text-gray-600 text-xs italic mt-4 mb-0">
                            (No reference images uploaded)
                        </Text>
                    </div>
                  )}
                </div>
              </Section>

              <Hr className="border-[#333333] my-8" />

              {/* Footer */}
              {!isArtist && (
                <>
                  <Text className="text-gray-400 text-base mb-6 leading-relaxed">
                    Our team will review your request and get back to you within 24 hours.
                  </Text>
                  <Text className="text-white text-base font-bold m-0">
                    The Studio Team ⚡
                  </Text>
                </>
              )}
              
            </Section>

            {/* Footer Legal */}
            <Section className="bg-[#000000] px-8 py-6 text-center border-t border-[#333333]">
              <Text className="text-gray-600 text-xs m-0 uppercase tracking-widest">
                Tattoo Studio
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;