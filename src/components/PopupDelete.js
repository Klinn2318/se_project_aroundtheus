import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._deleteCardModal = this._popupElement;
    this._formElement = this._deleteCardModal.querySelector(".modal__form");
  }

  setSubmitFunction(submitFunction) {
    this._submitFunction = submitFunction;
  }

  setEventListeners() {
    this._formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this._submitFunction) {
        this._submitFunction();
      }
    });
    super.setEventListeners();
  }
}
