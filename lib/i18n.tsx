"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "es" | "pt"

interface Translations {
  [key: string]: {
    [key in Language]: any
  }
}

export const translations: Translations = {
  // Navbar
  nav_about: { en: "About", es: "Sobre mí", pt: "Sobre mim" },
  nav_portfolio: { en: "Portfolio", es: "Galería", pt: "Portfólio" },
  nav_book: { en: "Book Now", es: "Reservar", pt: "Agendar" },
  language: { en: "Language", es: "Idioma", pt: "Idioma" },

  // Hero
  hero_cta: { en: "Book Now", es: "Reservar", pt: "Agendar" },

  // Aftercare Section
  aftercare_title: { en: "Tattoo Aftercare", es: "Cuidados del Tatuaje", pt: "Cuidados com a Tatuagem" },
  aftercare_hover: { en: "Hover to reveal", es: "Pasa el cursor", pt: "Passe o cursor" },
  
  // Aftercare Steps
  aftercare_step1_title: { en: "1. First Hours", es: "1. Primeras Horas", pt: "1. Primeiras Horas" },
  aftercare_step1_desc: { 
    en: "Remove the protective film after 2 to 4 hours. Wash the area immediately with lukewarm water and neutral soap to remove ink and plasma residues. Pat dry gently with disposable paper towels; never rub.",
    es: "Retira el film protector tras 2 a 4 horas. Lava la zona inmediatamente con agua tibia y jabón neutro para eliminar residuos de tinta y plasma. Seca dando toques suaves con toallas de papel desechables; nunca frotes.",
    pt: "Remova o filme protetor após 2 a 4 horas. Lave a área imediatamente com água morna e sabão neutro para remover resíduos de tinta e plasma. Seque suavemente com papel toalha descartável; nunca esfregue."
  },
  aftercare_step2_title: { en: "2. Hygiene & Washing", es: "2. Higiene y Lavado", pt: "2. Higiene e Lavagem" },
  aftercare_step2_desc: {
    en: "Wash your tattoo 2 or 3 times a day. It is essential to keep the area clean while avoiding excessive moisture. Always use clean hands and avoid sponges. Let the skin breathe for as long as possible.",
    es: "Lava tu tatuaje 2 o 3 veces al día. Es fundamental mantener la zona limpia pero evitar el exceso de humedad. Usa siempre las manos limpias y evita el uso de esponjas. Deja que la piel respire el mayor tiempo posible.",
    pt: "Lave sua tatuagem 2 ou 3 vezes ao dia. É essencial manter a área limpa, mas evite umidade excessiva. Use sempre as mãos limpas e evite esponjas. Deixe a pele respirar o máximo possível."
  },
  aftercare_step3_title: { en: "3. Proper Hydration", es: "3. Hidratación Justa", pt: "3. Hidratação Adequada" },
  aftercare_step3_desc: {
    en: "Starting on the second or third day, apply a very thin layer of specific aftercare ointment. Too much cream can suffocate pores; skin should look hydrated, but never shiny or greasy.",
    es: "A partir del segundo o tercer día, aplica una capa muy fina de pomada específica. El exceso de crema puede asfixiar los poros; la piel debe verse hidratada, pero nunca brillante o grasosa.",
    pt: "A partir del segundo ou terceiro dia, aplique uma camada muito fina de pomada específica. O excesso de creme pode sufocar os poros; a pele deve parecer hidratada, mas nunca brilhante ou gordurosa."
  },
  aftercare_step4_title: { en: "4. Risk Factors", es: "4. Factores de Riesgo", pt: "4. Fatores de Risco" },
  aftercare_step4_desc: {
    en: "During the first 20 days, avoid sun, pools, and saunas. Under no circumstances should you pick scabs or scratch the tattoo, as you could remove pigment and cause permanent scarring.",
    es: "Durante los primeros 20 días, evita el sol, piscinas y saunas. Bajo ninguna circunstancia debes arrancar las costras o rascar el tatuaje, ya que podrías retirar pigmento y dejar cicatrices permanentes.",
    pt: "Durante os primeiros 20 dias, evite sol, piscinas e saunas. Sob nenhuma circunstância você deve arrancar cascas ou coçar a tatuagem, pois isso pode remover o pigmento e causar cicatrizes permanentes."
  },

  // Gallery
  gallery_title: { en: "Living Art Gallery", es: "Galería de Arte Vivo", pt: "Galeria de Arte Viva" },
  gallery_subtitle: { en: "Precision, emotion, and timeless beauty", es: "Precisión, emoción y belleza atemporal", pt: "Precisão, emoção e beleza atemporal" },
  gallery_cta: { en: "Ready for your masterpiece? Book now", es: "¿Listo para tu obra maestra? Reservá ahora", pt: "Pronto para sua obra-prima? Reserve agora" },
  cat_all: { en: "All", es: "Todos", pt: "Todos" },
  cat_portrait: { en: "Portrait", es: "Retrato", pt: "Retrato" },
  cat_realism: { en: "Realism", es: "Realismo", pt: "Realismo" },
  cat_full_sleeve: { en: "Full Sleeve", es: "Manga Completa", pt: "Manga Completa" },
  cat_custom: { en: "Custom", es: "Personalizado", pt: "Personalizado" },

  // Footer
  footer_desc: { 
    en: "Independent visual artist and tattooer. Specializing in Fine Line and custom designs with technical precision and artistic sensitivity.",
    es: "Artista visual y tatuadora independiente. Especializada en Fine Line y diseños personalizados con precisión técnica y sensibilidad artística.",
    pt: "Artista visual e tatuadora independente. Especializada em Fine Line e desenhos personalizados com precisão técnica e sensibilidade artística."
  },
  footer_contact: { en: "Contact", es: "Contacto", pt: "Contato" },
  footer_location: { en: "Location", es: "Ubicación", pt: "Localização" },
  footer_city: { en: "Rio de Janeiro, Brasil", es: "Río de Janeiro, Brasil", pt: "Rio de Janeiro, Brasil" },
  
  // Hero Trust Indicators
  hero_custom: { en: "Fine Line Specialist", es: "Especialista en Fine Line", pt: "Especialista em Fine Line" },
  hero_precision: { en: "Visual Artist's Perspective", es: "Mirada de Artista Plástica", pt: "Olhar de Artista Plástica" },
  hero_studio: { en: "International Career", es: "Trayectoria Internacional", pt: "Trajetória Internacional" },

  // About Me
  about_label: { en: "About Me", es: "Sobre mí", pt: "Sobre mim" },
  about_title: { en: "My Vision, Your Skin", es: "Mi Mirada, Tu Piel", pt: "Meu Olhar, Sua Pele" },
  about_subtitle: { en: "Art in every stroke", es: "Arte en cada trazo", pt: "Arte em cada traço" },
  about_desc1: { 
    en: "I am Coni Pérez, a visual artist and tattoo artist. My journey began among canvases and brushes, and today I bring that same sensitivity to the skin through Fine Line work. With years of experience between Argentina and Brazil, I have perfected a style that prioritizes subtlety, cleanliness, and visual harmony.",
    es: "Soy Coni Pérez, artista plástica y tatuadora. Mi camino empezó entre lienzos y pinceles, y hoy esa misma sensibilidad la llevo a la piel a través del Fine Line. Con años de trayectoria entre Argentina y Brasil, he perfeccionado un estilo que prioriza la sutileza, la limpieza y la armonía visual.",
    pt: "Sou Coni Pérez, artista plástica e tatuadora. Meu caminho começou entre telas e pincéis, e hoje levo essa mesma sensibilidade para a pele através do Fine Line. Com anos de trajetória entre a Argentina e o Brasil, aperfeiçoei um estilo que prioriza a sutileza, a limpeza e a harmonia visual."
  },
  about_desc2: { 
    en: "As a professional and forensic makeup artist, I bring a unique technical precision to every design. I don't just aim to tattoo; I seek to interpret your idea with the rigor of a specialist and the soul of a visual artist.",
    es: "Como maquilladora profesional y forense, aporto una precisión técnica única a cada diseño. No solo busco tatuar; busco interpretar tu idea con el rigor de una especialista y el alma de una artista plástica.",
    pt: "Como maquiadora profissional e forense, trago uma precisão técnica única a cada desenho. Não busco apenas tatuar; busco interpretar sua ideia com o rigor de uma especialista e a alma de uma artista plástica."
  },
  about_stat1: { en: "TATTOOS", es: "TATUAJES", pt: "TATUAGENS" },
  about_stat2: { en: "YEARS OF ART", es: "AÑOS DE ARTE", pt: "ANOS DE ARTE" },
  about_stat3: { en: "DEDICATION", es: "DEDICACIÓN", pt: "DEDICAÇÃO" },

  // Home CTA
  cta_title: { en: "Book Your Session", es: "Reserva tu Sesión", pt: "Reserve sua Sessão" },
  cta_subtitle: { en: "Tell me about your tattoo idea...", es: "Contame tu idea de tatuaje...", pt: "Conte-me sua ideia de tatuagem..." },
  cta_button: { en: "Fill Out Form", es: "Completar Formulario", pt: "Preencher Formulário" },

  aftercare_modal_trigger: { en: "Tattoo Care", es: "Cuidados", pt: "Cuidados" },
  aftercare_modal_title: { en: "Aftercare Guide", es: "Guía de Cuidados", pt: "Guia de Cuidados" },

  faq_trigger: { en: "FAQ", es: "FAQ", pt: "FAQ" },
  faq_title: { en: "Frequently Asked Questions", es: "Preguntas Frecuentes", pt: "Perguntas Frequentes" },

  // Trust Bar
  trust_1: { en: "Visual Artist's Perspective", es: "Mirada de Artista Plástica", pt: "Olhar de Artista Plástica" },
  trust_2: { en: "From Canvas to Skin", es: "De la Tela a la Piel", pt: "Da Tela para a Pele" },
  trust_3: { en: "Argentinian Career in Brazil", es: "Trayectoria Argentina en Brasil", pt: "Trajetória Argentina no Brasil" },
  trust_4: { en: "Fine Line Specialist", es: "Especialista en Fine Line", pt: "Especialista em Fine Line" },
  trust_5: { en: "Author Illustrations", es: "Ilustraciones de Autor", pt: "Ilustrações de Autor" },
  trust_6: { en: "Forensic and Aesthetic Precision", es: "Precisión Forense y Estética", pt: "Precisão Forense e Estética" },
  trust_7: { en: "Subtlety in Every Stroke", es: "Sutileza en cada Trazo", pt: "Sutileza em cada Traço" },
  trust_8: { en: "Technique and Sensitivity", es: "Técnica y Sensibilidad", pt: "Técnica e Sensibilidade" },
  trust_9: { en: "Tattoo and Makeup Workshops", es: "Workshops de Tatuaje y Maquillaje", pt: "Workshops de Tatuagem e Maquiagem" },

  // Value Proposition
  value_title: { en: "The Art of Feeling Confident", es: "El Arte de Sentirse Seguro", pt: "A Arte de se Sentir Seguro" },
  value_subtitle: { en: "My experience meets your idea. Precision meets emotion.", es: "Mi experiencia se une a tu idea. La precisión se une a la emoción.", pt: "Minha experiência une-se à sua ideia. A precisão une-se à emoção." },
  value_card1_title: { en: "Technique and Artistic Sensitivity", es: "Técnica y Sensibilidad Artística", pt: "Técnica e Sensibilidade Artística" },
  value_card1_desc: { 
    en: "My background in visual arts and forensic makeup allows me to master anatomy and detail. I offer you an impeccable fine line and a curated aesthetic, transforming your skin into a work of art with the neatness you seek.", 
    es: "Mi formación en artes plásticas y maquillaje forense me permite dominar la anatomía y el detalle. Te ofrezco un trazo fino impecable y una estética cuidada, transformando tu piel en una obra de arte con la prolijidad que buscás.", 
    pt: "Minha formação em artes plásticas e maquiagem forense me permite dominar a anatomia e o detalhe. Ofereço um traço fino impecável e uma estética cuidadosa, transformando sua pele em uma obra de arte com a prolijidade que você procura." 
  },
  value_card2_title: { en: "A Close and Transparent Process", es: "Un Proceso Cercano y Transparente", pt: "Um Processo Próximo e Transparente" },
  value_card2_desc: { 
    en: "No surprises. From the personalized consultation to the aftercare, I maintain direct and honest communication. You are investing in a unique artist piece, created in a professional and friendly environment.", 
    es: "Sin sorpresas. Desde la consulta personalizada hasta el cuidado posterior, mantengo una comunicación directa y honesta. Estás invirtiendo en una pieza única de autor, creada en un entorno profesional y amigable.", 
    pt: "Sem surpresas. Da consulta personalizada aos cuidados posteriores, mantenho uma comunicação direta e honesta. Você está investindo em uma peça única de autor, criada em um ambiente profissional e amigável." 
  },
  
  faqs: {
    en: [
      { question: "What is your price range?", answer: "Each piece is a personalized investment in living art. Pricing varies by size, complexity, and session time. Quote provided during consultation." },
      { question: "How far in advance should I book?", answer: "I recommend booking 4–8 weeks in advance for major pieces. Occasional openings available for smaller ones." },
      { question: "Do you require a deposit?", answer: "Yes, a 50% deposit is required to secure your appointment and begin design work." },
      { question: "What is your cancellation policy?", answer: "48 hours' notice for cancellations. Within 48 hours forfeits the deposit." }
    ],
    es: [
      { question: "¿Cuál es el rango de precios?", answer: "Cada pieza es una inversión personalizada en arte vivo. Los precios varían según el tamaño y la complejidad. Se brinda presupuesto en la consulta." },
      { question: "¿Con cuánta anticipación debo reservar?", answer: "Recomiendo reservar con 4 a 8 semanas de antelación. A veces hay huecos para piezas pequeñas antes." },
      { question: "No olviden señar?", answer: "Sí, se requiere un depósito del 50% para asegurar tu reserva y comenzar el diseño." },
      { question: "¿Cuál es la política de cancelación?", answer: "Se requiere un aviso de 48 horas. Las cancelaciones dentro de las 48 horas pierden el depósito." }
    ],
    pt: [
      { question: "Qual é a faixa de preço?", answer: "Cada peça é um investimento personalizado em arte viva. O preço varia de acordo com o tamanho e a complexidade. Orçamento fornecido na consulta." },
      { question: "Com quanta antecedência devo reservar?", answer: "Recomendo reservar com 4 a 8 semanas de antecedência. Ocasionalmente há vagas para peças menores mais cedo." },
      { question: "É necessário depósito?", answer: "Sim, é necessário um depósito de 50% para garantir seu horário e iniciar o design." },
      { question: "Qual é a política de cancelamento?", answer: "É necessário aviso prévio de 48 horas. Cancelamentos em menos de 48 horas perdem o depósito." }
    ]
  },

  // Booking Form
  form_back: { en: "Back", es: "Volver", pt: "Voltar" },
  form_continue: { en: "Continue", es: "Continuar", pt: "Continuar" },
  form_submit: { en: "Submit", es: "Enviar", pt: "Enviar" },
  form_step: { en: "Step", es: "Paso", pt: "Passo" },
  form_of: { en: "of", es: "de", pt: "de" },
  form_placeholder_name: { en: "Enter your full name", es: "Ingresa tu nombre completo", pt: "Digite seu nome completo" },
  form_placeholder_email: { en: "you@example.com", es: "tu@ejemplo.com", pt: "voce@exemplo.com" },
  form_placeholder_phone: { en: "+1 234 567 8900", es: "+54 9 11 ...", pt: "+55 ..." },
  form_placeholder_vision: { en: "Tell us about the tattoo you're imagining...", es: "Contame sobre el tatuaje que estás imaginando...", pt: "Conte-me sobre a tatuagem que você está imaginando..." },
  form_placeholder_date: { en: "e.g., March 2025 or flexible", es: "ej. Marzo 2025 o flexible", pt: "ex. Março 2025 ou flexível" },
  form_error_name: { en: "Name is required", es: "El nombre es obligatorio", pt: "O nome é obrigatório" },
  form_error_email: { en: "Please enter a valid email", es: "Por favor ingresa un email válido", pt: "Por favor, insira un email válido" },
  form_error_phone: { en: "Format required: +CountryCode Number", es: "Formato requerido: +CódigoPaís Número", pt: "Formato obrigatório: +CódigoPaís Número" },
  form_error_vision: { en: "Please describe your idea", es: "Por favor describe tu idea", pt: "Por favor, descreva sua ideia" },
  form_upload_title: { en: "Upload images (optional)", es: "Subir imágenes (opcional)", pt: "Carregar imagens (opcional)" },
  form_upload_label: { en: "Click to upload or drag and drop", es: "Haz clic para subir o arrastra aquí", pt: "Clique para carregar ou arraste" },
  form_uploading: { en: "Uploading to cloud...", es: "Subiendo a la nube...", pt: "Enviando para a nuvem..." },
  form_terms: { 
    en: "I understand this is a request and final pricing will be discussed after design approval", 
    es: "Entiendo que esto es una solicitud y el precio final se discutirá tras la aprobación del diseño", 
    pt: "Entendo que este é um pedido e o preço final será discutido após a aprovação do design" 
  },
  form_success_thanks: { en: "Thank you!", es: "¡Gracias!", pt: "Obrigado!" },
  form_success_desc_quick: { 
    en: "Your consultation request has been received. We'll reach out within 24 hours.", 
    es: "Tu solicitud de consulta ha sido recibida. Nos contactaremos en 24 horas.", 
    pt: "Seu pedido de consulta foi recebido. Entraremos em contato em 24 horas." 
  },
  form_success_desc_full: { 
    en: "Your booking request has been received. We'll contact you within 24 hours.", 
    es: "Tu solicitud de reserva ha sido recibida. Nos contactaremos en 24 horas.", 
    pt: "Seu pedido de reserva foi recebido. Entraremos em contato em 24 horas." 
  },
  form_success_back: { en: "Back to Start", es: "Volver al Inicio", pt: "Voltar para o Início" },
  form_label_phone: { en: "Phone * (include country code)", es: "Teléfono * (incluir código de país)", pt: "Telefone * (incluir código do país)" },
  form_label_contact: { en: "Preferred Contact Method", es: "Método de contacto preferido", pt: "Método de contato preferido" },
  form_contact_select: { en: "Select method", es: "Seleccionar método", pt: "Selecionar método" },
  form_label_size: { en: "Approximate Size", es: "Tamaño aproximado", pt: "Tamanho aproximado" },
  form_size_select: { en: "Select size", es: "Seleccionar tamaño", pt: "Selecionar tamanho" },
  form_label_budget: { en: "Budget Range (Optional)", es: "Rango de presupuesto (Opcional)", pt: "Faixa de orçamento (Opcional)" },
  form_budget_select: { en: "Select budget", es: "Seleccionar presupuesto", pt: "Selecionar orçamento" },
  form_label_artist: { en: "Artist preference?", es: "¿Preferencia de artista?", pt: "Preferência de artista?" },
  form_artist_select: { en: "Select an artist", es: "Seleccionar un artista", pt: "Selecionar um artista" },
  form_artist_none: { en: "No Preference", es: "Sin preferencia", pt: "Sem preferência" },

  // Booking Choice
  booking_choice_title: { en: "Transform Your Vision Into Living Art", es: "Transforma Tu Visión en Arte Vivo", pt: "Transforme Sua Visão em Arte Vivo" },
  booking_choice_subtitle: { en: "Choose your path to exceptional tattoo art", es: "Elegí tu camino hacia el arte de tatuaje excepcional", pt: "Escolha seu caminho para a arte de tatuagem excepcional" },

  booking_quick_title: { en: "Quick Consultation", es: "Consulta Rápida", pt: "Consulta Rápida" },
  booking_quick_desc: { en: "Not sure about your design? Book a quick consultation first. We'll help you plan the perfect tattoo.", es: "¿No estás segura de tu diseño? Reservá una consulta rápida primero. Te ayudaremos a planificar el tatuaje perfecto.", pt: "Não tem certeza sobre seu design? Reserve uma consulta rápida primeiro. Vamos ajudá-la a planejar a tatuagem perfeita." },
  booking_quick_feat1: { en: "Free 15-minute consultation", es: "Consulta gratuita de 15 minutos", pt: "Consulta gratuita de 15 minutos" },
  booking_quick_feat2: { en: "Design guidance", es: "Guía de diseño personalizada", pt: "Orientação de design personalizada" },
  booking_quick_feat3: { en: "Price estimates", es: "Estimaciones de precios", pt: "Estimativas de preços" },
  booking_quick_btn: { en: "Book Consultation", es: "Reservar Consulta", pt: "Reservar Consulta" },

  booking_full_title: { en: "Ready to Book", es: "Listo para Reservar", pt: "Pronto para Reservar" },
  booking_full_desc: { en: "Already have your design ready? Start the booking process with Coni.", es: "¿Ya tenés tu diseño listo? Comenzá el proceso de reserva con Coni.", pt: "Já tem seu design pronto? Comece o processo de reserva com Coni." },
  booking_full_feat1: { en: "Personalized booking process", es: "Proceso de reserva personalizado", pt: "Processo de reserva personalizado" },
  booking_full_feat2: { en: "Upload reference images", es: "Subí imágenes de referencia", pt: "Envie imagens de referência" },
  booking_full_feat3: { en: "Flexible schedules", es: "Horarios flexibles", pt: "Horários flexíveis" },
  booking_full_btn: { en: "Start Booking Process", es: "Comenzar Proceso de Reserva", pt: "Iniciar Processo de Reserva" },
  booking_recommended: { en: "RECOMMENDED", es: "RECOMENDADO", pt: "RECOMENDADO" },

  // Steps Titles
  step_title_name: { en: "What's your name?", es: "¿Cómo te llamas?", pt: "Qual o seu nome?" },
  step_title_contact: { en: "How can we contact you?", es: "¿Cómo podemos contactarte?", pt: "Como podemos entrar em contato?" },
  step_title_vision: { en: "Describe your vision", es: "Describí tu visión", pt: "Descreva sua visão" },
  step_title_vision_quick: { en: "Tell us about your tattoo idea", es: "Contanos tu idea de tatuaje", pt: "Conte-nos sobre sua ideia de tatuagem" },
  step_title_upload: { en: "Reference images?", es: "¿Tenés fotos de referencia?", pt: "Imagens de referência?" },
  step_title_details: { en: "Tell us more details", es: "Contanos más detalles", pt: "Conte-nos mais detalhes" },
  step_title_artist: { en: "Artist preference?", es: "¿Tenés preferencia de artista?", pt: "Preferência de artista?" },
  step_title_date: { en: "When are you thinking about it?", es: "¿Para cuándo lo estás pensando?", pt: "Quando você está pensando em fazer?" },
  step_title_date_full: { en: "Preferred date range?", es: "¿Rango de fechas preferido?", pt: "Faixa de data preferida?" }
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language
    if (savedLang && ["en", "es", "pt"].includes(savedLang)) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key: string): string => {
    if (!translations[key]) return key
    return (translations[key][language] || translations[key]["en"]) as string
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
