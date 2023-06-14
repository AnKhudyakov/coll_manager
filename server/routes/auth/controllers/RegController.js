import { validationResult } from "express-validator";
import AuthService from "../AuthService.js";
import UserService from "../../user/UserService.js";

class RegController {
  async regUser(req, res) {
    try {
      const result = validationResult(req);
      if (result.isEmpty()) {
        const isExist = await UserService.getUserByEmail(req.body.email);
        if (isExist) {
          return res
            .status(401)
            .json({ message: `User with this email already exists` });
        }
        const hashPassword = AuthService.hashPassword(req.body.password)
        await AuthService.createUser(req.body, hashPassword);
        return res.status(200).json({ message: "User was created" });
      }
      return res
        .status(400)
        .json({ message: "Incorrect request", errors: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new RegController();
