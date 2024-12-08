// import { token } from "../utils/constants.js";

// export default class Api {
//   constructor({ baseUrl, headers }) {
//     this._baseUrl = baseUrl;
//     this._headers = headers;
//   }

//   getInitialCards() {
//     return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
//       headers: {
//         authorization: token,
//       },
//     }).then((res) => {
//       if (res.ok) {
//         return res.json();
//       }
//       return Promise.reject(`Error: ${res.status}`);
//     });
//   }
// }

export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Helper method to handle responses
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // Helper method to handle fetch errors
  _handleError(err) {
    console.error(`Fetch error: ${err}`);
  }

  // GET /cards - Get all cards
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // GET /users/me - Get user info
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // PATCH /users/me - Update profile info
  updateUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // PATCH /users/me/avatar - Update avatar
  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // POST /cards - Add a card
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // DELETE /cards/:cardId - Delete a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // PUT /cards/:cardId/likes - Like a card
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }

  // DELETE /cards/:cardId/likes - Dislike a card
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._handleResponse)
      .catch(this._handleError);
  }
}
