import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import "./SavedNews.css";

function SavedNews({ userName, articles, isLoggedIn, onDeleteClick }) {
  return (
    <main className="saved-news">
      <SavedNewsHeader userName={userName} articles={articles} />
      <NewsCardList
        articles={articles}
        isLoggedIn={isLoggedIn}
        onDeleteClick={onDeleteClick}
      />
    </main>
  );
}

export default SavedNews;