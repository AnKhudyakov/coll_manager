import { body } from "express-validator";
import UserService from "../routes/user/UserService.js";

export const validateMiddlewareReg = [
  body("username", "Name must be from 2 to 20 chars").isLength({
    min: 1,
    max: 20,
  }),
  body("email", "Incorrect email").isEmail(),
  body("password", "Password must be from 5 to 20 chars").isLength({
    min: 5,
    max: 20,
  }),
];

export const validateMiddlewareLogin = [
  body("email", "Incorrect email").isEmail(),
  body("password", "Password must be from 5 to 20 chars").isLength({
    min: 5,
    max: 20,
  }),
];

export const validateBlocked = async (req, res, next) => {
  try {
    const user = await UserService.getUserByEmail(req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }
    if (!user.blocked) {
      req.user = user;
      next();
    } else {
      return res.status(405).json({ message: "User was blocked" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const validateAdmin = async (req, res, next) => {
  try {
    const user = await UserService.getUserByEmail(req.email);
    if (user.admin) {
      next();
    } else {
      return res.status(403).json({ message: "User doesn't have access" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const validateAuthor = async (req, res, next) => {
  try {
    const user = await UserService.getUserByEmail(req.email);
    if (user.email === req.body.email) {
      next();
    } else {
      return res.status(403).json({ message: "User doesn't have access" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};
