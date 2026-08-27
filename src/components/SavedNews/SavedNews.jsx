import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader.jsx";
import NewsCardList from "../NewsCardList/NewsCardList.jsx";
import "./SavedNews.css";

const placeholderSavedArticles = [
  {
    urlToImage: "https://placehold.co/400x250",
    publishedAt: "2020-11-04",
    title: "Todo el mundo necesita un lugar de reflexión en la naturaleza.",
    description: "Desde que leí el influyente libro de Richard Louv...",
    source: { name: "Treehugger" },
    keyword: "Naturaleza",
  },
  {
    urlToImage: "https://placehold.co/400x250",
    publishedAt: "2019-02-19",
    title: "La naturaleza te hace mejor.",
    description: "Milenios atrás ya nos percatamos de ello...",
    source: { name: "National Geographic" },
    keyword: "Naturaleza",
  },
  {
    urlToImage: "https://placehold.co/400x250",
    publishedAt: "2020-10-19",
    title: "Fotos nostálgicas hechas por turistas en los parques.",
    description: "Uri Løvevold Golman y Helle Løvevold Golman...",
    source: { name: "National Geographic" },
    keyword: "Yellowstone",
  },
];

function SavedNews({ userName }) {
  function handleDeleteClick(article) {
    console.log("eliminar de guardados:", article);
  }

  return (
    <main className="saved-news">
      <SavedNewsHeader userName={userName} articles={placeholderSavedArticles} />
      <NewsCardList
        articles={placeholderSavedArticles}
        isSaved={true}
        onDeleteClick={handleDeleteClick}
      />
    </main>
  );
}

export default SavedNews;