import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import About from "../About/About.jsx";
import Preloader from "../Preloader/Preloader.jsx";
import emptyResultsIcon from "../../images/empty-results-icon.svg";
import "./Main.css";

function Main({
  isLoggedIn,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
  validationError,
  hasSearched,
  isLoading,
  hasError,
  visibleArticles,
  hasMoreArticles,
  onShowMore,
  onSaveClick,
  onDeleteClick,
}) {
  return (
    <main className="main">
      <section className="main__hero">
        <h1 className="main__title">¿Qué está pasando en el mundo?</h1>
        <p className="main__subtitle">
          Encuentra las últimas noticias sobre cualquier tema y guárdalas en tu
          cuenta personal.
        </p>

        <form className="main__search-form" onSubmit={onSearchSubmit}>
          <input
            type="text"
            className="main__search-input"
            placeholder="Introduce un tema"
            value={searchQuery}
            onChange={onSearchQueryChange}
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
          {!isLoading && !hasError && visibleArticles.length > 0 && (
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

          {!isLoading && !hasError && visibleArticles.length === 0 && (
            <div className="main__empty">
              <img src={emptyResultsIcon} alt="" className="main__empty-icon" />
              <h3 className="main__empty-title">No se encontró nada</h3>
              <p className="main__empty-subtitle">
                Lo sentimos, pero no hay nada que coincida con tus términos de
                búsqueda.
              </p>
            </div>
          )}

          {!isLoading && !hasError && visibleArticles.length > 0 && (
            <>
              <NewsCardList
                articles={visibleArticles}
                isLoggedIn={isLoggedIn}
                isSavedPage={false}
                onSaveClick={onSaveClick}
                onDeleteClick={onDeleteClick}
              />

              {hasMoreArticles && (
                <button
                  type="button"
                  className="main__show-more-btn"
                  onClick={onShowMore}
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
