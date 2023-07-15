import AuthService from "../routes/auth/AuthService.js";

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
    const accessToken = req.headers.authorization.split(" ")[1];
    const decoded = AuthService.validateAccessToken(accessToken);
    if (!decoded) {
      return res.status(401).json({ message: "User unauthenticated" });
    }
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: "User unauthenticated" });
  }
};
