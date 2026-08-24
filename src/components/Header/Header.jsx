import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, userName, onLoginClick, onLogout }) {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className={`header ${isMainPage ? "header_theme_dark" : "header_theme_light"}`}>
      <div className="header__container">
        <Link to="/" className="header__logo" onClick={closeMenu}>
          NewsExplorer
        </Link>

        <button
          type="button"
          className="header__menu-btn"
          onClick={toggleMenu}
          aria-label="Abrir menú"
        >
          ☰
        </button>

        <nav className={`header__nav ${isMenuOpen ? "header__nav_open" : ""}`}>
          <Link
            to="/"
            className={`header__link ${isMainPage ? "header__link_active" : ""}`}
            onClick={closeMenu}
          >
            Inicio
          </Link>

          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`header__link ${!isMainPage ? "header__link_active" : ""}`}
              onClick={closeMenu}
            >
              Artículos guardados
            </Link>
          )}

          {isLoggedIn ? (
            <div className="header__user">
              <span className="header__username">{userName}</span>
              <button
                type="button"
                className="header__logout-btn"
                onClick={() => {
                  onLogout();
                  closeMenu();
                }}
                aria-label="Cerrar sesión"
              >
                ⏻
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="header__login-btn"
              onClick={() => {
                onLoginClick();
                closeMenu();
              }}
            >
              Iniciar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;