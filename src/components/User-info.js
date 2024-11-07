export default class User {
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

  setUserInfo(UserData) {
    this._name.textContent = UserData.title;
    this._job.textContent = UserData.description;
  }
}
