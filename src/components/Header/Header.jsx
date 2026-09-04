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
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
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