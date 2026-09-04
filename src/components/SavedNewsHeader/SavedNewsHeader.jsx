import "./SavedNewsHeader.css";

function SavedNewsHeader({ userName, articles }) {
  const keywords = [...new Set(articles.map((a) => a.keyword))];

  function formatKeywords() {
    if (keywords.length <= 2) return keywords.join(", ");
    const shown = keywords.slice(0, 2).join(", ");
    const remaining = keywords.length - 2;
    return `${shown}, y ${remaining} más`;
  }

  return (
    <section className="saved-header">
      <p className="saved-header__label">Artículos guardados</p>
      <h1 className="saved-header__title">
        {userName}, tienes {articles.length} artículos guardados
      </h1>
      <p className="saved-header__keywords">
        Por palabras clave: <strong>{formatKeywords()}</strong>
      </p>
    </section>
  );
}

export default SavedNewsHeader;