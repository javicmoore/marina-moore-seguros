import SectionHeading from "../../components/SectionHeading/SectionHeading.jsx";
import CTASection from "../../components/CTASection/CTASection.jsx";
import { about, marinaPhotos } from "../../config/siteConfig.js";
import useDocumentMeta from "../../hooks/useDocumentMeta.js";
import "./About.css";

function About() {
  useDocumentMeta("/sobre-marina");

  return (
    <>
      <section className="section about-page">
        <div className="container about-page__grid">
          <div className="about-page__media">
            <img
              src={marinaPhotos.about.src}
              srcSet={marinaPhotos.about.srcSet}
              sizes={marinaPhotos.about.sizes}
              alt={marinaPhotos.about.alt}
              width="840"
              height="1050"
              className="about-page__image"
              fetchPriority="high"
            />
          </div>
          <div className="about-page__content">
            <span className="eyebrow">Sobre Marina</span>
            <h1 className="about-page__title">{about.heading}</h1>
            <p className="about-page__paragraph">{about.paragraph}</p>
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHeading
            align="center"
            eyebrow="Filosofía de trabajo"
            title="Asesoría honesta, sin letra pequeña"
            className="about-philosophy-heading"
          />
        </div>
      </section>

      <CTASection
        eyebrow="Conversemos"
        title="¿Quieres platicar sobre tu situación particular?"
      />
    </>
  );
}

export default About;
