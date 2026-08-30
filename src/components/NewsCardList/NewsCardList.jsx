import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({
  articles,
  isSaved,
  isLoggedIn,
  onSaveClick,
  onDeleteClick,
}) {
  return (
    <ul className="news-card-list">
      {articles.map((article, index) => (
        <NewsCard
          key={index}
          article={article}
          isSaved={isSaved}
          keyword={article.keyword}
          isLoggedIn={isLoggedIn}
          onSaveClick={onSaveClick}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </ul>
  );
}

export default NewsCardList;