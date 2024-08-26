const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
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

// WRAPPERS
const editModal = document.querySelector(".edit-modal");
const addModal = document.querySelector(".add-modal");
const imageModal = document.querySelector(".preview");
const profile = document.querySelector(".profile");
const page = document.querySelector(".page__container");
const galleryList = document.querySelector("#js-gallery-list");

//BUTTONS AND DOM NODES
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".js-profile-edit-button");
const cardAddBtn = profile.querySelector("#js-profile-add-button");
const closeBtns = document.querySelectorAll(".modal__close-button");

//TEMPLATES
const templateGallery = document.querySelector("#js-card-template").content;

//FORM DATA
const addModalForm = addModal.querySelector("#add-modal-form");
const editModalForm = editModal.querySelector("#edit-modal-form");
const addInputTitle = addModal.querySelector("#input-title");
const editInputName = editModal.querySelector("#input-name");
const addInputImg = addModal.querySelector("#input-img");
const editInputDescription = editModal.querySelector("#input-description");
const imagePic = imageModal.querySelector(".preview__picture");
const imageName = imageModal.querySelector(".preview__name");

// FUNCTIONS
function openModal(element) {
  element.classList.add("modal_opened");
}

function closeModal(element) {
  element.classList.remove("modal_opened");
}

function deleteElement(element, elementClass) {
  return element.closest(elementClass).remove();
}

function getImageModal(imageData) {
  imagePic.src = imageData.src;
  imagePic.alt = imageData.alt;
  imageName.textContent = imageData.alt;
  openModal(imageModal);
}

function getCardElement(cardData) {
  const cardElement = templateGallery.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardLike.addEventListener("click", () =>
    cardLike.classList.toggle("card__like_actived")
  );
  cardDeleteBtn.addEventListener("click", () =>
    deleteElement(cardDeleteBtn, ".card")
  );
  cardImage.addEventListener("click", () => getImageModal(cardImage));
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  return cardElement;
}

// EVENTS

//edit-modal-events
profileEditButton.addEventListener("click", () => {
  editInputDescription.value = profileDescription.textContent;
  editInputName.value = profileTitle.textContent;
  return openModal(editModal);
});

editModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = editInputName.value;
  profileDescription.textContent = editInputDescription.value;
  closeModal(editModal);
});

// add new card events
cardAddBtn.addEventListener("click", () => openModal(addModal));

addModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const card = {
    name: "",
    link: "",
  };
  card.name = addInputTitle.value;
  card.link = addInputImg.value;
  galleryList.prepend(getCardElement(card));
  addModalForm.reset();
  closeModal(addModal);
});

//GENERATING INITIAL CARDS
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryList.append(cardElement);
});

// UNIVERSAL CLOSE BTNS
closeBtns.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});
