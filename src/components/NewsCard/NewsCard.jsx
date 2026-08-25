import "./NewsCard.css";

function NewsCard({ article, isSaved, keyword, onSaveClick, onDeleteClick }) {
  const { urlToImage, publishedAt, title, description, source } = article;

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function handleBookmarkClick() {
    if (isSaved) {
      onDeleteClick(article);
    } else {
      onSaveClick(article);
    }
  }

  return (
    <li className="news-card">
      <div className="news-card__image-container">
        <img src={urlToImage} alt={title} className="news-card__image" />

        {keyword && <span className="news-card__keyword">{keyword}</span>}

        <button
          type="button"
          className={`news-card__bookmark-btn ${
            isSaved ? "news-card__bookmark-btn_active" : ""
          }`}
          onClick={handleBookmarkClick}
          aria-label={isSaved ? "Eliminar de guardados" : "Guardar artículo"}
        />
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