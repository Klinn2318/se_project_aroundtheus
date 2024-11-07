import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/Popup-with-form.js";
import PopupWithImage from "../components/Popup-with-image.js";
import User from "../components/User-info.js";
import Section from "../components/Section.js";
import "./index.css";

import {
  initialCards,
  profileTitle,
  profileDescription,
  profileEditButton,
  cardAddBtn,
  validationConfig,
  addModalForm,
  editModalForm,
} from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                              CLASS INSTANCES                               */
/* -------------------------------------------------------------------------- */

const user = new User({
  name: profileTitle,
  job: profileDescription,
});

const editProfilePopup = new PopupWithForm({
  popupSelector: "edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm({
  popupSelector: "add-modal",
  handleFormSubmit: handleAddFormSubmit,
});
addCardPopup.setEventListeners();

const previewImagePopup = new PopupWithImage("preview");
previewImagePopup.setEventListeners();

const cardSection = new Section(
  {
    renderer: (item) => renderCard(item),
  },
  "gallery__list"
);

/* -------------------------------------------------------------------------- */
/*                               FUNCTIONS                                    */
/* -------------------------------------------------------------------------- */
function getImageModal(imageData) {
  previewImagePopup.open({ link: imageData.src, name: imageData.alt });
}

function handleProfileEditSubmit(inputData) {
  user.setUserInfo({
    title: inputData.title,
    description: inputData.description,
  });
}

function handleAddFormSubmit(inputValues) {
  cardSection.addItem(
    createCard({ name: inputValues.name, link: inputValues.img })
  );
  addCardPopup.close();
  addFormValidator.resetValidation();
}

function createCard(data) {
  const card = new Card(data, "#js-card-template", getImageModal);
  return card.getCard();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

/* -------------------------------------------------------------------------- */
/*                                 EVENT LISTENERS                            */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  const userInfo = user.getUserInfo();
  editProfilePopup.open();
  editModalForm.elements.title.value = userInfo.title;
  editModalForm.elements.description.value = userInfo.description;
  editFormValidator.resetValidation();
});

cardAddBtn.addEventListener("click", () => {
  addCardPopup.open();
  addFormValidator.resetValidation();
});

/* ------------------------ INITIAL CARDS ------------------------ */
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

/* -------------------------------------------------------------------------- */
/*                           INSTANCES FORMVALIDATOR                          */
/* -------------------------------------------------------------------------- */

const addFormValidator = new FormValidator(validationConfig, addModalForm);
const editFormValidator = new FormValidator(validationConfig, editModalForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
