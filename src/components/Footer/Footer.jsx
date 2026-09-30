import { NavLink } from "react-router-dom";
import { Phone } from "lucide-react";
import { WhatsAppIcon, InstagramIcon } from "../icons/BrandIcons.jsx";
import {
  business,
  contact,
  whatsappUrl,
  phoneUrl,
  products,
} from "../../config/siteConfig.js";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="footer__logo-row">
            {business.logoUrl && (
              <span className="footer__logo-mark">
                <img src={business.logoUrl} alt="" />
              </span>
            )}
            <span className="footer__logo">{business.name}</span>
          </div>
          <p className="footer__tagline">
            Asesoría personalizada en seguros y planeación financiera.
          </p>
          <div className="footer__socials">
            <a
              href={contact.instagramUrl}
              className="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Marina Moore Seguros"
            >
              <InstagramIcon size={19} />
            </a>
            <a
              href={whatsappUrl}
              className="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp"
            >
              <WhatsAppIcon size={19} />
            </a>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Navegación del pie de página">
          <span className="footer__col-title">Navegación</span>
          <ul>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            {products.map((product) => (
              <li key={product.slug}>
                <NavLink to={product.path}>{product.name}</NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/sobre-marina">Sobre Marina</NavLink>
            </li>
            <li>
              <NavLink to="/contacto">Contacto</NavLink>
            </li>
          </ul>
        </nav>

        <div className="footer__contact">
          <span className="footer__col-title">Contacto</span>
          <ul>
            <li>
              <a href={phoneUrl} className="footer__contact-link">
                <Phone size={16} aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl}
                className="footer__contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={contact.instagramUrl}
                className="footer__contact-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={16} />
                {contact.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {business.name}. Todos los derechos reservados.
        </p>
        <NavLink to="/aviso-de-privacidad" className="footer__legal-link">
          Aviso de privacidad
        </NavLink>
      </div>
    </footer>
  );
}

export default Footer;
