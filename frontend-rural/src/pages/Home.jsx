import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <header className="rural-hero">
        <div className="rural-hero-content">
          <span className="hero-kicker">Escapadas rurales en toda Espana</span>
          <h1>Encuentra una casa rural con encanto para desconectar de verdad</h1>
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
    </div>
  );
}
