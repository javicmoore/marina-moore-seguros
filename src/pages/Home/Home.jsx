import { ArrowRight } from "lucide-react";
import Button from "../../components/Button/Button.jsx";
import SectionHeading from "../../components/SectionHeading/SectionHeading.jsx";
import ProductCarousel from "../../components/ProductCarousel/ProductCarousel.jsx";
import ProcessSteps from "../../components/ProcessSteps/ProcessSteps.jsx";
import CTASection from "../../components/CTASection/CTASection.jsx";
import HeroCarousel from "../../components/HeroCarousel/HeroCarousel.jsx";
import { bookingHref, about, marinaPhotos } from "../../config/siteConfig.js";
import useDocumentMeta from "../../hooks/useDocumentMeta.js";
import "./Home.css";

function Home() {
  useDocumentMeta("/");

  return (
    <>
      {/* Hero ------------------------------------------------------------ */}
      <section className="hero">
        <div className="hero__container hero__grid">
          <div className="hero__content">
            <span className="eyebrow">Asesoría en seguros y retiro</span>
            <h1 className="hero__headline">
              Protección para lo que hoy importa.
              <br />
              Planeación para lo que viene.
            </h1>
            <p className="hero__subtext">
              Asesoría personalizada para proteger tu patrimonio, tu salud y
              construir con mayor tranquilidad tu futuro.
            </p>
            <div className="hero__actions">
              <Button href={bookingHref} variant="primary">
                Agenda una asesoría
              </Button>
              <Button to="/gmm" variant="outline-dark" icon={ArrowRight}>
                Explorar soluciones
              </Button>
            </div>
          </div>
          <div className="hero__media">
            <HeroCarousel />
          </div>
        </div>
      </section>

      {/* Soluciones -------------------------------------------------------- */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Soluciones"
            title="Una solución para cada etapa de tu vida"
            description="Explora las áreas en las que puedo acompañarte a proteger y planear."
          />
        </div>
        <div className="container">
          <ProductCarousel />
        </div>
      </section>

      {/* Sobre Marina (teaser) --------------------------------------------- */}
      <section className="section section--alt about-teaser">
        <div className="container about-teaser__grid">
          <div className="about-teaser__media">
            <img
              src={marinaPhotos.home.src}
              srcSet={marinaPhotos.home.srcSet}
              sizes={marinaPhotos.home.sizes}
              alt={marinaPhotos.home.alt}
              width="840"
              height="840"
              className="about-teaser__image"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-teaser__content">
            <span className="eyebrow">Sobre Marina</span>
            <h2 className="about-teaser__title">{about.heading}</h2>
            <p className="about-teaser__paragraph">{about.paragraph}</p>
            <Button to="/sobre-marina" variant="outline-dark" icon={ArrowRight}>
              Conocer más
            </Button>
          </div>
        </div>
      </section>

      {/* Proceso ------------------------------------------------------------ */}
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Un proceso simple, pensado para ti"
            align="center"
            className="process-heading"
          />
          <ProcessSteps />
        </div>
      </section>

      {/* CTA final ----------------------------------------------------------- */}
      <CTASection />
    </>
  );
}

export default Home;
