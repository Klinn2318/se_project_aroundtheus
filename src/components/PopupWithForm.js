import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._formBtn = this._popupElement.querySelector(".form__save-button");
  }

  _getInputValues() {
    const inputList = Array.from(
      this._popupForm.querySelectorAll(".form__input")
    );
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._formBtn);
      // this._popupForm.reset();
    });
  }

  // close() {
  //   super.close();
  //   this._popupForm.reset();
  // }
}
