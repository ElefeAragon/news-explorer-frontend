import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isLoggedIn,
  isSavedPage,
  onSaveClick,
  onDeleteClick,
}) {
  return (
    <ul className="news-card-list">
      {articles.map((article) => (
        <NewsCard
          key={article.url}
          article={article}
          keyword={article.keyword}
          isLoggedIn={isLoggedIn}
          isSavedPage={isSavedPage}
          onSaveClick={onSaveClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;
