import jwt from "jsonwebtoken";
import UserService from "../routes/user/UserService.js";

export const authMiddleware = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    return res.status(401).json({ message: "Error in authorization format" });
  }
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserService.getUserByEmail(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User unauthenticated" });
    }
    req.email = decoded.id;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "User unauthenticated" });
  }
};
