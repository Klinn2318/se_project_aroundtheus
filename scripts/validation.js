const showInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorMessage = inputElement.validationMessage;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const hasInvalidInput = (inputElements) => {
  return inputElements.every((inputElement) => inputElement.validity.valid);
};

const toggleButtonState = (
  inputElements,
  submitButton,
  { inactiveButtonClass }
) => {
  const isFormValid = hasInvalidInput(inputElements);

  if (isFormValid) {
    submitButton.disabled = false;
    submitButton.classList.remove(inactiveButtonClass);
  } else {
    submitButton.disabled = true;
    submitButton.classList.add(inactiveButtonClass);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const { inputSelector, submitButtonSelector } = validationConfig;
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputElements, submitButton, validationConfig);

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputElements, submitButton, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formElements = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    setEventListeners(formElement, validationConfig);
  });
};

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(validationConfig);
