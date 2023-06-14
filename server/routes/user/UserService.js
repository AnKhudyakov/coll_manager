import User from "../../models/User.js";

class UserService {
  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
  async getUserById(id) {
    return await User.findOne({ _id: id });
  }
  async getAllUsers() {
    return await User.find({}).select({ password: 0 });
  }
  async removeUser(id) {
    const user = await User.findOne({ _id: id }).select({ password: 0 });
    user.deleteOne({ id: user.id });
    return user;
  }
}

export default new UserService();
