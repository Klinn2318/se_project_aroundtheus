export default class UserInfo {
  constructor({ name, job, avatar }) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      title: this._name.textContent,
      description: this._job.textContent,
    };
  }

  setUserInfo(userData) {
    this._name.textContent = userData.title;
    this._job.textContent = userData.description;
  }

  updateAvatar(img) {
    if (img.avatar) {
      this._avatar.src = img.avatar;
    }
  }
}
