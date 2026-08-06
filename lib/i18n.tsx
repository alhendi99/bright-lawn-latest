'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react'

export type Language = 'en' | 'es'

type WidenStringValues<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
    ? readonly WidenStringValues<U>[]
    : T extends object
      ? { [K in keyof T]: WidenStringValues<T[K]> }
      : T

type Dictionary = WidenStringValues<typeof en>

const en = {
  nav: {
    services: 'Services',
    work: 'Our Work',
    about: 'Why Us',
    reviews: 'Reviews',
    faq: 'FAQ',
    contact: 'Contact',
    quote: 'Get a Free Quote',
    menu: 'Open menu',
    close: 'Close menu',
  },
  hero: {
    badge: 'Locally owned & fully insured',
    title: 'A greener lawn, without the weekend work.',
    subtitle:
      'Bright Lawn keeps your property immaculate year-round — from precision mowing and landscaping to snow removal when winter hits.',
    primary: 'Get a Free Quote',
    secondary: 'View Our Work',
    stat1: 'Homes serviced',
    stat2: 'Years in business',
    stat3: 'Five-star reviews',
  },
  services: {
    kicker: 'What we do',
    title: 'Complete property care, every season',
    subtitle:
      'One trusted crew for every job on your list. Explore our core services below.',
    cta: 'Request this service',
    items: {
      lawn: {
        name: 'Lawn Care',
        desc: 'Weekly mowing, edging, fertilization, and weed control that keeps your turf thick, green, and healthy.',
      },
      snow: {
        name: 'Snow Removal',
        desc: 'Reliable driveway and walkway clearing with salting — dispatched the moment the snow starts to fall.',
      },
      leaf: {
        name: 'Leaf Cleanup',
        desc: 'Thorough fall leaf collection and hauling so your lawn breathes and looks pristine all autumn.',
      },
      yard: {
        name: 'Yard Cleanup',
        desc: 'Seasonal refreshes: debris removal, bed cleanup, pruning, and mulch to reset your outdoor space.',
      },
      landscaping: {
        name: 'Landscaping',
        desc: 'Custom design and installation — plantings, hardscapes, and grading that transform your curb appeal.',
      },
    },
  },
  stats: {
    kicker: 'By the numbers',
    title: 'Trusted work that speaks for itself',
    items: {
      homes: 'Properties maintained',
      satisfaction: 'Client satisfaction',
      years: 'Years serving the area',
      response: 'Hour response time',
    },
  },
  beforeAfter: {
    kicker: 'The Bright Lawn difference',
    title: 'See the transformation',
    subtitle: 'Drag the slider to reveal the results our crews deliver.',
    before: 'Before',
    after: 'After',
    instruction: 'Drag to compare',
  },
  gallery: {
    kicker: 'Our work',
    title: 'Recent projects',
    subtitle: 'A look at lawns and landscapes we care for across the neighborhood.',
    viewLabel: 'View project image',
  },
  testimonials: {
    kicker: 'Reviews',
    title: 'Loved by neighbors like you',
    subtitle: 'Real feedback from real Bright Lawn customers.',
    prev: 'Previous review',
    next: 'Next review',
  },
  faq: {
    kicker: 'Questions',
    title: 'Frequently asked questions',
    subtitle: 'Everything you need to know before booking your first visit.',
    items: [
      {
        q: 'What areas do you service?',
        a: 'We serve homes and businesses throughout the greater metro area. Enter your address in the quote form and we will confirm coverage within one business day.',
      },
      {
        q: 'Do you offer year-round contracts?',
        a: 'Yes. Most clients choose a seasonal plan that bundles mowing, cleanups, and winter snow removal at a discounted rate, but one-time services are always available.',
      },
      {
        q: 'Are you licensed and insured?',
        a: 'Absolutely. Bright Lawn is fully licensed and carries comprehensive liability and workers-compensation insurance for every job we perform.',
      },
      {
        q: 'How quickly can you start?',
        a: 'New lawn-care clients are typically onboarded within 2 to 3 business days. Snow removal is dispatched automatically once accumulation begins.',
      },
      {
        q: 'How do you handle payment?',
        a: 'We offer simple monthly billing with autopay, and accept all major cards. You will receive a clear digital invoice after every visit.',
      },
    ],
  },
  contact: {
    kicker: 'Get started',
    title: 'Request your free quote',
    subtitle:
      'Tell us about your property and the services you need. We will get back to you within one business day.',
    name: 'Full name',
    namePlaceholder: 'Jane Doe',
    email: 'Email address',
    emailPlaceholder: 'jane@email.com',
    phone: 'Phone number',
    phonePlaceholder: '(555) 123-4567',
    service: 'Service needed',
    servicePlaceholder: 'Select a service',
    message: 'Project details',
    messagePlaceholder: 'Tell us about your lawn or project...',
    submit: 'Send my request',
    submitting: 'Sending...',
    success: "Thank you! We've received your request and will be in touch within one business day.",
    another: 'Send another request',
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email address.',
      phone: 'Please enter a valid phone number.',
      service: 'Please select a service.',
      message: 'Please tell us a little about your project.',
    },
    infoTitle: 'Reach us directly',
    hours: 'Mon–Sat, 7am–6pm',
    mapTitle: 'Bright Lawn service area map',
  },
  footer: {
    tagline: 'Premium lawn care and landscaping, all season long.',
    quickLinks: 'Quick links',
    ourServices: 'Services',
    contact: 'Contact',
    rights: 'All rights reserved.',
    built: 'Licensed & insured lawn care professionals.',
  },
  common: {
    languageLabel: 'Language',
  },
} as const

