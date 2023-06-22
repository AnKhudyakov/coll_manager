import AuthService from "../AuthService.js";

class LoginController {
  async loginUser(req, res) {
    try {
      const user = req.user;
      const validate = await AuthService.validateUser(
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
            admin: user.admin,
            blocked: user.blocked,
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
