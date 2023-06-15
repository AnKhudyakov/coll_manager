import { body } from "express-validator";

export const validateMiddlewareReg = [
  body("username", "Name must be from 2 to 10 chars").isLength({
    min: 1,
    max: 15,
  }),
  body("email", "Incorrect email").isEmail(),
  body("password", "Password must be from 5 to 10 chars").isLength({
    min: 5,
    max: 10,
  }),
];

export const validateMiddlewareLogin = [
  body("email", "Incorrect email").isEmail(),
  body("password", "Password must be from 5 to 10 chars").isLength({
    min: 5,
    max: 10,
  }),
];

export const validateBlocked = async (req, res, next) => {
  try {
    const user = await UserService.getUserByEmail(req.email);
    if (user.blocked) {
      next();
    } else {
      return res.status(405).json({ message: "User was blocked" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server error" });
  }
};
