import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import UserController from "./controllers/UserController.js";
import { validateAdmin } from "../../middleware/validateMiddleware.js";

const router = Router();

router.get("/", authMiddleware, validateAdmin, UserController.getUsers);

router.get(`/:id`, authMiddleware, UserController.getUser);

router.delete(`/:id`, authMiddleware, validateAdmin, UserController.removeUser);

router.put(`/:id`, authMiddleware, validateAdmin, UserController.updateUser);

export default router;
