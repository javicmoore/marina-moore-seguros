// =============================================================================
// siteConfig.js
// -----------------------------------------------------------------------------
// Fuente única de información del sitio. Cuando el cliente entregue datos
// reales (teléfono, WhatsApp, Instagram, fotografías, textos finales, etc.)
// este es el ÚNICO archivo que debe modificarse para actualizarlos en todo
// el sitio.
// =============================================================================

import {
  HeartPulse,
  Car,
  TrendingUp,
  Home as HomeIcon,
  ShieldCheck,
  Stethoscope,
  Wallet,
  Clock,
  Users,
  FileCheck,
  Building2,
  Umbrella,
  PiggyBank,
  Flame,
  KeyRound,
  Route,
  Compass,
  MessageCircle,
} from "lucide-react";

// -----------------------------------------------------------------------------
// Identidad del negocio
// -----------------------------------------------------------------------------
export const business = {
  name: "Marina Moore Seguros",
  shortName: "Marina Moore",
  monogram: "MM",
  // Ícono del logo (emblema "D/M" solo, sin texto) usado junto al nombre
  // tipografiado tanto en el header como en el footer. Es un PNG con
  // transparencia real, así que flota directo sobre el fondo oscuro sin caja
  // ni recorte. Cambiar solo esta ruta actualiza el logo en todo el sitio.
  //
  // También existe /images/logo-mark-with-text.png (mismo emblema + "Marina
  // Moore" ya integrado como texto en la imagen). No se usa en el header ni
  // el footer para evitar duplicar el nombre y mezclar tipografías — el sitio
  // ya tipografía "Marina Moore Seguros" con la fuente de marca (Fraunces) en
  // ambos lugares — pero queda disponible por si se necesita un lockup con
  // texto en otro contexto (p. ej. redes sociales).
  logoUrl: "/images/logo-mark.png",
};

// -----------------------------------------------------------------------------
// Datos de contacto — fuente única. El correo electrónico se eliminó
// intencionalmente como canal de contacto visible del sitio; no debe
// reintroducirse en componentes individuales.
// -----------------------------------------------------------------------------
export const contact = {
  // Formato E.164 sin espacios para el enlace wa.me.
  whatsappNumber: "526861349828",
  whatsappDisplay: "+52 686 134 9828",
  whatsappMessage:
    "Hola Marina, me gustaría recibir asesoría sobre seguros. ¿Podrías ayudarme?",

  phoneNumber: "+526861349828", // usado en el enlace tel:
  phoneDisplay: "+52 686 134 9828",

  instagramHandle: "@marinamoore_74",
  instagramUrl: "https://www.instagram.com/marinamoore_74",

  // Enlace de agendamiento (Calendly u otra herramienta). Mientras no exista,
  // los botones "Agenda una asesoría" enlazan a WhatsApp.
  bookingUrl: null,
};

