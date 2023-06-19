import UserService from "../../user/UserService.js";
import AuthService from "../AuthService.js";

class LoginController {
  async loginUser(req, res) {
    try {
      const user = await UserService.getUserByEmail(req.body.email);
      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      const validate = AuthService.validateUser(
        user.password,
        req.body.password
      );
      if (validate) {
        const token = AuthService.createToken(user.email);
        return res.status(200).json({
          user: {
            _id: user.id,
            username: user.username,
            email: user.email,
            admin: false,
            blocked: false,
          },
          token,
        });
      }
      return res.status(400).json({ message: "Invalid email or password" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new LoginController();
