import "./NewsCard.css";

function NewsCard({
  article,
  keyword,
  isLoggedIn,
  isSavedPage,
  onSaveClick,
  onDeleteClick,
}) {
  const { urlToImage, publishedAt, title, description, source, savedId } =
    article;
  const isSaved = !!savedId;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function handleBookmarkClick() {
    if (isSavedPage || isSaved) {
      onDeleteClick(savedId);
    } else {
      onSaveClick(article);
    }
  }

  const btnClassName = [
    "news-card__bookmark-btn",
    isSavedPage ? "news-card__bookmark-btn_delete" : "",
    !isSavedPage && isSaved ? "news-card__bookmark-btn_active" : "",
    !isLoggedIn ? "news-card__bookmark-btn_disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img src={urlToImage} alt={title} className="news-card__image" />

        {keyword && <span className="news-card__keyword">{keyword}</span>}

        <div className="news-card__bookmark-wrapper">
          <button
            type="button"
            className={btnClassName}
            onClick={isLoggedIn ? handleBookmarkClick : undefined}
            disabled={!isLoggedIn}
            aria-label={
              isSavedPage || isSaved
                ? "Eliminar de guardados"
                : "Guardar artículo"
            }
          />
          {!isLoggedIn && (
            <span className="news-card__tooltip">
              Inicia sesión para guardar artículos
            </span>
          )}
          {isLoggedIn && isSavedPage && (
            <span className="news-card__tooltip news-card__tooltip_delete">
              Eliminar de guardados
            </span>
          )}
        </div>
      </div>

      <div className="news-card__info">
        <p className="news-card__date">{formatDate(publishedAt)}</p>
        <h3 className="news-card__title">{title}</h3>
        <p className="news-card__text">{description}</p>
        <p className="news-card__source">{source?.name}</p>
      </div>
    </li>
  );
}

export default NewsCard;
