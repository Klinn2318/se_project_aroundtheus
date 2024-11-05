export default class User {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      title: this._profileName.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(UserData) {
    this._profileName.textContent = UserData.title;
    this._jobElement.textContent = UserData.description;
  }
}
