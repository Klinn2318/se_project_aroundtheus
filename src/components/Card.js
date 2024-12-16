export default class Card {
  constructor(
    { name, link, _id, isLiked: _isLiked },
    cardSelector,
    handleImageClick,
    rmCardModal,
    handleLikeClick
  ) {
    this._name = name;
    this._image = link;
    this.id = _id;
    this.isLiked = _isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._rmCardModal = rmCardModal;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardDeleteBtn.addEventListener("click", () =>
      this._rmCardModal(this.id, this)
    );
    this._cardLike.addEventListener("click", () => this._handleLikeClick(this));
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this._cardImage);
    });
  }

  handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  handleUpdateLikeCard(like) {
    if (like) {
      this._cardLike.classList.add("card__like_actived");
    } else {
      this._cardLike.classList.remove("card__like_actived");
    }

    this.isLiked = like;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._cardLike = this._element.querySelector(".card__like");
    if (this.isLiked) {
      this._cardLike.classList.toggle("card__like_actived");
    }
    this._cardDeleteBtn = this._element.querySelector(".card__delete-button");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._image;
    this._cardImage.alt = this._name;
    this._setEventListeners();
    return this._element;
  }
}
