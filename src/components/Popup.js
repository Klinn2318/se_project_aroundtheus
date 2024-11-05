import { ESC_KEYCODE } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    evt.preventDefault();

    if (evt.which === ESC_KEYCODE) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("click", (evt) => {
      if (
        evt.target.classList.contains("modal") ||
        evt.target.classList.contains("modal_opened")
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._popupElement.addEventListener("click", handleClose);
    document.addEventListener("keydown", handleClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement.removeEventListener("click", handleClose);
    document.removeEventListener("keydown", handleClose);
  }
}

export default Popup;
