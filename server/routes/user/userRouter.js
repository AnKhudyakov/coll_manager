import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import UserController from "./controllers/UserController.js";
import { validateBlocked } from "../../middleware/validateMiddleware.js";

const router = Router();

router.get("/", authMiddleware, validateBlocked, UserController.getUsers);

router.get(
  `/:id`,
  authMiddleware,
  validateBlocked,
  UserController.getUser
);

router.delete(
  `/:id`,
  authMiddleware,
  validateBlocked,
  UserController.removeUser
);

router.patch(
  `/block/:id`,
  authMiddleware,
  validateBlocked,
  UserController.blockUser
);

router.patch(
  `/unblock/:id`,
  authMiddleware,
  validateBlocked,
  UserController.unblockUser
);

export default router;
