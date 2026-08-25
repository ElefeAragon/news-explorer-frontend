import NewsCard from "../NewsCard/NewsCard.jsx";
import "./NewsCardList.css";

function NewsCardList({ articles }) {
  return (
    <ul className="news-card-list">
      {articles.map((article, index) => (
        <NewsCard key={index} article={article} isSaved={false} />
      ))}
    </ul>
  );
}

export default NewsCardList;