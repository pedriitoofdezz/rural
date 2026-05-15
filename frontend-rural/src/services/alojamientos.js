import { alojamientosMock } from "../mocks/alojamientos";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function normalizeAlojamiento(alojamiento) {
  return {
    id: alojamiento.id || alojamiento._id,
    nombre: alojamiento.nombre || alojamiento.title,
    ubicacion: alojamiento.ubicacion || alojamiento.location,
    precio: alojamiento.precio || alojamiento.pricePerNight,
    imagen:
      alojamiento.imagen ||
      alojamiento.images?.[0] ||
      "https://picsum.photos/400/250?random=10",
    capacidad: alojamiento.capacidad || alojamiento.capacity,
    descripcion: alojamiento.descripcion || alojamiento.description,
    servicios: alojamiento.servicios || alojamiento.amenities || [],
  };
}

async function fetchJson(path, options) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Error HTTP ${response.status}`);
  }

  return response.json();
}

export async function getAlojamientos() {
  try {
    const data = await fetchJson("/api/houses");
    return data.map(normalizeAlojamiento);
  } catch {
    return alojamientosMock;
  }
}

export async function getAlojamientoById(id) {
  try {
    const data = await fetchJson(`/api/houses/${id}`);
    return normalizeAlojamiento(data);
  } catch {
    const alojamientos = await getAlojamientos();
    return alojamientos.find((alojamiento) => String(alojamiento.id) === String(id));
  }
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
  const nuevaReserva = {
    id: crypto.randomUUID(),
    status: "confirmada",
    createdAt: new Date().toISOString(),
    ...reserva,
  };

  try {
    return await fetchJson("/api/bookings", {
      method: "POST",
      body: JSON.stringify(nuevaReserva),
    });
  } catch {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    localStorage.setItem("reservas", JSON.stringify([...reservas, nuevaReserva]));
    return nuevaReserva;
  }
}
