// =============================================================================
// seo.js
// -----------------------------------------------------------------------------
// Metadatos SEO del sitio: title, description, canonical, Open Graph, X y
// JSON-LD. Es la única fuente para dos consumidores:
//   - vite-plugin-seo.js lo usa en el build para escribir un HTML por ruta
//     (así Meta, WhatsApp, LinkedIn, etc. leen el <head> sin ejecutar JS) y
//     para generar sitemap.xml.
//   - useDocumentMeta lo usa en el navegador al navegar entre rutas.
//
// Al agregar una ruta en App.jsx, agregarla también en `pages`.
// =============================================================================

import { business, contact } from "./siteConfig.js";

export const SITE_URL = "https://marinamooreseguros.com";

// Versión optimizada (1200x630, JPEG) de public/marinamoore-og.png.
export const ogImage = {
  url: `${SITE_URL}/marinamoore-og.jpg`,
  type: "image/jpeg",
  width: 1200,
  height: 630,
  alt: "Marina Moore Seguros — Asesoría en Seguros y Retiro",
};

export const pages = {
  "/": {
    title: "Marina Moore Seguros — Asesoría en Seguros y Retiro",
    description:
      "Asesoría personalizada en seguros de Gastos Médicos Mayores, Auto, Auto Turista, Hogar y Plan Personal de Retiro con Marina Moore. Agenda tu asesoría.",
  },
  "/gmm": {
    title: "Seguro de Gastos Médicos Mayores — Marina Moore Seguros",
    description:
      "Seguro de Gastos Médicos Mayores con asesoría de Marina Moore. Protege tus finanzas y enfócate en tu recuperación, no en la cuenta del hospital.",
  },
  "/auto": {
    title: "Seguro de Auto — Marina Moore Seguros",
    description:
      "Seguro de Auto con asesoría personalizada: protección para tu vehículo, tu bolsillo y terceros. Marina Moore te ayuda a elegir la cobertura adecuada.",
  },
  "/auto-turista": {
    title: "Seguro de Auto Turista — Marina Moore Seguros",
    description:
      "Seguro de Auto Turista para viajes por carretera que cruzan fronteras. Marina Moore te asesora para elegir la opción que se ajusta a tu viaje.",
  },
  "/ppr": {
    title: "Plan Personal de Retiro — Marina Moore Seguros",
    description:
      "Plan Personal de Retiro con asesoría de Marina Moore. Empieza hoy a construir un retiro con mayor libertad, tranquilidad y estabilidad financiera.",
  },
  "/hogar": {
    title: "Seguro de Hogar — Marina Moore Seguros",
    description:
      "Seguro de Hogar para proteger tu vivienda y tu patrimonio ante imprevistos, con asesoría personalizada de Marina Moore.",
  },
  "/sobre-marina": {
    title: "Sobre Marina — Marina Moore Seguros",
    description:
      "Conoce a Marina Moore, asesora en seguros y retiro que acompaña a personas y familias a proteger su patrimonio y planear su futuro.",
  },
  "/contacto": {
    title: "Contacto — Marina Moore Seguros",
    description:
      "Contacta a Marina Moore por WhatsApp, teléfono o Instagram y agenda una asesoría personalizada en seguros y planeación para el retiro.",
  },
  "/aviso-de-privacidad": {
    title: "Aviso de privacidad — Marina Moore Seguros",
    description:
      "Aviso de privacidad de Marina Moore Seguros: cómo se tratan y protegen los datos personales y cómo ejercer tus derechos ARCO.",
  },
};

// 404: fuera del sitemap, sin canonical ni Open Graph, y con noindex.
export const notFoundPage = {
  title: "Página no encontrada — Marina Moore Seguros",
  noindex: true,
};

export const canonicalUrl = (path) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`);

// Solo datos reales: sin dirección, horarios, precios, reseñas ni coordenadas.
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "InsuranceAgency",
      "@id": `${SITE_URL}/#organization`,
      name: business.name,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}${business.logoUrl}`,
      image: ogImage.url,
      telephone: contact.phoneNumber,
      sameAs: [contact.instagramUrl],
      employee: {
        "@type": "Person",
        name: "Marina Moore Martinez",
        jobTitle: "Asesora en seguros y retiro",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: business.name,
      inLanguage: "es-MX",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
  ],
};

// Etiquetas del <head> para una página, como datos: el plugin de build las
// serializa a HTML y useDocumentMeta las aplica al DOM, así ambos producen
// exactamente el mismo conjunto. `path` es null en la 404.
export function buildHeadTags({ title, description, noindex = false }, path) {
  const tags = [];
  const meta = (key, value, content) => tags.push({ tag: "meta", attrs: { [key]: value, content } });

  if (description) meta("name", "description", description);
  if (noindex) meta("name", "robots", "noindex");
  if (path) {
    const url = canonicalUrl(path);
    tags.push({ tag: "link", attrs: { rel: "canonical", href: url } });
    meta("property", "og:type", "website");
    meta("property", "og:site_name", business.name);
    meta("property", "og:locale", "es_MX");
    meta("property", "og:title", title);
    if (description) meta("property", "og:description", description);
    meta("property", "og:url", url);
    meta("property", "og:image", ogImage.url);
    meta("property", "og:image:type", ogImage.type);
    meta("property", "og:image:width", String(ogImage.width));
    meta("property", "og:image:height", String(ogImage.height));
    meta("property", "og:image:alt", ogImage.alt);
    // X toma título y descripción de Open Graph; la imagen se declara explícita.
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:image", ogImage.url);
  }
  return tags;
}