const es: Dictionary = {
  nav: {
    services: 'Servicios',
    work: 'Proyectos',
    about: 'Por Qué Nosotros',
    reviews: 'Reseñas',
    faq: 'Preguntas',
    contact: 'Contacto',
    quote: 'Cotización Gratis',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
  },
  hero: {
    badge: 'Empresa local y totalmente asegurada',
    title: 'Un césped más verde, sin trabajo de fin de semana.',
    subtitle:
      'Bright Lawn mantiene su propiedad impecable todo el año — desde corte de precisión y jardinería hasta remoción de nieve cuando llega el invierno.',
    primary: 'Cotización Gratis',
    secondary: 'Ver Proyectos',
    stat1: 'Hogares atendidos',
    stat2: 'Años de experiencia',
    stat3: 'Reseñas cinco estrellas',
  },
  services: {
    kicker: 'Qué hacemos',
    title: 'Cuidado completo de su propiedad, cada temporada',
    subtitle:
      'Un equipo de confianza para cada tarea de su lista. Explore nuestros servicios principales.',
    cta: 'Solicitar este servicio',
    items: {
      lawn: {
        name: 'Cuidado del Césped',
        desc: 'Corte semanal, bordes, fertilización y control de maleza para un césped denso, verde y saludable.',
      },
      snow: {
        name: 'Remoción de Nieve',
        desc: 'Limpieza confiable de entradas y aceras con sal — enviada apenas comienza a nevar.',
      },
      leaf: {
        name: 'Limpieza de Hojas',
        desc: 'Recolección y retiro completo de hojas en otoño para que su césped respire y luzca impecable.',
      },
      yard: {
        name: 'Limpieza del Jardín',
        desc: 'Renovaciones de temporada: retiro de escombros, limpieza de jardineras, poda y mantillo.',
      },
      landscaping: {
        name: 'Paisajismo',
        desc: 'Diseño e instalación a medida — plantaciones, pavimentos y nivelación que transforman su fachada.',
      },
    },
  },
  stats: {
    kicker: 'En números',
    title: 'Un trabajo de confianza que habla por sí mismo',
    items: {
      homes: 'Propiedades mantenidas',
      satisfaction: 'Satisfacción del cliente',
      years: 'Años sirviendo a la zona',
      response: 'Horas de respuesta',
    },
  },
  beforeAfter: {
    kicker: 'La diferencia Bright Lawn',
    title: 'Vea la transformación',
    subtitle: 'Arrastre el control para revelar los resultados de nuestros equipos.',
    before: 'Antes',
    after: 'Después',
    instruction: 'Arrastre para comparar',
  },
  gallery: {
    kicker: 'Nuestro trabajo',
    title: 'Proyectos recientes',
    subtitle: 'Un vistazo a los céspedes y jardines que cuidamos en el vecindario.',
    viewLabel: 'Ver imagen del proyecto',
  },
  testimonials: {
    kicker: 'Reseñas',
    title: 'Amado por vecinos como usted',
    subtitle: 'Comentarios reales de clientes reales de Bright Lawn.',
    prev: 'Reseña anterior',
    next: 'Siguiente reseña',
  },
  faq: {
    kicker: 'Preguntas',
    title: 'Preguntas frecuentes',
    subtitle: 'Todo lo que necesita saber antes de reservar su primera visita.',
    items: [
      {
        q: '¿Qué áreas atienden?',
        a: 'Atendemos hogares y negocios en toda el área metropolitana. Ingrese su dirección en el formulario y confirmaremos la cobertura en un día hábil.',
      },
      {
        q: '¿Ofrecen contratos durante todo el año?',
        a: 'Sí. La mayoría elige un plan de temporada que combina corte, limpiezas y remoción de nieve a precio con descuento, pero siempre hay servicios individuales disponibles.',
      },
      {
        q: '¿Están licenciados y asegurados?',
        a: 'Por supuesto. Bright Lawn está totalmente licenciada y cuenta con seguro integral de responsabilidad y de compensación laboral para cada trabajo.',
      },
      {
        q: '¿Qué tan rápido pueden empezar?',
        a: 'Los nuevos clientes de cuidado de césped comienzan normalmente en 2 a 3 días hábiles. La remoción de nieve se envía automáticamente al acumularse.',
      },
      {
        q: '¿Cómo manejan el pago?',
        a: 'Ofrecemos facturación mensual sencilla con pago automático y aceptamos todas las tarjetas. Recibirá una factura digital clara después de cada visita.',
      },
    ],
  },
  contact: {
    kicker: 'Comencemos',
    title: 'Solicite su cotización gratis',
    subtitle:
      'Cuéntenos sobre su propiedad y los servicios que necesita. Le responderemos en un día hábil.',
    name: 'Nombre completo',
    namePlaceholder: 'Juana Pérez',
    email: 'Correo electrónico',
    emailPlaceholder: 'juana@correo.com',
    phone: 'Número de teléfono',
    phonePlaceholder: '(555) 123-4567',
    service: 'Servicio necesario',
    servicePlaceholder: 'Seleccione un servicio',
    message: 'Detalles del proyecto',
    messagePlaceholder: 'Cuéntenos sobre su césped o proyecto...',
    submit: 'Enviar solicitud',
    submitting: 'Enviando...',
    success: '¡Gracias! Hemos recibido su solicitud y nos pondremos en contacto en un día hábil.',
    another: 'Enviar otra solicitud',
    errors: {
      name: 'Por favor ingrese su nombre.',
      email: 'Por favor ingrese un correo válido.',
      phone: 'Por favor ingrese un teléfono válido.',
      service: 'Por favor seleccione un servicio.',
      message: 'Cuéntenos un poco sobre su proyecto.',
    },
    infoTitle: 'Contáctenos directamente',
    hours: 'Lun–Sáb, 7am–6pm',
    mapTitle: 'Mapa del área de servicio de Bright Lawn',
  },
  footer: {
    tagline: 'Cuidado premium de césped y jardinería, toda la temporada.',
    quickLinks: 'Enlaces rápidos',
    ourServices: 'Servicios',
    contact: 'Contacto',
    rights: 'Todos los derechos reservados.',
    built: 'Profesionales de cuidado de césped licenciados y asegurados.',
  },
  common: {
    languageLabel: 'Idioma',
  },
}

const dictionaries: Record<Language, Dictionary> = { en, es }

type LanguageContextValue = {
  lang: Language
  setLang: (lang: Language) => void
  toggle: () => void
  t: Dictionary
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>('en')

  const toggle = useCallback(() => {
    setLang((prev) => (prev === 'en' ? 'es' : 'en'))
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: dictionaries[lang] }),
    [lang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
