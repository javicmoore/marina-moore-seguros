import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import "./ProductCard.css";

// Los productos con `featured: true` en siteConfig.js (hoy: Auto Turista) se
// muestran con badge, detalle dorado y, en escritorio, una foto a la izquierda.
function ProductCard({ product }) {
  const Icon = product.icon;
  const featured = Boolean(product.featured);

  return (
    <Link
      to={product.path}
      className={`product-card ${featured ? "product-card--featured" : ""}`}
    >
      {featured && product.cardImage && (
        <div className="product-card__media" aria-hidden="true">
          <img
            src={product.cardImage.src}
            alt=""
            className={`product-card__image product-card__image--${product.slug}`}
            loading="lazy"
          />
        </div>
      )}
      <div className="product-card__body">
        {featured && product.badge && <span className="product-card__badge">{product.badge}</span>}
        <span className="product-card__icon">
          <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
        </span>
        <h3 className="product-card__title">{product.name}</h3>
        <p className="product-card__description">{product.shortDescription}</p>
        <span className="product-card__cta">
          {product.cta || "Conocer más"}
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;
