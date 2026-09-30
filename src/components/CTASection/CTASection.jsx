import { Phone, CalendarCheck } from "lucide-react";
import Button from "../Button/Button.jsx";
import WhatsAppButton from "../WhatsAppButton/WhatsAppButton.jsx";
import { phoneUrl, contact, bookingHref } from "../../config/siteConfig.js";
import "./CTASection.css";

// Sección de conversión reutilizable. Se usa en Home y en cada página de
// producto, con título y eyebrow personalizables.
function CTASection({
  eyebrow = "Hablemos",
  title = "Hablemos de lo que quieres proteger.",
  description = "Escríbeme por WhatsApp, llama directamente o agenda una asesoría a tu conveniencia.",
}) {
  return (
    <section className="cta-section section">
      <div className="container cta-section__inner">
        {eyebrow && <span className="eyebrow cta-section__eyebrow">{eyebrow}</span>}
        <h2 className="cta-section__title">{title}</h2>
        {description && <p className="cta-section__description">{description}</p>}
        <div className="cta-section__actions">
          <WhatsAppButton>Contactar por WhatsApp</WhatsAppButton>
          <Button href={phoneUrl} variant="outline" icon={Phone} iconPosition="left">
            Llamar {contact.phoneDisplay}
          </Button>
          <Button href={bookingHref} variant="outline" icon={CalendarCheck} iconPosition="left">
            Agendar asesoría
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
