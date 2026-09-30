import ProductCard from "../ProductCard/ProductCard.jsx";
import { products } from "../../config/siteConfig.js";
import "./ProductCarousel.css";

// En pantallas pequeñas se comporta como carrusel horizontal deslizable
// (scroll-snap); en escritorio se acomoda como una cuadrícula de tarjetas.
function ProductCarousel() {
  return (
    <ul className="product-carousel" role="list">
      {products.map((product) => (
        <li
          key={product.slug}
          className={`product-carousel__item ${product.featured ? "product-carousel__item--featured" : ""}`}
        >
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export default ProductCarousel;
