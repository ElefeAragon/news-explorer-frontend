import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import { searchNews } from "../../utils/NewsExplorerApi.js";
import {
  CARDS_PER_PAGE,
  LOCAL_STORAGE_ARTICLES_KEY,
  LOCAL_STORAGE_QUERY_KEY,
} from "../../utils/constants.js";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

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

  function handleLoginClick() {
    setAuthMode("login");
    setIsLoginPopupOpen(true);
  }

  function handleClosePopup() {
    setIsLoginPopupOpen(false);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserName("");
  }

  function handleLogin({ email, password }) {
    console.log("login con:", email, password);
  }

  function handleRegister({ email, password, userName: registerUserName }) {
    console.log("registro con:", email, password, registerUserName);
  }

  function handleSwitchToRegister() {
    setAuthMode("register");
  }

  function handleSwitchToLogin() {
    setAuthMode("login");
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

  const visibleArticles = articles.slice(0, visibleCount);
  const hasMoreArticles = visibleCount < articles.length;

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
            />
          }
        />
        <Route
          path="/saved-news"
          element={<SavedNews userName={userName} />}
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
          />
        ) : (
          <RegisterForm
            onRegister={handleRegister}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </PopupWithForm>
    </div>
  );
}

export default App;