import { useState } from "react";
import "../../utils/AuthForm.css";

function RegisterForm({ onRegister, onSwitchToLogin, errorMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    userName.trim() !== "" &&
    emailRegex.test(email);

  function handleEmailChange(evt) {
    const value = evt.target.value;
    setEmail(value);

    if (value.trim() === "") {
      setEmailError("");
    } else if (!emailRegex.test(value)) {
      setEmailError("Dirección de correo electrónico no válida");
    } else {
      setEmailError("");
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister({ email, password, userName });
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <label className="auth-form__label">
        Correo electrónico
        <input
          type="email"
          className="auth-form__input"
          placeholder="Introduce tu correo electrónico"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {emailError && <span className="auth-form__error">{emailError}</span>}
      </label>

      <label className="auth-form__label">
        Contraseña
        <input
          type="password"
          className="auth-form__input"
          placeholder="Introduce tu contraseña"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          required
        />
      </label>

      <label className="auth-form__label">
        Nombre de usuario
        <input
          type="text"
          className="auth-form__input"
          placeholder="Introduce tu nombre de usuario"
          value={userName}
          onChange={(evt) => setUserName(evt.target.value)}
          required
        />
      </label>

      {errorMessage && (
        <p className="auth-form__error auth-form__error_general">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        className="auth-form__submit-btn"
        disabled={!isFormValid}
      >
        Inscribirse
      </button>

      <p className="auth-form__switch-text">
        o{" "}
        <button
          type="button"
          className="auth-form__switch-btn"
          onClick={onSwitchToLogin}
        >
          Iniciar sesión
        </button>
      </p>
    </form>
  );
}

export default RegisterForm;