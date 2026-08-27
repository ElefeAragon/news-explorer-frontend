import { useEffect } from "react";
import "./PopupWithForm.css";

function PopupWithForm({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (!isOpen) return;

    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="popup popup_opened" onClick={handleOverlayClick}>
      <div className="popup__container">
        <button type="button" className="popup__close-btn" onClick={onClose} aria-label="Cerrar">
          X
        </button>
        <h2 className="popup__title">{title}</h2>
        {children}
      </div>
    </div>
  );
}

export default PopupWithForm;