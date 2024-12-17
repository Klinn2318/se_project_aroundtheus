import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import "./index.css";
import Api from "../components/Api.js";

import {
  profileTitle,
  profileDescription,
  profileEditButton,
  cardAddBtn,
  validationConfig,
  addModalForm,
  editModalForm,
  avatarModalForm,
  deleteModalForm,
  token,
  avatar,
} from "../utils/constants.js";

/* -------------------------------------------------------------------------- */
/*                              CLASS INSTANCES                               */
/* -------------------------------------------------------------------------- */

const user = new UserInfo({
  name: profileTitle,
  job: profileDescription,
  avatar: avatar,
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

const avatarPopup = new PopupWithForm({
  popupSelector: "avatar-modal",
  handleFormSubmit: handleAvatarFormSubmit,
});
avatarPopup.setEventListeners();

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

function handleProfileEditSubmit(inputData, saveBtn) {
  renderSaving(true, saveBtn);
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
    .then(editFormValidator.disableSubmitButton())
    .finally(() => {
      renderSaving(false, saveBtn);
    });
}

function handleAddFormSubmit(inputValues, saveBtn) {
  renderSaving(true, saveBtn);
  api
    .addCard({ name: inputValues.name, link: inputValues.img })
    .then((newCard) => {
      cardSection.addItem(createCard(newCard));
      addCardPopup.close();
      addModalForm.reset();
    })
    .catch((err) => console.error(err))
    .then(addFormValidator.disableSubmitButton())
    .finally(() => {
      renderSaving(false, saveBtn);
    });
}

function handleAvatarFormSubmit(inputValues, saveButton) {
  renderSaving(true, saveButton);
  api
    .updateUserAvatar({ avatar: inputValues.avatar })
    .then((data) => {
      user.updateAvatar({ avatar: data.avatar });
      avatarPopup.close();
      avatarModalForm.reset();
    })
    .catch((err) => {
      console.error("Unable to update avatar", err);
      alert("Avatar Update Failed, please try again");
    })
    .then(avatarFormValidator.disableSubmitButton())
    .finally(() => {
      renderSaving(false, saveButton);
    });
}

function createCard(data) {
  const card = new Card(
    data,
    "#js-card-template",
    getImageModal,
    (cardId, card) => {
      deleteCardModal(cardId, card);
    },
    (card) => {
      handleCardLike(card);
    }
  );
  return card.getCard();
}

function deleteCardModal(cardId, card) {
  deleteModConfirm.setSubmitFunction(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card.handleDeleteCard();
        deleteModConfirm.close();
      })
      .catch((err) =>
        console.error("Error when trying to delete the card: ", err)
      );
  });
  deleteModConfirm.open();
}

function handleCardLike(card) {
  const likeAction = card.isLiked
    ? api.dislikeCard(card.id)
    : api.likeCard(card.id);

  likeAction
    .then((data) => {
      card.handleUpdateLikeCard(data.isLiked);
    })
    .catch((err) =>
      console.error(
        card.isLiked
          ? "Error while removing like from card: "
          : "Error while adding the card: ",
        err
      )
    );
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardSection.addItem(cardElement);
}

function renderSaving(isLoading, buttonElement, defaultText = "Save") {
  if (isLoading) {
    buttonElement.textContent = "Saving...";
  } else {
    buttonElement.textContent = defaultText;
  }
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

/* ------------------- Popup Confirmation Delete Settings ------------------- */

const deleteModConfirm = new PopupDelete("delete-modal");
deleteModConfirm.setEventListeners();

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
    user.setUserInfo({
      title: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });
    user.updateAvatar({ avatar: userData.avatar });

    cards.sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt));
    cardSection.renderItems(cards);
  })
  .catch((err) => {
    console.error(err);
    alert("An error occurred. Please try again later.");
  });

const avatarEditBtn = document.querySelector(".profile__avatar-edit-btn");
avatarEditBtn.addEventListener("click", () => {
  avatarPopup.open();
});

/* -------------------------------------------------------------------------- */
/*                           INSTANCES FORMVALIDATOR                          */
/* -------------------------------------------------------------------------- */

const addFormValidator = new FormValidator(validationConfig, addModalForm);
const editFormValidator = new FormValidator(validationConfig, editModalForm);
const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarModalForm
);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
avatarFormValidator.enableValidation();
