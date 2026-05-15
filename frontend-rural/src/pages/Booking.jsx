import { useEffect, useMemo, useState } from "react";
import {
  createReserva,
  getAlojamientoById,
  getAlojamientos,
} from "../services/alojamientos";

const initialForm = {
  guestName: "",
  guestEmail: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
};

export default function Booking({ alojamientoId }) {
  const [alojamientos, setAlojamientos] = useState([]);
  const [selectedId, setSelectedId] = useState(alojamientoId || "");
  const [selectedAlojamiento, setSelectedAlojamiento] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarAlojamientos() {
      const data = await getAlojamientos();
      setAlojamientos(data);

      const id = alojamientoId || String(data[0]?.id || "");
      setSelectedId(id);
    }

    cargarAlojamientos();
  }, [alojamientoId]);

  useEffect(() => {
    async function cargarSeleccion() {
      if (!selectedId) {
        setSelectedAlojamiento(null);
        return;
      }

      const data = await getAlojamientoById(selectedId);
      setSelectedAlojamiento(data || null);
    }

    cargarSeleccion();
  }, [selectedId]);

  const maxGuests = useMemo(
    () => selectedAlojamiento?.capacidad || 8,
    [selectedAlojamiento],
  );

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setStatus("");

    if (!selectedId) {
      setError("Selecciona un alojamiento.");
      return;
    }

    if (form.checkOut <= form.checkIn) {
      setError("La fecha de salida debe ser posterior a la de entrada.");
      return;
    }

    if (Number(form.guests) > maxGuests) {
      setError(`Este alojamiento admite hasta ${maxGuests} huespedes.`);
      return;
    }

    await createReserva({
      houseId: selectedId,
      alojamientoNombre: selectedAlojamiento?.nombre,
      guestName: form.guestName,
      guestEmail: form.guestEmail,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      guests: Number(form.guests),
    });

    setStatus("Reserva confirmada. Te hemos dejado la confirmacion guardada.");
    setForm(initialForm);
  }

  return (
    <main className="page-shell booking-page">
      <section className="page-header">
        <span className="hero-kicker">Reserva</span>
        <h1>Completa tu reserva</h1>
        <p>Elige alojamiento, fechas y datos de contacto para confirmar.</p>
      </section>

      <section className="booking-layout">
        <form className="booking-form" onSubmit={handleSubmit}>
          <label>
            Alojamiento
            <select
              value={selectedId}
              onChange={(event) => setSelectedId(event.target.value)}
              required
            >
              <option value="">Selecciona un alojamiento</option>
              {alojamientos.map((alojamiento) => (
                <option key={alojamiento.id} value={alojamiento.id}>
                  {alojamiento.nombre}
                </option>
              ))}
            </select>
          </label>

          <label>
            Nombre
            <input
              name="guestName"
              type="text"
              value={form.guestName}
              onChange={updateField}
              required
            />
          </label>

          <label>
            Email
            <input
              name="guestEmail"
              type="email"
              value={form.guestEmail}
              onChange={updateField}
              required
            />
          </label>

          <div className="form-row">
            <label>
              Entrada
              <input
                name="checkIn"
                type="date"
                value={form.checkIn}
                onChange={updateField}
                required
              />
            </label>

            <label>
              Salida
              <input
                name="checkOut"
                type="date"
                value={form.checkOut}
                onChange={updateField}
                required
              />
            </label>
          </div>

          <label>
            Huespedes
            <input
              name="guests"
              type="number"
              min="1"
              max={maxGuests}
              value={form.guests}
              onChange={updateField}
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}
          {status && <p className="form-success">{status}</p>}

          <button type="submit" className="search-button booking-submit">
            Confirmar reserva
          </button>
        </form>

        {selectedAlojamiento && (
          <aside className="booking-summary">
            <img src={selectedAlojamiento.imagen} alt={selectedAlojamiento.nombre} />
            <h2>{selectedAlojamiento.nombre}</h2>
            <p>{selectedAlojamiento.ubicacion}</p>
            <p>Hasta {selectedAlojamiento.capacidad} huespedes</p>
            <strong>{selectedAlojamiento.precio} EUR / noche</strong>
          </aside>
        )}
      </section>
    </main>
  );
}
