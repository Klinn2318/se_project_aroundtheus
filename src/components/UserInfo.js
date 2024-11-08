export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
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
}
