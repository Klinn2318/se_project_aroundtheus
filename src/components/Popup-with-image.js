import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector(".preview__name").textContent = name;
    const image = this._popupElement.querySelector(".preview__picture");
    image.src = link;
    image.alt = `${name}`;
    super.open();
  }
}

export default PopupWithImage;
