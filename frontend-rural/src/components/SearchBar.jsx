export default function SearchBar() {
  return (
    <form className="search-bar">
      <div className="search-field">
        <label htmlFor="destination">Destino</label>
        <input
          id="destination"
          type="text"
          placeholder="Pirineos, Asturias, Sierra de Cazorla..."
        />
      </div>

      <div className="search-field">
        <label htmlFor="dates">Fechas</label>
        <input id="dates" type="text" placeholder="Llegada - Salida" />
      </div>

      <div className="search-field">
        <label htmlFor="guests">Huespedes</label>
        <select id="guests" defaultValue="2">
          <option value="1">1 huesped</option>
          <option value="2">2 huespedes</option>
          <option value="4">4 huespedes</option>
          <option value="6">6 huespedes</option>
          <option value="8">8+ huespedes</option>
        </select>
      </div>

      <button type="submit" className="search-button">
        Buscar alojamiento
      </button>
    </form>
  );
}
