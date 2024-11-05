import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import {
  initialCards,
  editModal,
  addModal,
  imageModal,
  profile,
  page,
  galleryList,
  modalContainers,
  profileTitle,
  profileDescription,
  profileEditButton,
  cardAddBtn,
  closeBtns,
  templateCard,
  addModalForm,
  editModalForm,
  addInputTitle,
  editInputName,
  addInputImg,
  editInputDescription,
  imagePic,
  imageName,
  validationConfig,
} from "../utils/constants.js";

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

const addFormValidator = new FormValidator(validationConfig, addModalForm);
const editFormValidator = new FormValidator(validationConfig, editModalForm);

addFormValidator.enableValidation();
editFormValidator.enableValidation();
