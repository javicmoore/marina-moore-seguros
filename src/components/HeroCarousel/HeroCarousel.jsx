import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { heroCarouselSlides } from "../../config/siteConfig.js";
import "./HeroCarousel.css";

const AUTOPLAY_DELAY = 5500;
const SWIPE_THRESHOLD = 40;

// Ancho real del carrusel en pantalla, para que el navegador elija del srcset
// la versión justa. Refleja el layout de .hero__grid en Home.css: a partir de
// 1024px la columna de texto mide 480px + 48px de gap y el contenedor tiene
// max-width 1600px; debajo de eso ocupa todo el ancho menos el padding.
// Mantener sincronizado con el <link rel="preload"> de index.html.
const IMAGE_SIZES = "(min-width: 1600px) 1030px, (min-width: 1024px) calc(100vw - 624px), 92vw";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => setReduced(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

// Carrusel visual y editorial de las soluciones principales. Los datos
// (slug, ruta, título, imagen) viven en siteConfig.js.
function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();
  const rootRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const suppressClick = useRef(false);
  const slideCount = heroCarouselSlides.length;

  const goTo = (nextIndex) => setIndex(((nextIndex % slideCount) + slideCount) % slideCount);

  // Auto-advance. Re-arms every time the slide changes (manually or
  // automatically) and is skipped entirely under prefers-reduced-motion.
  // Also held while the carousel is scrolled out of view, so it doesn't keep
  // animating (and repainting) off-screen.
  useEffect(() => {
    if (isPaused || !isInView || prefersReducedMotion) return undefined;
    const timer = setTimeout(() => {
      setIndex((current) => (current + 1) % slideCount);
    }, AUTOPLAY_DELAY);
    return () => clearTimeout(timer);
  }, [index, isPaused, isInView, prefersReducedMotion, slideCount]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Decode every slide's photo up front so no transition has to decode (or
  // show the gradient fallback for a frame) while it's already moving.
  useEffect(() => {
    rootRef.current?.querySelectorAll("img").forEach((img) => {
      img.decode().catch(() => {});
    });
  }, []);

  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsPaused(false);
    }
  }

  function handleTouchStart(event) {
    setIsPaused(true);
    touchStartX.current = event.touches[0].clientX;
    touchDeltaX.current = 0;
  }

  function handleTouchMove(event) {
    touchDeltaX.current = event.touches[0].clientX - touchStartX.current;
  }

  function handleTouchEnd() {
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      suppressClick.current = true;
      goTo(delta < 0 ? index + 1 : index - 1);
    }
    touchDeltaX.current = 0;
    setIsPaused(false);
  }

  function handleSlideClick(event) {
    if (suppressClick.current) {
      event.preventDefault();
      suppressClick.current = false;
    }
  }

  return (
    <div
      ref={rootRef}
      className="hero-carousel"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Soluciones destacadas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
    >
      <div
        className="hero-carousel__viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="hero-carousel__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {heroCarouselSlides.map((slide, slideIndex) => {
            const isActive = slideIndex === index;
            return (
              <Link
                key={slide.id}
                to={slide.path}
                className={`hero-carousel__slide hero-carousel__slide--${slide.id}`}
                onClick={handleSlideClick}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
              >
                {/* Todas las slides cargan de inicio (pesan poco): con
                    loading="lazy" las que están fuera del viewport horizontal
                    se descargaban/decodificaban justo al entrar en la
                    transición. La primera va con prioridad alta (LCP) y todas
                    se pre-decodifican en el efecto de arriba. */}
                <img
                  src={slide.image}
                  srcSet={slide.imageSrcSet}
                  sizes={IMAGE_SIZES}
                  alt=""
                  className="hero-carousel__image"
                  fetchPriority={slideIndex === 0 ? "high" : "low"}
                />
                <span className="hero-carousel__overlay" aria-hidden="true" />
                {slide.text || slide.cta ? (
                  // Slide destacada (p. ej. Auto Turista): título + texto
                  // breve + CTA, todo configurable desde siteConfig.js.
                  <span className="hero-carousel__label hero-carousel__label--rich">
                    <span className="hero-carousel__title">{slide.title}</span>
                    {slide.text && <span className="hero-carousel__text">{slide.text}</span>}
                    {slide.cta && (
                      <span className="hero-carousel__cta">
                        {slide.cta}
                        <ArrowUpRight size={16} aria-hidden="true" />
                      </span>
                    )}
                  </span>
                ) : (
                  <span className="hero-carousel__label">
                    {slide.title}
                    <ArrowUpRight size={16} aria-hidden="true" />
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--prev"
        onClick={() => goTo(index - 1)}
        aria-label="Solución anterior"
      >
        <ChevronLeft size={20} aria-hidden="true" />
      </button>
      <button
        type="button"
        className="hero-carousel__arrow hero-carousel__arrow--next"
        onClick={() => goTo(index + 1)}
        aria-label="Siguiente solución"
      >
        <ChevronRight size={20} aria-hidden="true" />
      </button>

      <div className="hero-carousel__dots" role="tablist" aria-label="Seleccionar solución">
        {heroCarouselSlides.map((slide, slideIndex) => (
          <button
            key={slide.id}
            type="button"
            role="tab"
            aria-selected={slideIndex === index}
            aria-label={`Ir a ${slide.title}`}
            className={`hero-carousel__dot ${slideIndex === index ? "is-active" : ""}`}
            onClick={() => goTo(slideIndex)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
