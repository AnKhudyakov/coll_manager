import Router from "express";
import AuthController from "./controllers/AuthController.js";
import {
  validateMiddlewareLogin,
  validateMiddlewareReg,
  validateBlocked,
} from "../../middleware/validateMiddleware.js";
import { refreshMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/register", validateMiddlewareReg, AuthController.regUser);

router.post(
  "/login",
  validateMiddlewareLogin,
  validateBlocked,
  AuthController.loginUser
);
router.post("/logout", refreshMiddleware, AuthController.logoutUser);
router.get("/activate/:link", validateMiddlewareReg, AuthController.activate);
router.get("/refresh", refreshMiddleware, AuthController.refreshToken);

export default router;
