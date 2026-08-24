import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header.jsx";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  function handleLoginClick() {
    // por ahora solo lo dejamos listo, la lógica real de abrir el modal la conectamos después
    console.log("abrir modal de login");
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserName("");
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
        <Route path="/" element={<p>Página principal (aquí irá Main)</p>} />
        <Route
          path="/saved-news"
          element={<p>Artículos guardados (aquí irá SavedNews)</p>}
        />
      </Routes>
    </div>
  );
}

export default App;