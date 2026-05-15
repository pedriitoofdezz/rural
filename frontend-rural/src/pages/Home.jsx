import { useEffect, useState } from "react";
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
      } catch {
        setError("No se pudieron cargar los alojamientos");
      } finally {
        setLoading(false);
      }
    }

    cargarDatos();
  }, []);

  return (
    <main className="home-page">
      <header className="rural-hero">
        <div className="rural-hero-content">
          <span className="hero-kicker">Escapadas rurales en toda Espana</span>
          <h1>Encuentra una casa rural con encanto</h1>
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
        <div className="section-heading">
          <h2>Alojamientos destacados</h2>
          <a href="#/alojamientos">Ver todos</a>
        </div>

        {loading ? (
          <p>Cargando alojamientos...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="alojamientos-grid">
            {alojamientos.map((a) => (
              <article key={a.id} className="alojamiento-card">
                <img src={a.imagen} alt={a.nombre} />
                <div className="card-body">
                  <h3>{a.nombre}</h3>
                  <p>{a.ubicacion}</p>
                  <p>
                    <strong>{a.precio} EUR</strong> / noche
                  </p>
                  <div className="card-actions">
                    <a className="secondary-link" href={`#/alojamiento/${a.id}`}>
                      Ver alojamiento
                    </a>
                    <a className="ver-mas-btn" href={`#/reserva/${a.id}`}>
                      Reservar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
