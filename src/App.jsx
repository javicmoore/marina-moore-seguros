import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Home from "./pages/Home/Home.jsx";
import ProductPage from "./pages/products/ProductPage.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import PrivacyNotice from "./pages/PrivacyNotice/PrivacyNotice.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <ScrollToTop />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gmm" element={<ProductPage slug="gmm" />} />
          <Route path="/auto" element={<ProductPage slug="auto" />} />
          <Route path="/auto-turista" element={<ProductPage slug="auto-turista" />} />
          <Route path="/ppr" element={<ProductPage slug="ppr" />} />
          <Route path="/hogar" element={<ProductPage slug="hogar" />} />
          <Route path="/sobre-marina" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/aviso-de-privacidad" element={<PrivacyNotice />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
