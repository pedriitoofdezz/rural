import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import { getAlojamientos } from "../services/alojamientos";

export default function Home() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      try {
        const data = await getAlojamientos();
        setAlojamientos(data);
      } catch (err) {
        setError("No se pudieron cargar los alojamientos");
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  return (
    <div className="home-page">
      <Navbar />

      <header className="rural-hero">
        <div className="rural-hero-content">
          <span className="hero-kicker">Escapadas rurales en toda Espana</span>
          <h1>
            Encuentra una casa rural con encanto para desconectar de verdad
          </h1>
          <p className="hero-copy">
            Alojamientos entre montanas, pueblos con historia y parajes
            naturales. Compara ubicaciones, revisa disponibilidad y reserva en
            pocos pasos.
          </p>

          <SearchBar />

          <div className="hero-highlights">
            <div className="hero-highlight">
              <strong>+250</strong>
              <span>alojamientos verificados</span>
            </div>
            <div className="hero-highlight">
              <strong>Entorno natural</strong>
              <span>casas con jardin, chimenea o vistas</span>
            </div>
            <div className="hero-highlight">
              <strong>Reserva facil</strong>
              <span>consulta disponibilidad al momento</span>
            </div>
          </div>
        </div>
      </header>

      <section className="alojamientos-section">
        <h2>Alojamientos destacados</h2>

        {loading ? (
          <p>Cargando alojamientos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="alojamientos-grid">
            {alojamientos.map((a) => (
              <div key={a.id} className="alojamiento-card">
                <img src={a.imagen} alt={a.nombre} />
                <h3>{a.nombre}</h3>
                <p>{a.ubicacion}</p>
                <p>{a.precio} € / noche</p>
                <button
                  className="ver-mas-btn"
                  onClick={() => alert(`Has pulsado en ${a.nombre}`)}
                >
                  Ver alojamiento
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
