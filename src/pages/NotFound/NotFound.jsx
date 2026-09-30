import Button from "../../components/Button/Button.jsx";
import useDocumentMeta from "../../hooks/useDocumentMeta.js";
import "./NotFound.css";

function NotFound() {
  // Sin ruta conocida: título de 404, noindex y sin canonical ni Open Graph.
  useDocumentMeta(null);

  return (
    <section className="section not-found">
      <div className="container not-found__inner">
        <span className="eyebrow">Error 404</span>
        <h1 className="not-found__title">Esta página no existe</h1>
        <p className="not-found__text">
          El contenido que buscas no está disponible o cambió de dirección.
        </p>
        <Button to="/" variant="primary">
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
