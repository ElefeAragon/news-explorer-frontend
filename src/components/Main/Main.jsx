import { useState } from "react";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import About from "../About/About.jsx";
import "./Main.css";

const placeholderArticles = [
  {
    urlToImage: "https://placehold.co/400x250",
    publishedAt: "2020-11-04",
    title: "Todo el mundo necesita un lugar de reflexión en la naturaleza.",
    description:
      "Desde que leí el influyente libro de Richard Louv, 'El último niño en el bosque'...",
    source: { name: "Treehugger" },
  },
  {
    urlToImage: "https://placehold.co/400x250",
    publishedAt: "2019-02-19",
    title: "La naturaleza te hace mejor.",
    description:
      "Milenios atrás ya nos percatamos de ello: el sonido del océano...",
    source: { name: "National Geographic" },
  },
  {
    urlToImage: "https://placehold.co/400x250",
    publishedAt: "2020-10-19",
    title: "El Grand Teton renueva el histórico Camino de la Cresta.",
    description:
      "La unión de los senderos de la Cascada y del Cañón de la Muerte...",
    source: { name: "National Parks Traveler" },
  },
];

function Main() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearchSubmit(evt) {
    evt.preventDefault();
    if (searchQuery.trim() === "") return;
    // por ahora solo simulamos con los datos de prueba;
    // cuando conectemos la News API real, aquí va el fetch de verdad
    setHasSearched(true);
  }

  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <p className="main__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en
          tu cuenta personal.
        </p>

        <form className="main__search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="main__search-input"
            placeholder="Introduce un tema"
            value={searchQuery}
            onChange={(evt) => setSearchQuery(evt.target.value)}
          />
          <button type="submit" className="main__search-btn">
            Buscar
          </button>
        </form>
      </section>

      {hasSearched && (
        <section className="main__results">
          <h2 className="main__results-title">Resultados de la búsqueda</h2>
          <NewsCardList articles={placeholderArticles} isSaved={false} />
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;