import { useEffect } from "react";
import { pages, notFoundPage, buildHeadTags } from "../config/seo.js";

const selectorFor = (attrs) =>
  attrs.rel
    ? `link[rel="${attrs.rel}"]`
    : attrs.name
      ? `meta[name="${attrs.name}"]`
      : `meta[property="${attrs.property}"]`;

// Todas las etiquetas que alguna página puede generar. Las que la página
// actual no usa se eliminan, para que no quede, por ejemplo, la descripción
// o el canonical de la ruta anterior.
const MANAGED_SELECTORS = buildHeadTags({ title: "-", description: "-", noindex: true }, "/").map(
  ({ attrs }) => selectorFor(attrs)
);

// Sincroniza el <head> con los metadatos de src/config/seo.js al navegar
// dentro de la app. El HTML inicial de cada ruta ya trae estas mismas
// etiquetas (lo genera vite-plugin-seo.js en el build). `path` debe ser una
// clave de `pages`; null o una ruta desconocida usan los metadatos de la 404.
function useDocumentMeta(path) {
  useEffect(() => {
    const knownPath = path in pages ? path : null;
    const page = knownPath ? pages[knownPath] : notFoundPage;

    document.title = page.title;

    const wanted = new Set();
    for (const { tag, attrs } of buildHeadTags(page, knownPath)) {
      const selector = selectorFor(attrs);
      wanted.add(selector);
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement(tag);
        document.head.appendChild(element);
      }
      for (const [name, value] of Object.entries(attrs)) {
        element.setAttribute(name, value);
      }
    }

    for (const selector of MANAGED_SELECTORS) {
      if (!wanted.has(selector)) {
        document.head.querySelector(selector)?.remove();
      }
    }
  }, [path]);
}

export default useDocumentMeta;
