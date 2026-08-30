import { useState, useEffect } from "react";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import About from "../About/About.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import { searchNews } from "../../utils/NewsExplorerApi.js";
import emptyResultsIcon from "../../images/empty-results-icon.svg";
import "./Main.css";

const CARDS_PER_PAGE = 3;

function Main({ isLoggedIn }) {
  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem("newsExplorerQuery") || "",
  );
  const [hasSearched, setHasSearched] = useState(
    () => !!localStorage.getItem("newsExplorerArticles"),
  );
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("newsExplorerArticles");
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem("newsExplorerArticles", JSON.stringify(articles));
      localStorage.setItem("newsExplorerQuery", searchQuery);
    }
  }, [articles, searchQuery]);

  function handleSearchSubmit(evt) {
    evt.preventDefault();

    if (searchQuery.trim() === "") {
      setValidationError("Por favor, introduzca una palabra clave");
      return;
    }

    setValidationError("");
    setIsLoading(true);
    setHasSearched(true);
    setHasError(false);
    setVisibleCount(CARDS_PER_PAGE);

    searchNews(searchQuery)
      .then((data) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        console.error("Error en la búsqueda:", err);
        setHasError(true);
        setArticles([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  }

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <p className="main__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
          cuenta personal.
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

        {validationError && (
          <p className="main__validation-error">{validationError}</p>
        )}
      </section>

      {hasSearched && (
        <section className="main__results">
          {!isLoading && !hasError && articles.length > 0 && (
            <h2 className="main__results-title">Resultados de la búsqueda</h2>
          )}

          {isLoading && <Preloader />}

          {!isLoading && hasError && (
            <p className="main__message">
              Lo sentimos, algo ha salido mal durante la solicitud. Es posible
              que haya un problema de conexión o que el servidor no funcione.
              Por favor, inténtalo más tarde.
            </p>
          )}

          {!isLoading && !hasError && articles.length === 0 && (
            <div className="main__empty">
              <img src={emptyResultsIcon} alt="" className="main__empty-icon" />
              <h3 className="main__empty-title">No se encontró nada</h3>
              <p className="main__empty-subtitle">
                Lo sentimos, pero no hay nada que coincida con tus términos de
                búsqueda.
              </p>
            </div>
          )}

          {!isLoading && !hasError && articles.length > 0 && (
            <>
              <NewsCardList
                articles={visibleArticles}
                isSaved={false}
                isLoggedIn={isLoggedIn}
              />

              {hasMoreArticles && (
                <button
                  type="button"
                  className="main__show-more-btn"
                  onClick={handleShowMore}
                >
                  Ver más
                </button>
              )}
            </>
          )}
        </section>
      )}

      <About />
    </main>
  );
}

export default Main;