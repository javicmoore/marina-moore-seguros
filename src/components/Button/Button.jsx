import { Link } from "react-router-dom";
import "./Button.css";

// Botón reutilizable con tres variantes visuales y tres formas de renderizado
// (ruta interna vía React Router, enlace externo/tel/wa, o botón nativo).
// variant: "primary" | "outline" | "ghost"
function Button({
  children,
  to,
  href,
  variant = "primary",
  icon: Icon,
  iconPosition = "right",
  className = "",
  ...rest
}) {
  const classes = ["btn", `btn--${variant}`, className].filter(Boolean).join(" ");

  const content = (
    <>
      {Icon && iconPosition === "left" && (
        <Icon size={18} className="btn__icon btn__icon--left" aria-hidden="true" />
      )}
      <span>{children}</span>
      {Icon && iconPosition === "right" && (
        <Icon size={18} className="btn__icon btn__icon--right" aria-hidden="true" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const isExternal = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}

export default Button;
