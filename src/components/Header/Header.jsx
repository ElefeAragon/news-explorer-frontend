import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, userName, onLoginClick, onLogout }) {
  const { pathname } = useLocation();
  const isMainPage = pathname === "/";

  return (
    <header className={`header ${isMainPage ? "header_theme_dark" : "header_theme_light"}`}>
      <div className="header__container">
        <Link to="/" className="header__logo">
          NewsExplorer
        </Link>

        <nav className="header__nav">
          <Link
            to="/"
            className={`header__link ${isMainPage ? "header__link_active" : ""}`}
          >
            Inicio
          </Link>

          {isLoggedIn && (
            <Link
              to="/saved-news"
              className={`header__link ${!isMainPage ? "header__link_active" : ""}`}
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
                onClick={onLogout}
                aria-label="Cerrar sesión"
              >
                ⏻
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="header__login-btn"
              onClick={onLoginClick}
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