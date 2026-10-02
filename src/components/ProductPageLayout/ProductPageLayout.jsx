import { CheckCircle2, ArrowRight } from "lucide-react";
import Button from "../Button/Button.jsx";
import CTASection from "../CTASection/CTASection.jsx";
import SectionHeading from "../SectionHeading/SectionHeading.jsx";
import RetirementSimulator from "../RetirementSimulator/RetirementSimulator.jsx";
import { whatsappUrl, getProductBySlug } from "../../config/siteConfig.js";
import "./ProductPageLayout.css";

// Estructura visual compartida por todas las páginas de producto. Cada
// página (/gmm, /auto, /ppr, /hogar) le pasa su propio objeto `product`
// desde siteConfig.js, así el sistema visual es consistente sin duplicar
// marcado entre páginas.
function ProductPageLayout({ product }) {
  const Icon = product.icon;
  const related = product.relatedSlug ? getProductBySlug(product.relatedSlug) : null;

  return (
    <article className="product-page">
      {/* Hero específico del producto -------------------------------- */}
      <section className="product-hero">
        <div className="container product-hero__grid">
          <div className="product-hero__content">
            {/* El nombre del producto (eyebrow) forma parte del H1 para que
                el encabezado principal lo incluya; visualmente se ve igual
                que un eyebrow seguido del titular. El espacio entre ambos no
                se ve (es un contenedor flex) pero separa las palabras en el
                texto del H1. */}
            <h1 className="product-hero__heading">
              <span className="eyebrow">{product.hero.eyebrow}</span>{" "}
              <span className="product-hero__headline">{product.hero.headline}</span>
            </h1>
            <p className="product-hero__subtext">{product.hero.subtext}</p>
            <div className="product-hero__actions">
              <Button href={whatsappUrl} variant="primary">
                Contactar por WhatsApp
              </Button>
              <Button to="/contacto" variant="outline-dark">
                Ver otras formas de contacto
              </Button>
            </div>
          </div>
          <div className="product-hero__media">
            {product.heroImage && (
              <img
                src={product.heroImage.src}
                srcSet={product.heroImage.srcSet}
                sizes={product.heroImage.sizes}
                alt={product.heroImage.alt}
                className={`product-hero__image product-hero__image--${product.slug}`}
                loading="eager"
                fetchPriority="high"
              />
            )}
          </div>
        </div>
      </section>

      {/* Descripción breve --------------------------------------------- */}
      <section className="section section--tight">
        <div className="container product-page__description">
          <span className="product-page__icon-badge">
            <Icon size={22} strokeWidth={1.6} aria-hidden="true" />
          </span>
          <p>{product.description}</p>
        </div>
      </section>

      {/* Simulador ilustrativo de retiro (opcional, hoy solo PPR). Va justo
          después de la introducción para darle protagonismo. --------------- */}
      {product.retirementSimulator && <RetirementSimulator />}

      {/* Beneficios: si arriba está el simulador (fondo alterno), van sobre el
          fondo base para no encimar dos bandas del mismo color. ------------ */}
      <section className={product.retirementSimulator ? "section" : "section section--alt"}>
        <div className="container">
          <SectionHeading eyebrow="Beneficios" title="Lo que puedes esperar" />
          <div className="product-page__benefits">
            {product.benefits.map((benefit) => {
              const BenefitIcon = benefit.icon;
              return (
                <div className="benefit-card" key={benefit.title}>
                  <span className="benefit-card__icon">
                    <BenefitIcon size={22} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="benefit-card__title">{benefit.title}</h3>
                  <p className="benefit-card__description">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bloque de concientización (opcional) ------------------------------- */}
      {product.highlight && (
        <section className="section section--tight">
          <div className="container">
            <div className="product-highlight">
              <span className="eyebrow product-highlight__eyebrow">
                {product.highlight.eyebrow}
              </span>
              <h2 className="product-highlight__title">{product.highlight.title}</h2>
              <p className="product-highlight__text">{product.highlight.text}</p>
            </div>
          </div>
        </section>
      )}

      {/* Para quién es ------------------------------------------------------ */}
      <section className="section">
        <div className="container product-page__ideal">
          <SectionHeading
            eyebrow="¿Es para ti?"
            title="Esto podría interesarte si..."
          />
          <ul className="ideal-list">
            {product.idealFor.map((item) => (
              <li key={item} className="ideal-list__item">
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Producto relacionado (p. ej. Auto → Auto Turista) ------------------ */}
      {related && (
        <section className="section section--tight section--alt">
          <div className="container">
            <div className="related-product">
              {related.cardImage && (
                <img
                  src={related.cardImage.src}
                  alt={related.cardImage.alt}
                  className={`related-product__image related-product__image--${related.slug}`}
                  loading="lazy"
                />
              )}
              <div className="related-product__content">
                <span className="eyebrow">También disponible</span>
                <h2 className="related-product__title">
                  Marina también ofrece {related.name}
                </h2>
                <p className="related-product__text">{related.shortDescription}</p>
                <Button to={related.path} variant="outline-dark" icon={ArrowRight}>
                  {related.cta || "Conocer más"}
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA fuerte ----------------------------------------------------------- */}
      <CTASection
        eyebrow={product.name}
        title={product.ctaTitle || `Hablemos sobre tu ${product.name.toLowerCase()}.`}
        description={
          product.ctaDescription ||
          "Cuéntame tu situación y revisamos juntos las mejores opciones para ti."
        }
      />
    </article>
  );
}

export default ProductPageLayout;
