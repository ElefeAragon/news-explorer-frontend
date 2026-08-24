import "./Main.css";

function Main() {
  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <p className="main__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en
          tu cuenta personal.
        </p>

        <form className="main__search-form">
          <input
            type="text"
            className="main__search-input"
            placeholder="Introduce un tema"
          />
          <button type="submit" className="main__search-btn">
            Buscar
          </button>
        </form>
      </section>
    </main>
  );
}

export default Main;