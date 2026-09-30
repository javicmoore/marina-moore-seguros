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
//
// En Vercel, vercel.json (cleanUrls) sirve /gmm desde gmm.html y 404.html
// responde con status 404 a cualquier ruta inexistente.
// Todos los datos salen de src/config/seo.js.
// =============================================================================

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { pages, notFoundPage, jsonLd, buildHeadTags, canonicalUrl } from "./src/config/seo.js";

const MARKER = "<!-- seo-head -->";
const BLOCK_START = "<!-- seo:start -->";
const BLOCK_END = "<!-- seo:end -->";
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
        .map((path) => [`${path.slice(1)}.html`, replaceBlock(template, renderHead(pages[path], path))]);
      files.push(["404.html", replaceBlock(template, renderHead(notFoundPage, null))]);
      files.push(["sitemap.xml", renderSitemap()]);

      for (const [file, content] of files) {
        const target = join(outDir, file);
        await mkdir(dirname(target), { recursive: true });
        await writeFile(target, content);
      }
    },
  };
}
