export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#/" className="navbar-logo">
          <span className="navbar-logo-icon">R</span>
          <div className="navbar-logo-text">
            <strong>RuralStay</strong>
            <span>Escapadas rurales con encanto</span>
          </div>
        </a>
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#/">Inicio</a>
        </li>
        <li>
          <a href="#/alojamientos">Alojamientos</a>
        </li>
        <li>
          <a href="#/reserva">Reservas</a>
        </li>
        <li>
          <a href="#/contacto">Contacto</a>
        </li>
      </ul>

      <a href="#/reserva" className="navbar-button">
        Reservar ahora
      </a>
    </nav>
  );
}
