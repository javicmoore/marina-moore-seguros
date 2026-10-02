// =============================================================================
// vite-plugin-seo.js
// -----------------------------------------------------------------------------
// Prerender del <head> por ruta. El sitio es una SPA, así que sin esto todas
// las URLs servirían el mismo index.html y los crawlers que no ejecutan JS
// (Meta, WhatsApp, LinkedIn, X…) verían los metadatos de Inicio en todas.
//
// - En dev y build: sustituye <!-- seo-head --> de index.html por el <head>
//   de Inicio (title, description, canonical, Open Graph, X y JSON-LD).
// - Solo en build: a partir del index.html final escribe un HTML por ruta
//   (dist/gmm.html, dist/contacto.html…), dist/404.html con noindex y
//   dist/sitemap.xml. El body sigue siendo el mismo shell de React.
// - Solo en build: el preload de la foto del carrusel (bloque
//   <!-- preload:start/end --> de index.html) se queda solo en Inicio; las
//   páginas de producto precargan su propia foto del hero y el resto, nada.
//
// En Vercel, vercel.json (cleanUrls) sirve /gmm desde gmm.html y 404.html
// responde con status 404 a cualquier ruta inexistente.
// Todos los datos salen de src/config/seo.js.
// =============================================================================

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pages, notFoundPage, jsonLd, buildHeadTags, canonicalUrl } from "./src/config/seo.js";
import { products } from "./src/config/siteConfig.js";

const MARKER = "<!-- seo-head -->";
const BLOCK_START = "<!-- seo:start -->";
const BLOCK_END = "<!-- seo:end -->";
const PRELOAD_START = "<!-- preload:start -->";
const PRELOAD_END = "<!-- preload:end -->";
const INDENT = "\n    ";

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function renderHead(page, path, { withJsonLd = false } = {}) {
  const lines = [`<title>${escapeHtml(page.title)}</title>`];
  for (const { tag, attrs } of buildHeadTags(page, path)) {
    const attributes = Object.entries(attrs)
      .map(([name, value]) => `${name}="${escapeHtml(value)}"`)
      .join(" ");
    lines.push(`<${tag} ${attributes} />`);
  }
  if (withJsonLd) {
    // "<" escapado para que ningún texto pueda cerrar el <script>.
    const json = JSON.stringify(jsonLd).replace(/</g, "\\u003c");
    lines.push(`<script type="application/ld+json">${json}</script>`);
  }
  return [BLOCK_START, ...lines, BLOCK_END].join(INDENT);
}

function replaceBlock(html, head) {
  const start = html.indexOf(BLOCK_START);
  const end = html.indexOf(BLOCK_END);
  if (start === -1 || end === -1) {
    throw new Error("vite-plugin-seo: no se encontró el bloque SEO en index.html");
  }
  return html.slice(0, start) + head + html.slice(end + BLOCK_END.length);
}

// Preload de la foto del hero de producto (LCP de esas páginas), con los
// mismos srcset/sizes que el <img> de ProductPageLayout para que el navegador
// reutilice la descarga. Cadena vacía si la ruta no es un producto.
function renderPreload(path) {
  const image = products.find((product) => product.path === path)?.heroImage;
  if (!image?.srcSet) return "";
  return [
    "<link",
    '  rel="preload"',
    '  as="image"',
    '  type="image/webp"',
    '  fetchpriority="high"',
    `  imagesrcset="${escapeHtml(image.srcSet)}"`,
    `  imagesizes="${escapeHtml(image.sizes)}"`,
    "/>",
  ].join(INDENT);
}

// Sustituye el bloque de preload de index.html (incluidos sus marcadores) por
// `preload`; si queda vacío se elimina la línea completa.
function replacePreload(html, preload) {
  const start = html.indexOf(PRELOAD_START);
  const end = html.indexOf(PRELOAD_END);
  if (start === -1 || end === -1) {
    throw new Error("vite-plugin-seo: no se encontró el bloque de preload en index.html");
  }
  const lineStart = html.lastIndexOf("\n", start);
  const after = end + PRELOAD_END.length;
  return preload
    ? html.slice(0, start) + preload + html.slice(after)
    : html.slice(0, lineStart) + html.slice(after);
}

function renderSitemap() {
  const urls = Object.keys(pages)
    .map((path) => `  <url>\n    <loc>${canonicalUrl(path)}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default function seo() {
  let outDir;

  return {
    name: "marina-moore-seo",

    configResolved(config) {
      outDir = join(config.root, config.build.outDir);
    },

    transformIndexHtml(html) {
      if (!html.includes(MARKER)) {
        throw new Error(`vite-plugin-seo: falta ${MARKER} en index.html`);
      }
      return html.replace(MARKER, renderHead(pages["/"], "/", { withJsonLd: true }));
    },

    async writeBundle() {
      const template = await readFile(join(outDir, "index.html"), "utf8");

      const files = Object.keys(pages)
        .filter((path) => path !== "/")
        .map((path) => [
          `${path.slice(1)}.html`,
          replacePreload(replaceBlock(template, renderHead(pages[path], path)), renderPreload(path)),
        ]);
      files.push(["404.html", replacePreload(replaceBlock(template, renderHead(notFoundPage, null)), "")]);
      files.push(["sitemap.xml", renderSitemap()]);

      for (const [file, content] of files) {
        const target = join(outDir, file);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, content);
      }
    },
  };
}
