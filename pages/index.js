import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  WRAPPERS                                  */
/* -------------------------------------------------------------------------- */
const editModal = document.querySelector(".edit-modal");
const addModal = document.querySelector(".add-modal");
const imageModal = document.querySelector(".preview");
const profile = document.querySelector(".profile");
const page = document.querySelector(".page__container");
const galleryList = document.querySelector("#js-gallery-list");
const modalContainers = document.querySelectorAll(".modal__container-js");

/* -------------------------------------------------------------------------- */
/*                            BUTTONS AND DOM NODES                           */
/* -------------------------------------------------------------------------- */
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".js-profile-edit-button");
const cardAddBtn = profile.querySelector("#js-profile-add-button");
const closeBtns = document.querySelectorAll(".modal__close-button");

/* -------------------------------------------------------------------------- */
/*                                  TEMPLATES                                 */
/* -------------------------------------------------------------------------- */
const templateCard = "#js-card-template";

/* -------------------------------------------------------------------------- */
/*                                  FORM DATA                                 */
/* -------------------------------------------------------------------------- */
const addModalForm = addModal.querySelector("#add-modal-form");
const editModalForm = editModal.querySelector("#edit-modal-form");
const addInputTitle = addModal.querySelector("#input-title");
const editInputName = editModal.querySelector("#input-name");
const addInputImg = addModal.querySelector("#input-img");
const editInputDescription = editModal.querySelector("#input-description");
const imagePic = imageModal.querySelector(".preview__picture");
const imageName = imageModal.querySelector(".preview__name");

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */
function handleClose(event) {
  // Close modal if clicking outside the modalContainer or pressing "Escape"
  if (
    event.type === "click" ||
    (event.type === "keydown" && event.key === "Escape")
  ) {
    const openedModal = document.querySelector(".modal_opened");
    closeModal(openedModal);
  }
}

function openModal(element) {
  element.classList.add("modal_opened");
  element.addEventListener("click", handleClose);
  document.addEventListener("keydown", handleClose);
}

function closeModal(element) {
  element.classList.remove("modal_opened");
  element.removeEventListener("click", handleClose);
  document.removeEventListener("keydown", handleClose);
}

function getImageModal(imageData) {
  imagePic.src = imageData.src;
  imagePic.alt = imageData.alt;
  imageName.textContent = imageData.alt;
  openModal(imageModal);
}

function createCard(item) {
  const cardElement = new Card(item, templateCard, getImageModal);
  return cardElement.getCard();
}

const renderCard = (cardData) => {
  const cardElement = createCard(cardData);
  galleryList.prepend(cardElement);
};

/* -------------------------------------------------------------------------- */
/*                                   EVENTS                                   */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Edit-modal-events --------------------------- */
profileEditButton.addEventListener("click", () => {
  editInputDescription.value = profileDescription.textContent;
  editInputName.value = profileTitle.textContent;
  editFormValidator.resetValidation();
  return openModal(editModal);
});

editModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = editInputName.value;
  profileDescription.textContent = editInputDescription.value;
  editFormValidator.disableSubmitButton();
  closeModal(editModal);
});

/* --------------------------- Add New Card Events -------------------------- */
cardAddBtn.addEventListener("click", () => openModal(addModal));

addModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = {
    name: "",
    link: "",
  };
  card.name = addInputTitle.value;
  card.link = addInputImg.value;
  renderCard(card);
  addModalForm.reset();
  addFormValidator.disableSubmitButton();
  closeModal(addModal);
});

/* ------------------------ GENERATING INITIAL CARDS ------------------------ */
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

/* -------------------------------------------------------------------------- */
/*                                Close Methods                               */
/* -------------------------------------------------------------------------- */

/* -------------------------- UNIVERSAL CLOSE BTNS -------------------------- */
const addCloseEvent = (elements) => {
  elements.forEach((el) => {
    const popup = el.closest(".modal");
    el.addEventListener("click", () => closeModal(popup));
  });
};

addCloseEvent(closeBtns);

modalContainers.forEach((el) => {
  el.addEventListener("click", (e) => e.stopPropagation());
});

/* -------------------------------------------------------------------------- */
/*                            For Validation Class                            */
/* -------------------------------------------------------------------------- */

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
};

const addFormValidator = new FormValidator(validationConfig, addModalForm);
const editFormValidator = new FormValidator(validationConfig, editModalForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
