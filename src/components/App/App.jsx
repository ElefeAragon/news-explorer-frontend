import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import PopupWithForm from "../PopupWithForm/PopupWithForm.jsx";
import LoginForm from "../LoginForm/LoginForm.jsx";
import RegisterForm from "../RegisterForm/RegisterForm.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");

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

  function handleRegister({ email, password, userName }) {
    console.log("registro con:", email, password, userName);
  }

  function handleSwitchToRegister() {
    setAuthMode("register");
  }

  function handleSwitchToLogin() {
    setAuthMode("login");
  }

  return (
    <div className="page">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
      />

      <Routes>
        <Route path="/" element={<Main />} />
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