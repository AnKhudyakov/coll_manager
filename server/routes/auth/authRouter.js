import Router from "express";
import RegController from "./controllers/RegController.js";
import LoginController from "./controllers/LoginController.js";
import {
  validateMiddlewareLogin,
  validateMiddlewareReg,
} from "../../middleware/validateMiddleware.js";

const router = Router();

router.post("/register", validateMiddlewareReg, RegController.regUser);

router.post("/login", validateMiddlewareLogin, LoginController.loginUser);

export default router;