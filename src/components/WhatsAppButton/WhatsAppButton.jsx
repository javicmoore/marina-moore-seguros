import Button from "../Button/Button.jsx";
import { WhatsAppIcon } from "../icons/BrandIcons.jsx";
import { whatsappUrl } from "../../config/siteConfig.js";

// Botón de WhatsApp consistente en todo el sitio. El número/mensaje viven en
// siteConfig.js — este componente no debe recibir datos hardcodeados.
function WhatsAppButton({ children = "Contactar por WhatsApp", className = "" }) {
  return (
    <Button
      href={whatsappUrl}
      variant="whatsapp"
      icon={WhatsAppIcon}
      iconPosition="left"
      className={className}
    >
      {children}
    </Button>
  );
}

export default WhatsAppButton;
