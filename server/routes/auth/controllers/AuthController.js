import { validationResult } from "express-validator";
import AuthService from "../AuthService.js";
import UserService from "../../user/UserService.js";
import { v4 as uuidv4 } from "uuid";
import UserDto from "../../../dtos/user-dto.js";
import MailService from "../MailService.js";

class AuthController {
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
        const hashPassword = AuthService.hashPassword(req.body.password);
        const activationLink = uuidv4();
        const user = await UserService.createUser(
          req.body,
          hashPassword,
          activationLink
        );
        await MailService.sendActivationMail(
          req.body.email,
          `${process.env.API_URL}/auth/activate/${activationLink}`
        );
        return res.status(200).json({ message: "Success registration!" });
      }
      return res
        .status(400)
        .json({ message: "Incorrect request", errors: result });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async loginUser(req, res) {
    try {
      const isExist = await UserService.getUserByEmail(req.body.email);
      if (isExist) {
        const user = req.user;
        const validate = await AuthService.validateUser(
          user.password,
          req.body.password
        );
        if (validate) {
          const userDto = new UserDto(user);
          const tokens = AuthService.createToken({ ...userDto });
          await AuthService.saveToken(userDto._id, tokens.refreshToken);
          return res.status(200).json({ ...tokens, user: userDto });
        }
        return res.status(400).json({ message: "Invalid email or password" });
      }
      return res.status(400).json({ message: "User doesn't exist" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async logoutUser(req, res) {
    try {
      const token = await AuthService.logout(req.user._id);
      return res.status(200).json(token);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async activate(req, res) {
    try {
      const user = await UserService.getUserByLink(req.params.link);
      if (!user) {
        throw new Error("Invalid activation link");
      }
      user.isActivated = true;
      await user.save();
      return res.redirect(`${process.env.CLIENT_URL}/login`);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
  async refreshToken(req, res) {
    try {
      const userData = req.user;
      const user = await UserService.getUserById(userData._id);
      const userDto = new UserDto(user);
      const tokens = AuthService.createToken({ ...userDto });
      await AuthService.saveToken(userDto._id, tokens.refreshToken);
      return res.status(200).json({ ...tokens, user: userDto });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Server error" });
    }
  }
}

export default new AuthController();
