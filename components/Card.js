export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._image = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeIcon() {
    this._cardLike.classList.toggle("card__like_actived");
  }

  _handleDeleteIcon() {
    this._cardDeleteBtn.closest(".card").remove();
  }

  _setEventListeners() {
    this._cardLike.addEventListener("click", () => this._handleLikeIcon());
    this._cardDeleteBtn.addEventListener("click", () =>
      this._handleDeleteIcon()
    );
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  getCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLike = this._element.querySelector(".card__like");
    this._cardDeleteBtn = this._element.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
