import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  }
  async validateUser(passwordBD, password) {
    return bcrypt.compareSync(password, passwordBD);
  }
  createToken(id) {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  }
}

export default new AuthService();
