export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;
  }

  _showInputError(inputElement) {
    const errorMessage = inputElement.validationMessage;
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent = errorMessage;
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _toggleSubmitButton() {
    this._isFormValid = this._hasInvalidInput();

    if (this._isFormValid) {
      this._submitButton.disabled = false;
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
    } else {
      this.disableSubmitButton();
    }
  }

  _setEventListeners() {
    this._inputSelector = this._config.inputSelector;
    this._submitButtonSelector = this._config.submitButtonSelector;
    this._inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);

    this._toggleSubmitButton();

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButton();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }

  resetValidation() {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._form.reset();
    this._toggleSubmitButton();
  }

  disableSubmitButton() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._config.inactiveButtonClass);
  }
}
