import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ensures every route change starts scrolled to the top, since React Router
// does not reset scroll position automatically like a full page navigation.
// If the URL carries a hash (e.g. /ppr#simulador) it scrolls to that element
// instead — the browser can't do it on its own because the target is rendered
// by React after the URL changes. Focus moves there too (the target needs
// tabIndex={-1}) so keyboard and screen reader users land in the same place.
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;

    if (target) {
      target.scrollIntoView({ behavior: "instant", block: "start" });
      target.focus({ preventScroll: true });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
