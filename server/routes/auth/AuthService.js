import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }
  async createUser(user, password) {
    const newUser = new User({
      user_name: user.user_name,
      email: user.email,
      password,
      admin: false,
      blocked: false,
    });
    await newUser.save();
  }
  async validateUser(passwordBD, password) {
    return bcrypt.compareSync(passwordBD, password);
  }
  createToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  }
}

export default new AuthService();
