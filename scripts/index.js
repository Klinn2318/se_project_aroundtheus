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
const profile = document.querySelector(".profile");
const page = document.querySelector(".page__container");
const galleryList = document.querySelector("#js-gallery-list");

//BUTTONS AND DOM NODES
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".js-profile-edit-button");
const cardAddBtn = profile.querySelector("#js-profile-add-button");
const addCloseButton = addModal.querySelector(".add-modal-close-button");
const editCloseButton = editModal.querySelector(".edit-modal-close-button");

//TEMPLATES
const templateGallery = document.querySelector("#js-card-template").content;
const templateImage = document.querySelector("#image-modal").content;

//FORM DATA
const addModalForm = addModal.querySelector("#add-modal-form");
const editModalForm = editModal.querySelector("#edit-modal-form");
const addInputTitle = addModal.querySelector("#input-title");
const editInputName = editModal.querySelector("#input-name");
const addInputImg = addModal.querySelector("#input-img");
const editInputDescription = editModal.querySelector("#input-description");

// FUNCTIONS

function toggleClass(element, elementClass) {
  return element.classList.toggle(elementClass);
}

function deleteElement(element, elementClass) {
  return element.closest(elementClass).remove();
}

function getImageModal(imageData) {
  const imageElement = templateImage.cloneNode(true);
  const imageModal = imageElement.querySelector(".image__modal");
  const imagePic = imageElement.querySelector(".image__picture");
  const imageName = imageElement.querySelector(".image__name");
  const imageBtn = imageElement.querySelector(".image__close-btn");

  imagePic.src = imageData.link;
  imagePic.alt = imageData.name;
  imageName.textContent = imageData.name;
  imageBtn.addEventListener("click", () => {
    toggleClass(imageModal, "image__opened");
    setTimeout(() => deleteElement(imageBtn, ".image__modal"), 500);
  });

  setTimeout(() => {
    toggleClass(imageModal, "image__opened");
  }, 10);
  return page.after(imageElement);
}

function getCardElement(cardData) {
  const cardElement = templateGallery.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLike = cardElement.querySelector(".card__like");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-button");

  cardLike.addEventListener("click", () =>
    toggleClass(cardLike, "card__like_actived")
  );
  cardDeleteBtn.addEventListener("click", () =>
    deleteElement(cardDeleteBtn, ".card")
  );
  cardImage.addEventListener("click", () => getImageModal(cardData));
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
  return toggleClass(editModal, "modal_opened");
});

editCloseButton.addEventListener("click", () =>
  toggleClass(editModal, "modal_opened")
);

editModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = editInputName.value;
  profileDescription.textContent = editInputDescription.value;
  toggleClass(editModal, "modal_opened");
});

// add new card events
addCloseButton.addEventListener("click", () => {
  addModalForm.reset();
  toggleClass(addModal, "modal_opened");
});

cardAddBtn.addEventListener("click", () =>
  toggleClass(addModal, "modal_opened")
);

addModalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let card = {
    name: "",
    link: "",
  };
  card.name = addInputTitle.value;
  card.link = addInputImg.value;
  galleryList.prepend(getCardElement(card));
  addModalForm.reset();
  toggleClass(addModal, "modal_opened");
});

//GENERATING INITIAL CARDS

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryList.append(cardElement);
});
