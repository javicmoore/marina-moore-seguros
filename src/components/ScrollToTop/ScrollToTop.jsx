import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Ensures every route change starts scrolled to the top, since React Router
// does not reset scroll position automatically like a full page navigation.
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;
