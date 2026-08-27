import "./Preloader.css";

function Preloader() {
  return (
    <div className="preloader">
      <span className="preloader__circle"></span>
      <p className="preloader__text">Buscando noticias...</p>
    </div>
  );
}

export default Preloader;