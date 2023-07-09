import User from "../../models/User.js";
import Collection from "../../models/Collection.js";

class UserService {
  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
  async createUser(user, password) {
    const newUser = new User({
      username: user.username,
      email: user.email,
      password,
      admin: user.admin?user.admin:false,
      blocked: false,
    });
    return await newUser.save();
  }
  async getUserById(id) {
    return await User.findOne({ _id: id }).select({ password: 0 });
  }
  async getAllUsers() {
    return await User.find({}).select({ password: 0 });
  }
  async updateUser(req) {
    const { id } = req.params;
    await User.findOneAndUpdate({ _id: id }, { ...req.body }, { new: true });
  }
  async removeUser(id) {
    const user = await User.findOne({ _id: id }).select({ password: 0 });
    user.deleteOne({ id: user.id });
    return user;
  }
}

export default new UserService();
