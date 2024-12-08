import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";
import Api from "../components/Api.js";

import {
  initialCards,
  profileTitle,
  profileDescription,
  profileEditButton,
  cardAddBtn,
  validationConfig,
  addModalForm,
  editModalForm,
  token,
} from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                              CLASS INSTANCES                               */
/* -------------------------------------------------------------------------- */

const user = new UserInfo({
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
  api
    .updateUserInfo({ name: inputData.title, about: inputData.description })
    .then((updatedData) => {
      user.setUserInfo({
        title: updatedData.name,
        description: updatedData.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => editFormValidator.disableSubmitButton());
}

function handleAddFormSubmit(inputValues) {
  api
    .addCard({ name: inputValues.name, link: inputValues.img })
    .then((newCard) => {
      cardSection.addItem(createCard(newCard));
      addCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => addFormValidator.disableSubmitButton());
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
});

/* -------------------------------------------------------------------------- */
/*                                  PROJECT 9                                 */
/* -------------------------------------------------------------------------- */

/* -------------------------- Loading Initial Cards ------------------------- */
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    // Set user info
    user.setUserInfo({ title: userData.name, description: userData.about });

    // Render initial cards
    cardSection.renderItems(cards);
  })
  .catch((err) => console.error(err));

/* -------------------------------------------------------------------------- */
/*                           INSTANCES FORMVALIDATOR                          */
/* -------------------------------------------------------------------------- */

const addFormValidator = new FormValidator(validationConfig, addModalForm);
const editFormValidator = new FormValidator(validationConfig, editModalForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
