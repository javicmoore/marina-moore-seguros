import { getProductBySlug } from "../../config/siteConfig.js";
import ProductPageLayout from "../../components/ProductPageLayout/ProductPageLayout.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import useDocumentMeta from "../../hooks/useDocumentMeta.js";

// Página genérica de producto: recibe el slug de la ruta y obtiene sus datos
// desde siteConfig.js. Evita duplicar el layout entre /gmm, /auto, /ppr y
// /hogar mientras cada ruta sigue siendo explícita en App.jsx.
function ProductPage({ slug }) {
  const product = getProductBySlug(slug);

  useDocumentMeta(product ? product.path : null);

  if (!product) {
    return <NotFound />;
  }

  return <ProductPageLayout product={product} />;
}

export default ProductPage;
