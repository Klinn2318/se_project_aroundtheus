export const ESC_KEYCODE = 27;
export const token = "798db2b9-6b31-4f94-9460-e0bf9a1726e3";

/* ------------------------------ DOM CONSTANTS ----------------------------- */
export const editModal = document.querySelector(".edit-modal");
export const addModal = document.querySelector(".add-modal");
export const avatarModal = document.querySelector(".avatar-modal");
export const deleteModal = document.querySelector(".delete-modal");
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
export const avatar = profile.querySelector(".profile__avatar-img");
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
export const avatarModalForm = avatarModal.querySelector("#avatar-modal-form");
export const deleteModalForm = deleteModal.querySelector("#delete-modal-form");
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
