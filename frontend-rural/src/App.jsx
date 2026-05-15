import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Alojamientos from "./pages/Alojamientos";
import HouseDetail from "./pages/HouseDetail";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function getRoute() {
  const hash = window.location.hash.replace(/^#/, "") || "/";
  const [path, queryString = ""] = hash.split("?");
  return {
    path: path || "/",
    params: new URLSearchParams(queryString),
  };
}

function Contacto() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="hero-kicker">Contacto</span>
        <h1>Hablamos de tu proxima escapada</h1>
        <p>
          Escribenos para resolver dudas sobre alojamientos, fechas o reservas.
        </p>
      </section>

      <section className="contact-grid">
        <a href="mailto:info@ruralstay.local" className="contact-card">
          <strong>Email</strong>
          <span>info@ruralstay.local</span>
        </a>
        <a href="tel:+34900111222" className="contact-card">
          <strong>Telefono</strong>
          <span>900 111 222</span>
        </a>
      </section>
    </main>
  );
}

function NotFound() {
  return (
    <main className="page-shell">
      <section className="page-header">
        <h1>Pagina no encontrada</h1>
        <p>La seccion que buscas no existe o ha cambiado.</p>
        <a className="primary-link" href="#/">
          Volver al inicio
        </a>
      </section>
    </main>
  );
}

function App() {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => setRoute(getRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const page = useMemo(() => {
    if (route.path === "/") return <Home />;
    if (route.path === "/alojamientos") return <Alojamientos params={route.params} />;
    if (route.path === "/reserva") return <Booking />;
    if (route.path === "/contacto") return <Contacto />;

    const alojamientoMatch = route.path.match(/^\/alojamiento\/([^/]+)$/);
    if (alojamientoMatch) {
      return <HouseDetail id={alojamientoMatch[1]} />;
    }

    const reservaMatch = route.path.match(/^\/reserva\/([^/]+)$/);
    if (reservaMatch) {
      return <Booking alojamientoId={reservaMatch[1]} />;
    }

    return <NotFound />;
  }, [route]);

  return (
    <div className="app">
      <Navbar />
      {page}
      <Footer />
    </div>
  );
}

export default App;
