import { alojamientosMock } from "../mocks/alojamientos";

export async function getAlojamientos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(alojamientosMock);
    }, 500);
  });
}

export async function getAlojamientoById(id) {
  const alojamientos = await getAlojamientos();
  return alojamientos.find((alojamiento) => String(alojamiento.id) === String(id));
}

export function filterAlojamientos(alojamientos, filters = {}) {
  const destination = filters.destination?.trim().toLowerCase() || "";
  const guests = Number(filters.guests || 0);

  return alojamientos.filter((alojamiento) => {
    const matchesDestination =
      !destination ||
      alojamiento.nombre.toLowerCase().includes(destination) ||
      alojamiento.ubicacion.toLowerCase().includes(destination);

    const matchesGuests = !guests || alojamiento.capacidad >= guests;

    return matchesDestination && matchesGuests;
  });
}

export async function createReserva(reserva) {
  const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
  const nuevaReserva = {
    id: crypto.randomUUID(),
    status: "confirmada",
    createdAt: new Date().toISOString(),
    ...reserva,
  };

  localStorage.setItem("reservas", JSON.stringify([...reservas, nuevaReserva]));
  return nuevaReserva;
}
