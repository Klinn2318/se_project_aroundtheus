const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const modal = document.querySelector(".js-modal");
const profile = document.querySelector(".profile");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".js-profile-edit-button");
const profileAddButton = profile.querySelector("#js-profile-add-button");
const modalCloseButton = modal.querySelector(".js-modal-close-button");
const modalForm = modal.querySelector("#js-modal-form");
const inputTitle = modal.querySelector("#input-title");
const inputDescription = modal.querySelector("#input-description");
const galleryList = document.querySelector("#js-gallery-list");
const templateGallery =
  document.querySelector("#js-card-template").content.firstElementChild;

function closePopUp() {
  modal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", () => {
  inputDescription.value = profileDescription.textContent;
  inputTitle.value = profileTitle.textContent;
  return modal.classList.add("modal__opened");
});

modalCloseButton.addEventListener("click", closePopUp);

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDescription.textContent = inputDescription.value;
  closePopUp();
});

function getCardElement(cardData) {
  const cardElement = templateGallery.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryList.prepend(cardElement);
});
