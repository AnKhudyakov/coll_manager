import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import UserController from "./controllers/UserController.js";
import { validateBlocked } from "../../middleware/validateMiddleware.js";

const router = Router();

router.get("/users", authMiddleware, validateBlocked, UserController.getUsers);

router.delete(
  `/users/:id`,
  authMiddleware,
  validateBlocked,
  UserController.removeUser
);

router.patch(
  `/users/block/:id`,
  authMiddleware,
  validateBlocked,
  UserController.blockUser
);

router.patch(
  `/users/unblock/:id`,
  authMiddleware,
  validateBlocked,
  UserController.unblockUser
);

export default router;
