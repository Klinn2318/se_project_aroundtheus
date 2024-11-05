export const ESC_KEYCODE = 27;

/* ------------------------------ INITIAL CARDS ----------------------------- */
export const initialCards = [
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

/* ------------------------------ DOM CONSTANTS ----------------------------- */
export const editModal = document.querySelector(".edit-modal");
export const addModal = document.querySelector(".add-modal");
export const imageModal = document.querySelector(".preview");
export const profile = document.querySelector(".profile");
export const page = document.querySelector(".page__container");
export const galleryList = document.querySelector("#js-gallery-list");
export const modalContainers = document.querySelectorAll(
  ".modal__container-js"
);

/* ---------------------------- BUTTONS AND OTHERS --------------------------- */
export const profileTitle = profile.querySelector(".profile__title");
export const profileDescription = profile.querySelector(
  ".profile__description"
);
export const profileEditButton = profile.querySelector(
  ".js-profile-edit-button"
);
export const cardAddBtn = profile.querySelector("#js-profile-add-button");
export const closeBtns = document.querySelectorAll(".modal__close-button");

/* -------------------------------- TEMPLATE -------------------------------- */
export const templateCard = "#js-card-template";

/* -------------------------------------------------------------------------- */
/*                                    FORMS                                   */
/* -------------------------------------------------------------------------- */
export const addModalForm = addModal.querySelector("#add-modal-form");
export const editModalForm = editModal.querySelector("#edit-modal-form");
export const addInputTitle = addModal.querySelector("#input-title");
export const editInputName = editModal.querySelector("#input-name");
export const addInputImg = addModal.querySelector("#input-img");
export const editInputDescription =
  editModal.querySelector("#input-description");
export const imagePic = imageModal.querySelector(".preview__picture");
export const imageName = imageModal.querySelector(".preview__name");

/* -------------------------------------------------------------------------- */
/*                              VALIDATION CONFIG                             */
/* -------------------------------------------------------------------------- */
export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__save-button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "modal__error_visible",
};
