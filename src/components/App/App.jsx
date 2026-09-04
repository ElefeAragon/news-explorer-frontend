import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import { searchNews } from "../../utils/NewsExplorerApi.js";
import * as MainApi from "../../utils/MainApi.js";
import {
  CARDS_PER_PAGE,
  LOCAL_STORAGE_ARTICLES_KEY,
  LOCAL_STORAGE_QUERY_KEY,
} from "../../utils/constants.js";
import "./App.css";

function formatSavedArticle(a) {
  return {
    ...a,
    url: a.link,
    urlToImage: a.image,
    publishedAt: a.date,
    description: a.text,
    source: { name: a.source },
    savedId: a._id,
  };
}

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authError, setAuthError] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);

  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem(LOCAL_STORAGE_QUERY_KEY) || "",
  );
  const [hasSearched, setHasSearched] = useState(
    () => !!localStorage.getItem(LOCAL_STORAGE_ARTICLES_KEY),
  );
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_ARTICLES_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [visibleCount, setVisibleCount] = useState(CARDS_PER_PAGE);

  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_ARTICLES_KEY, JSON.stringify(articles));
      localStorage.setItem(LOCAL_STORAGE_QUERY_KEY, searchQuery);
    }
  }, [articles, searchQuery]);

  function fetchSavedArticles(token) {
    MainApi.getSavedArticles(token)
      .then((data) => {
        setSavedArticles(data);
      })
      .catch((err) => {
        console.error("Error al cargar artículos guardados:", err);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    MainApi.getCurrentUser(token)
      .then((user) => {
        setIsLoggedIn(true);
        setUserName(user.name);
        fetchSavedArticles(token);
      })
      .catch((err) => {
        console.error("Token inválido o expirado:", err);
        localStorage.removeItem("jwt");
      });
  }, []);

  function handleLoginClick() {
    setAuthMode("login");
    setAuthError("");
    setIsLoginPopupOpen(true);
  }

  function handleClosePopup() {
    setIsLoginPopupOpen(false);
    setAuthError("");
  }

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setUserName("");
    setSavedArticles([]);
    navigate("/");
  }

  function handleLogin({ email, password }) {
    setAuthError("");

    MainApi.login({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        return MainApi.getCurrentUser(data.token).then((user) => {
          setIsLoggedIn(true);
          setUserName(user.name);
          setIsLoginPopupOpen(false);
          fetchSavedArticles(data.token);
        });
      })
      .catch((err) => {
        console.error("Error en login:", err);
        setAuthError("Correo o contraseña incorrectos");
      });
  }

  function handleRegister({ email, password, userName: registerUserName }) {
    setAuthError("");

    MainApi.register({ email, password, name: registerUserName })
      .then(() => {
        setAuthMode("login");
      })
      .catch((err) => {
        console.error("Error en registro:", err);
        setAuthError(
          typeof err === "string" ? err : "No se pudo completar el registro",
        );
      });
  }

  function handleSwitchToRegister() {
    setAuthMode("register");
    setAuthError("");
  }

  function handleSwitchToLogin() {
    setAuthMode("login");
    setAuthError("");
  }

  function handleSaveArticle(article) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    const payload = {
      keyword: searchQuery,
      title: article.title,
      text: article.description || "Sin descripción",
      date: article.publishedAt,
      source: article.source?.name || "Desconocida",
      link: article.url,
      image: article.urlToImage,
    };

    MainApi.saveArticle(token, payload)
      .then((savedArticle) => {
        setSavedArticles((prev) => [...prev, savedArticle]);
      })
      .catch((err) => {
        console.error("Error al guardar artículo:", err);
      });
  }

  function handleDeleteArticle(articleId) {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    MainApi.deleteArticle(token, articleId)
      .then(() => {
        setSavedArticles((prev) => prev.filter((a) => a._id !== articleId));
      })
      .catch((err) => {
        console.error("Error al eliminar artículo:", err);
      });
  }

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

  function handleSearchQueryChange(evt) {
    setSearchQuery(evt.target.value);
  }

  function handleShowMore() {
    setVisibleCount((prev) => prev + CARDS_PER_PAGE);
  }

  const formattedSavedArticles = savedArticles.map(formatSavedArticle);

  const enrichedArticles = articles.map((article) => {
    const match = formattedSavedArticles.find((a) => a.url === article.url);
    return match ? { ...article, savedId: match.savedId } : article;
  });

  const visibleArticles = enrichedArticles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < enrichedArticles.length;

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              isLoggedIn={isLoggedIn}
              searchQuery={searchQuery}
              onSearchQueryChange={handleSearchQueryChange}
              onSearchSubmit={handleSearchSubmit}
              validationError={validationError}
              hasSearched={hasSearched}
              isLoading={isLoading}
              hasError={hasError}
              visibleArticles={visibleArticles}
              hasMoreArticles={hasMoreArticles}
              onShowMore={handleShowMore}
              onSaveClick={handleSaveArticle}
              onDeleteClick={handleDeleteArticle}
            />
          }
        />
        <Route
          path="/saved-news"
          element={
            <SavedNews
              userName={userName}
              articles={formattedSavedArticles}
              isLoggedIn={isLoggedIn}
              onDeleteClick={handleDeleteArticle}
            />
          }
        />
      </Routes>

      <Footer />

      <PopupWithForm
        isOpen={isLoginPopupOpen}
        onClose={handleClosePopup}
        title={authMode === "login" ? "Iniciar sesión" : "Inscribirse"}
      >
        {authMode === "login" ? (
          <LoginForm
            onLogin={handleLogin}
            onSwitchToRegister={handleSwitchToRegister}
            errorMessage={authError}
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={handleSwitchToLogin}
            errorMessage={authError}
          />
        )}
      </PopupWithForm>
    </div>
  );
}

export default App;