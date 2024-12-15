export default class Card {
  constructor(
    { name, link, id, isLiked },
    cardSelector,
    handleImageClick,
    rmCardModal,
    handleLikeClick
  ) {
    this._name = name;
    this._image = link;
    this._id = id; // CHECK IN CASE NOT WORKING, CHANGE ID =_ID
    this._isLiked = isLiked;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._rmCardModal = rmCardModal;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardDeleteBtn.addEventListener("click", () =>
      this._rmCardModal(this._id, this)
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

  handleUpdateLikeCard(Liked) {
    if (!Liked) {
      this._cardLike.classList.remove("card__like_actived");
    } else {
      this._cardLike.classList.add("card__like_actived");
    }

    this._isLiked = Liked;
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
    if (this._isLiked) {
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
