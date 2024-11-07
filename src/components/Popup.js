import { ESC_KEYCODE } from "../utils/constants.js";

class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(`.${popupSelector}`);
    this._handleEscUp = this._handleEscUp.bind(this);
  }

  _handleEscUp(evt) {
    evt.preventDefault();

    if (evt.type === "keyup" && evt.which === ESC_KEYCODE) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal__close-button") ||
        evt.target.classList.contains("modal_opened")
      ) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", (evt) => {
      this._handleEscUp(evt);
    });
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", (evt) => {
      this._handleEscUp(evt);
    });
  }
}

export default Popup;
