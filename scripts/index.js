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

const editModal = document.querySelector(".edit-modal");
const profile = document.querySelector(".profile");
const page = document.querySelector(".page__container");
const profileTitle = profile.querySelector(".profile__title");
const profileDescription = profile.querySelector(".profile__description");
const profileEditButton = profile.querySelector(".js-profile-edit-button");
const cardAddBtn = profile.querySelector("#js-profile-add-button");
const modalCloseButton = editModal.querySelector(".edit-modal-close-button");
const modalForm = editModal.querySelector("#edit-modal-form");
const inputTitle = editModal.querySelector("#input-title");
const inputDescription = editModal.querySelector("#input-description");
const galleryList = document.querySelector("#js-gallery-list");
const templateGallery = document.querySelector("#js-card-template").content;
const templateImage = document.querySelector("#image-modal").content;

function closePopUp() {
  editModal.classList.remove("modal_opened");
}

profileEditButton.addEventListener("click", () => {
  inputDescription.value = profileDescription.textContent;
  inputTitle.value = profileTitle.textContent;
  return editModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closePopUp);

modalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = inputTitle.value;
  profileDescription.textContent = inputDescription.value;
  closePopUp();
});

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

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  galleryList.append(cardElement);
});
