import { useState } from "react";
import "../../utils/AuthForm.css";


function LoginForm({ onLogin, onSwitchToRegister, errorMessage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({ email, password });
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
          onChange={(evt) => setEmail(evt.target.value)}
          required
        />
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
        Iniciar sesión
      </button>

      <p className="auth-form__switch-text">
        o{" "}
        <button
          type="button"
          className="auth-form__switch-btn"
          onClick={onSwitchToRegister}
        >
          Inscribirse
        </button>
      </p>
    </form>
  );
}

export default LoginForm;