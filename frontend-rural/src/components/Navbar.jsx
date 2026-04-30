export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#" className="navbar-logo">
          <span className="navbar-logo-icon">R</span>
          <div className="navbar-logo-text">
            <strong>RuralStay</strong>
            <span>Escapadas rurales con encanto</span>
          </div>
        </a>
      </div>

      <ul className="navbar-links">
        <li>
          <a href="#">Inicio</a>
        </li>
        <li>
          <a href="#">Alojamientos</a>
        </li>
        <li>
          <a href="#">Reservas</a>
        </li>
        <li>
          <a href="#">Contacto</a>
        </li>
      </ul>

      <a href="#" className="navbar-button">
        Reservar ahora
      </a>
    </nav>
  );
}
