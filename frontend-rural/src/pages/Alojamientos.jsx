import { useEffect, useState } from "react";
import { getAlojamientos } from "../services/alojamientos";

function Alojamientos() {
  const [alojamientos, setAlojamientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarDatos() {
      const data = await getAlojamientos();
      setAlojamientos(data);
      setLoading(false);
    }

    cargarDatos();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Alojamientos</h1>

      {alojamientos.map((a) => (
        <div key={a.id}>
          <h2>{a.nombre}</h2>
          <p>{a.ubicacion}</p>
          <p>{a.precio} €</p>
        </div>
      ))}
    </div>
  );
}

export default Alojamientos;
