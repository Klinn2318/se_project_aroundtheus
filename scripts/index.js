const initialCards = [
  {
    name: "Yosemite Valley",
    link: new URL(
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    ),
  },
  {
    name: "Lake Louise",
    link: new URL(
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"
    ),
  },
  {
    name: "Bald Mountains",
    link: new URL(
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"
    ),
  },
  {
    name: "Latemar",
    link: new URL(
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"
    ),
  },
  {
    name: "Vanoise National Park",
    link: new URL(
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"
    ),
  },
  {
    name: "Lago di Braies",
    link: new URL(
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"
    ),
  },
];

const profileEditButton = document.querySelector(".js-profile-edit-button");
const modalCloseButton = document.querySelector(".js-modal-close-button");
const modal = document.querySelector(".js-modal");

profileEditButton.addEventListener("click", () => {
  return modal.classList.add("modal__opened");
});

modalCloseButton.addEventListener("click", () => {
  return modal.classList.remove("modal__opened");
});
