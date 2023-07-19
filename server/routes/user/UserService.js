import User from "../../models/User.js";

class UserService {
  async getUserByEmail(email) {
    return await User.findOne({ email });
  }
  async createUser(user, password, activationLink) {
    const newUser = new User({
      ...user,
      password,
      admin: user.admin ? user.admin : false,
      blocked: false,
      activationLink,
    });
    return await newUser.save();
  }
  async getUserById(id) {
    return await User.findOne({ _id: id }).select({ password: 0 });
  }
  async getUserByLink(activationLink) {
    return await User.findOne({ activationLink }).select({ password: 0 });
  }
  async getAllUsers(query) {
    const { page, limit, sort_by, sort_order } = query;
    const totalCount = await User.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);
    const offset = (page - 1) * limit;
    const users = await User.find({})
      .skip(offset)
      .limit(limit)
      .sort({ [sort_by]: sort_order })
      .select({ password: 0 });
    return { users, totalPages };
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