export const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  contact.whatsappMessage
)}`;

export const phoneUrl = `tel:${contact.phoneNumber}`;

export const bookingHref = contact.bookingUrl || whatsappUrl;

// -----------------------------------------------------------------------------
// Navegación principal
// -----------------------------------------------------------------------------
export const navLinks = [
  { label: "Inicio", to: "/" },
  { label: "GMM", to: "/gmm" },
  // Auto Turista no ocupa un lugar propio en la barra de escritorio (para
  // mantenerla limpia): "Auto" se marca activo también en /auto-turista y el
  // menú móvil lo muestra como subenlace de Auto.
  {
    label: "Auto",
    to: "/auto",
    activePaths: ["/auto-turista"],
    children: [{ label: "Auto Turista", to: "/auto-turista" }],
  },
  { label: "Hogar", to: "/hogar" },
  { label: "PPR", to: "/ppr" },
  { label: "Sobre Marina", to: "/sobre-marina" },
  { label: "Contacto", to: "/contacto" },
];

// -----------------------------------------------------------------------------
// Productos / soluciones
// -----------------------------------------------------------------------------
// Contenido de encabezados, beneficios y "para quién es" son textos
// provisionales (copy de relleno profesional) pensados para comunicar la
// estructura de cada página. Deben revisarse y ajustarse con el cliente antes
// de publicar — no incluyen coberturas, montos ni aseguradoras específicas
// porque esa información todavía no ha sido proporcionada.
// -----------------------------------------------------------------------------
export const products = [
  {
    slug: "gmm",
    path: "/gmm",
    icon: HeartPulse,
    name: "Gastos Médicos Mayores",
    shortDescription: "Protección ante gastos médicos y hospitalarios.",
    hero: {
      eyebrow: "Gastos Médicos Mayores",
      headline: "Cuando la salud falla, tu mente debe estar en sanar.",
      subtext:
        "Protege tus finanzas con un seguro de Gastos Médicos Mayores y enfócate en tu recuperación, no en la cuenta del hospital.",
    },
    heroImage: {
      src: "/images/sections/gmm-vertical.jpg",
      alt: "Profesional de la salud sosteniendo un estetoscopio.",
    },
    description:
      "La tranquilidad de saber que tu salud es la prioridad, sin que el dinero sea un obstáculo.",
    // Título del bloque CTA final (opcional; sin él se usa "Hablemos sobre
    // tu <nombre>." — aquí el nombre es plural).
    ctaTitle: "Hablemos sobre tus gastos médicos mayores.",
    benefits: [
      {
        icon: Stethoscope,
        title: "Atención médica",
        description: "Acceso a atención hospitalaria acorde a tus necesidades.",
      },
      {
        icon: ShieldCheck,
        title: "Respaldo económico",
        description: "Protección ante gastos médicos imprevistos y de mayor magnitud.",
      },
      {
        icon: Users,
        title: "Protección familiar",
        description: "Opciones de cobertura individual o para toda la familia.",
      },
    ],
    idealFor: [
      "Quieres proteger tu patrimonio ante un imprevisto de salud.",
      "Buscas mayor libertad para elegir dónde atenderte.",
      "Estás formando o ya tienes una familia que depende de ti.",
    ],
  },
  {
    slug: "auto",
    path: "/auto",
    icon: Car,
    name: "Seguro de Auto",
    shortDescription: "Protección para ti, tu vehículo y terceros.",
    hero: {
      eyebrow: "Seguro de Auto",
      headline: "Maneja con la tranquilidad de estar protegido.",
      subtext:
        "Cobertura pensada para acompañarte en el día a día, protegiendo tu vehículo, tu bolsillo y a quienes te rodean.",
    },
    heroImage: {
      src: "/images/sections/auto-vertical.jpg",
      alt: "Detalle del lateral de un automóvil con luz suave de atardecer.",
    },
    description:
      "Analizamos tu forma de manejar y tus prioridades para encontrar una cobertura que te dé tranquilidad real, no solo un papel.",
    benefits: [
      {
        icon: ShieldCheck,
        title: "Daños materiales",
        description: "Protección para tu vehículo ante accidentes o imprevistos.",
      },
      {
        icon: Umbrella,
        title: "Responsabilidad civil",
        description: "Respaldo frente a daños ocasionados a terceros.",
      },
      {
        icon: Clock,
        title: "Asistencia vial",
        description: "Apoyo disponible cuando ocurre un contratiempo en el camino.",
      },
    ],
    idealFor: [
      "Usas tu auto de forma frecuente y quieres viajar tranquilo.",
      "Buscas proteger tu inversión ante robo o accidente.",
      "Quieres respaldo legal y de asistencia en el camino.",
    ],
    // Sección breve "También disponible" al final de /auto. Nombre, texto,
    // ruta, imagen y CTA se toman de la entrada del producto relacionado.
    relatedSlug: "auto-turista",
  },
  // ---------------------------------------------------------------------------
  // Seguro de Auto Turista — producto destacado.
  // Todo el contenido de esta entrada es PROVISIONAL y genérico: describe la
  // asesoría de Marina, no la póliza. No incluye coberturas, países,
  // condiciones, precios ni aseguradoras porque esa información todavía no se
  // ha proporcionado. Sustituir con los datos reales antes de publicar.
  //
  // Campos exclusivos de este producto:
  //   featured  → la tarjeta de Home se muestra destacada (badge + detalle
  //               dorado + imagen en escritorio).
  //   badge     → texto de la etiqueta de la tarjeta destacada.
  //   cta       → texto del enlace de la tarjeta (las demás usan "Conocer más").
  //   cardImage → foto que acompaña a la tarjeta destacada en escritorio.
  // ---------------------------------------------------------------------------
  {
    slug: "auto-turista",
    path: "/auto-turista",
    icon: Route,
    name: "Seguro de Auto Turista",
    shortDescription:
      "Protección para acompañarte también cuando tu viaje cruza fronteras.",
    featured: true,
    badge: "Conoce esta opción",
    cta: "Conocer Auto Turista",
    hero: {
      eyebrow: "Seguro de Auto Turista",
      headline: "Viaja por carretera con mayor tranquilidad.",
      subtext:
        "Protección para acompañarte también cuando tu viaje cruza fronteras. Te asesoro para que salgas a carretera sabiendo qué opción se ajusta a tu viaje.",
    },
    heroImage: {
      src: "/images/sections/auto-turista-vertical.jpg",
      alt: "Automóvil detenido en una carretera costera al atardecer.",
    },
    cardImage: {
      src: "/images/hero/hero-auto-turista-960.jpg",
      alt: "",
    },
    description:
      "Además del seguro de auto para el día a día, Marina también ofrece Seguro de Auto Turista. Cuéntame de tu viaje y revisamos juntos la opción adecuada.",
    benefits: [
      {
        icon: Compass,
        title: "Asesoría antes de tu viaje",
        description: "Revisamos juntos tu viaje para elegir la opción adecuada.",
      },
      {
        icon: MessageCircle,
        title: "Atención cercana",
        description: "Resuelve tus dudas directamente con Marina por WhatsApp o llamada.",
      },
      {
        icon: ShieldCheck,
        title: "Viaja con tranquilidad",
        description: "Sal a carretera sabiendo que cuentas con respaldo.",
      },
    ],
    idealFor: [
      "Planeas un viaje en auto que cruza fronteras.",
      "Quieres resolver tu protección antes de salir a carretera.",
      "Prefieres una asesoría personalizada para elegir tu seguro.",
    ],
  },
  {
    slug: "ppr",
    path: "/ppr",
    icon: TrendingUp,
    name: "Plan Personal de Retiro",
    shortDescription: "Construye una estrategia para tu futuro.",
    hero: {
      eyebrow: "Plan Personal de Retiro",
      headline: "¿Estás preparado para las vacaciones más largas de tu vida?",
      subtext:
        "Asegura hoy el retiro que te mereces y empieza a construir una etapa con mayor libertad y tranquilidad.",
    },
    heroImage: {
      src: "/images/sections/ppr-vertical.jpg",
      alt: "Persona observando el horizonte al atardecer, mirando hacia el futuro.",
    },
    description:
      "El retiro no es el fin del trabajo, es el inicio de las vacaciones más largas de tu vida.",
    // Bloque de concientización destacado (entre Beneficios y "¿Es para
    // ti?"). Opcional: cualquier producto puede definir `highlight`.
    highlight: {
      eyebrow: "Tranquilidad familiar",
      title: "Garantiza la tranquilidad de tu hogar",
      text: "Planear tu retiro no es solo pensar en ti, es quitarle una futura carga económica a tus hijos. Transforma tu jubilación en una etapa de disfrute total y estabilidad financiera.",
    },
    // Texto del bloque CTA final (opcional; sin él se usa el texto genérico).
    ctaDescription:
      "Construye hoy el presupuesto para las vacaciones más largas de tu vida. Protege el futuro de tu familia y disfruta del retiro sin preocupaciones.",
    benefits: [
      {
        icon: PiggyBank,
        title: "Ahorro con propósito",
        description: "Una estrategia constante orientada a tus metas de largo plazo.",
      },
      {
        icon: Wallet,
        title: "Planeación financiera",
        description: "Visión clara de cómo construir el patrimonio para tu retiro.",
      },
      {
        icon: FileCheck,
        title: "Beneficios fiscales",
        description: "Estructuras que pueden ofrecer ventajas fiscales, sujetas a evaluación.",
      },
    ],
    idealFor: [
      "Quieres empezar a construir tu retiro de forma ordenada.",
      "Buscas complementar tu ahorro actual con una estrategia formal.",
      "Piensas en tu futuro financiero a mediano y largo plazo.",
    ],
  },
  {
    slug: "hogar",
    path: "/hogar",
    icon: HomeIcon,
    name: "Seguro de Hogar",
    shortDescription: "Protege tu hogar y tu patrimonio.",
    hero: {
      eyebrow: "Seguro de Hogar",
      headline: "El respaldo que tu hogar merece.",
      subtext:
        "Protección pensada para cuidar el patrimonio que has construido, ante los imprevistos que pueden afectar tu hogar.",
    },
    heroImage: {
      src: "/images/sections/hogar-vertical.jpg",
      alt: "Fachada de una vivienda contemporánea de líneas blancas.",
    },
    description:
      "Revisamos las características de tu vivienda y tu patrimonio para encontrar una protección a la medida de tu hogar.",
    benefits: [
      {
        icon: Building2,
        title: "Protección estructural",
        description: "Respaldo para tu vivienda ante daños imprevistos.",
      },
      {
        icon: Flame,
        title: "Riesgos imprevistos",
        description: "Cobertura ante eventos como incendio u otros siniestros.",
      },
      {
        icon: KeyRound,
        title: "Contenidos del hogar",
        description: "Protección para los bienes que forman parte de tu patrimonio.",
      },
    ],
    idealFor: [
      "Eres propietario y quieres proteger tu patrimonio.",
      "Quieres tranquilidad ante imprevistos en tu vivienda.",
      "Buscas complementar la protección de tu familia.",
    ],
  },
];

export const getProductBySlug = (slug) =>
  products.find((product) => product.slug === slug);

// -----------------------------------------------------------------------------
// Carrusel del Hero (Home)
// -----------------------------------------------------------------------------
// Slides del carrusel visual del hero. Título, ruta e imagen viven todos en este único lugar — para cambiar una
// fotografía basta con actualizar la ruta aquí. El tratamiento visual
// (recorte/enfoque y el filtro de color que unifica las 4 fotos) vive en
// HeroCarousel.css, en las reglas .hero-carousel__slide--<id>.
//
// Las fotos se sirven como WebP en varios anchos (public/images/hero/
// hero-<id>-<ancho>.webp), generados a partir de los JPG originales; el
// navegador elige el tamaño adecuado según el ancho real del carrusel.
// -----------------------------------------------------------------------------
const HERO_IMAGE_WIDTHS = [640, 960, 1280, 1920];

function heroImage(id, ext = "webp") {
  return {
    image: `/images/hero/hero-${id}-1280.${ext}`,
    imageSrcSet: HERO_IMAGE_WIDTHS.map((w) => `/images/hero/hero-${id}-${w}.${ext} ${w}w`).join(", "),
  };
}

export const heroCarouselSlides = [
  { id: "auto", path: "/auto", title: "Seguro de Auto", ...heroImage("auto") },
  // Slide destacada: además del título muestra un texto breve y un CTA
  // (campos opcionales `text` y `cta`; las demás slides solo llevan título).
  // Copy provisional. Fotos en JPG (hero-auto-turista-<ancho>.jpg).
  {
    id: "auto-turista",
    path: "/auto-turista",
    title: "Seguro de Auto Turista",
    text: "Protección para acompañarte también cuando tu viaje cruza fronteras.",
    cta: "Conocer Auto Turista",
    ...heroImage("auto-turista", "jpg"),
  },
  {
    id: "gmm",
    path: "/gmm",
    title: "Gastos Médicos Mayores",
    ...heroImage("gmm"),
  },
  {
    id: "hogar",
    path: "/hogar",
    title: "Seguro de Hogar",
    ...heroImage("hogar"),
  },
  {
    id: "ppr",
    path: "/ppr",
    title: "Plan Personal de Retiro",
    ...heroImage("ppr"),
  },
];

// -----------------------------------------------------------------------------
// Proceso de asesoría (Home)
// -----------------------------------------------------------------------------
export const processSteps = [
  {
    number: "01",
    title: "Cuéntame qué necesitas",
    description: "Una breve conversación para entender tu situación y tus prioridades.",
  },
  {
    number: "02",
    title: "Revisamos tus opciones",
    description: "Analizamos juntos las alternativas que mejor se ajustan a ti.",
  },
  {
    number: "03",
    title: "Elegimos la solución adecuada",
    description: "Avanzamos con la opción que te da mayor tranquilidad.",
  },
];

// -----------------------------------------------------------------------------
// Sobre Marina
// -----------------------------------------------------------------------------
// Fotos de Marina: WebP generados a partir de los PNG originales de
// public/images/marina/ (que se conservan sin modificar), ya recortados a la
// proporción exacta de cada contenedor con el rostro en el tercio superior.
// Se sirven en 3 anchos para cubrir 1x / 1.5x / 2x del contenedor (máx. 420px).
const MARINA_IMAGE_WIDTHS = [420, 630, 840];

function marinaPhoto(id, alt) {
  return {
    src: `/images/marina/marina-${id}-630.webp`,
    srcSet: MARINA_IMAGE_WIDTHS.map((w) => `/images/marina/marina-${id}-${w}.webp ${w}w`).join(", "),
    sizes: "(max-width: 460px) calc(100vw - 2.5rem), 420px",
    alt,
  };
}

export const marinaPhotos = {
  // Teaser de Home — cuadrada (1:1).
  home: marinaPhoto("home", "Marina Moore, asesora en seguros y retiro"),
  // Página Sobre Marina — vertical (4:5).
  about: marinaPhoto("about", "Retrato de Marina Moore, asesora en seguros y retiro"),
};

export const about = {
  heading: "Asesoría cercana, con visión de largo plazo.",
  paragraph:
    "Marina acompaña a personas y familias a proteger lo que han construido y a planear con claridad lo que viene.",
};
