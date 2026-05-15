import { useEffect, useState } from "react";
import { getAlojamientoById } from "../services/alojamientos";

export default function HouseDetail({ id }) {
  const [alojamiento, setAlojamiento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarDetalle() {
      const data = await getAlojamientoById(id);
      setAlojamiento(data || null);
      setLoading(false);
    }

    cargarDetalle();
  }, [id]);

  if (loading) {
    return (
      <main className="page-shell">
        <p>Cargando alojamiento...</p>
      </main>
    );
  }

  if (!alojamiento) {
    return (
      <main className="page-shell">
        <section className="page-header">
          <h1>Alojamiento no encontrado</h1>
          <p>El alojamiento solicitado no existe.</p>
          <a className="primary-link" href="#/alojamientos">
            Ver alojamientos
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <section className="detail-hero">
        <img src={alojamiento.imagen} alt={alojamiento.nombre} />
        <div className="detail-panel">
          <span className="hero-kicker">{alojamiento.ubicacion}</span>
          <h1>{alojamiento.nombre}</h1>
          <p>{alojamiento.descripcion}</p>
          <div className="detail-price">
            <strong>{alojamiento.precio} EUR</strong>
            <span>por noche</span>
          </div>
          <a className="navbar-button detail-reserve" href={`#/reserva/${alojamiento.id}`}>
            Reservar
          </a>
        </div>
      </section>

      <section className="detail-section">
        <h2>Servicios incluidos</h2>
        <div className="amenities-list">
          {alojamiento.servicios.map((servicio) => (
            <span key={servicio}>{servicio}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
