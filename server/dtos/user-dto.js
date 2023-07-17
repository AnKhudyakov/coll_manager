export default class UserDto {
  email;
  username;
  admin;
  _id;
  isActivated;
  constructor(model) {
    this.email = model.email;
    this.username = model.username;
    this.admin = model.admin;
    this._id = model._id;
    this.isActivated = model.isActivated;
  }
}
