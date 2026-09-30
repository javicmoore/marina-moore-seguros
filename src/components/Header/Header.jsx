import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Button from "../Button/Button.jsx";
import { business, navLinks, bookingHref } from "../../config/siteConfig.js";
import "./Header.css";

function Header() {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 12);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setMobileOpen(false);
    }
  }

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`} onKeyDown={handleKeyDown}>
      <div className="container header__bar">
        <NavLink to="/" className="header__logo" aria-label={`${business.name} — Inicio`}>
          <span
            className={`header__logo-mark ${
              business.logoUrl ? "header__logo-mark--image" : "header__logo-mark--text"
            }`}
          >
            {business.logoUrl ? <img src={business.logoUrl} alt="" /> : business.monogram}
          </span>
          <span className="header__logo-text">{business.name}</span>
        </NavLink>

        <nav className="header__nav" aria-label="Navegación principal">
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `header__link ${
                      isActive || link.activePaths?.includes(location.pathname) ? "is-active" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Button href={bookingHref} variant="primary" className="header__cta">
            Agenda una asesoría
          </Button>
          <button
            type="button"
            className="header__menu-toggle"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`header__mobile ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Navegación móvil">
          <ul className="header__mobile-list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className="header__mobile-link">
                  {link.label}
                </NavLink>
                {link.children?.map((child) => (
                  <NavLink
                    key={child.to}
                    to={child.to}
                    className="header__mobile-link header__mobile-link--sub"
                  >
                    {child.label}
                  </NavLink>
                ))}
              </li>
            ))}
          </ul>
        </nav>
        <Button href={bookingHref} variant="primary" className="header__mobile-cta">
          Agenda una asesoría
        </Button>
      </div>
    </header>
  );
}

export default Header;
