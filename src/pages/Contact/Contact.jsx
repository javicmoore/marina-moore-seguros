import { Phone, CalendarCheck } from "lucide-react";
import SectionHeading from "../../components/SectionHeading/SectionHeading.jsx";
import Button from "../../components/Button/Button.jsx";
import { WhatsAppIcon, InstagramIcon } from "../../components/icons/BrandIcons.jsx";
import { contact, whatsappUrl, phoneUrl, bookingHref } from "../../config/siteConfig.js";
import useDocumentMeta from "../../hooks/useDocumentMeta.js";
import "./Contact.css";

const channels = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: contact.whatsappDisplay,
    href: whatsappUrl,
    cta: "Escribir por WhatsApp",
  },
  {
    icon: Phone,
    label: "Teléfono",
    value: contact.phoneDisplay,
    href: phoneUrl,
    cta: "Llamar ahora",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    value: contact.instagramHandle,
    href: contact.instagramUrl,
    cta: "Ver Instagram",
  },
];

function Contact() {
  useDocumentMeta("/contacto");

  return (
    <>
      <section className="section contact-page">
        <div className="container">
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Contacto"
            title="Estoy para ayudarte"
            description="Elige el canal que prefieras."
          />

          <div className="contact-grid">
            {channels.map((channel) => {
              const Icon = channel.icon;
              return (
                <a
                  key={channel.label}
                  href={channel.href}
                  className="contact-card"
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="contact-card__icon">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className="contact-card__label">{channel.label}</span>
                  <span className="contact-card__value">{channel.value}</span>
                  <span className="contact-card__cta">{channel.cta}</span>
                </a>
              );
            })}
          </div>

          <div className="contact-page__booking">
            <Button href={bookingHref} variant="primary" icon={CalendarCheck} iconPosition="left">
              Agendar una asesoría
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
