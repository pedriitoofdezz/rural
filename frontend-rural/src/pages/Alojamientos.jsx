import { useEffect, useMemo, useState } from "react";
import SearchBar from "../components/SearchBar";
import { filterAlojamientos, getAlojamientos } from "../services/alojamientos";

function getFilterValue(params, key, fallback = "") {
  return params?.get(key) || fallback;
}

function Alojamientos({ params }) {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = useMemo(
    () => ({
      destination: getFilterValue(params, "destination"),
      guests: getFilterValue(params, "guests"),
    }),
    [params],
  );

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

  const alojamientosFiltrados = filterAlojamientos(alojamientos, filters);

  return (
    <main className="page-shell">
      <section className="page-header">
        <span className="hero-kicker">Alojamientos</span>
        <h1>Casas rurales disponibles</h1>
        <p>Filtra por destino y huespedes para encontrar una opcion adecuada.</p>
      </section>

      <SearchBar
        key={`${filters.destination}-${filters.guests || "2"}`}
        initialDestination={filters.destination}
        initialGuests={filters.guests || "2"}
      />

      <section className="alojamientos-section page-list">
        <div className="section-heading">
          <h2>
            {loading
              ? "Buscando alojamientos"
              : `${alojamientosFiltrados.length} alojamientos encontrados`}
          </h2>
          <a href="#/alojamientos">Limpiar filtros</a>
        </div>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : alojamientosFiltrados.length === 0 ? (
          <div className="empty-state">
            <h2>No hay resultados</h2>
            <p>Prueba con otro destino o con menos huespedes.</p>
          </div>
        ) : (
          <div className="alojamientos-grid">
            {alojamientosFiltrados.map((a) => (
              <article key={a.id} className="alojamiento-card">
                <img src={a.imagen} alt={a.nombre} />
                <div className="card-body">
                  <h3>{a.nombre}</h3>
                  <p>{a.ubicacion}</p>
                  <p>Hasta {a.capacidad} huespedes</p>
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

export default Alojamientos;
