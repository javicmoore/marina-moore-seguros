import "./SectionHeading.css";

// Encabezado de sección reutilizable: eyebrow + título + descripción corta
// opcional. Mantiene consistente la jerarquía tipográfica en todo el sitio.
function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className = "",
}) {
  return (
    <div className={`section-heading section-heading--${align} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="section-heading__title">{title}</Tag>
      {description && <p className="section-heading__description">{description}</p>}
    </div>
  );
}

export default SectionHeading;
