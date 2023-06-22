import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import UserController from "./controllers/UserController.js";
import { validateAdmin } from "../../middleware/validateMiddleware.js";

const router = Router();

router.get("/", authMiddleware, validateAdmin, UserController.getUsers);

router.get(`/:id`, authMiddleware, UserController.getUser);

// router.post(
//   `/`,
//   //authMiddleware,
//   //validateBlocked,
//   UserController.createUser
// );

router.delete(`/:id`, authMiddleware, validateAdmin, UserController.removeUser);

router.put(`/:id`, authMiddleware, validateAdmin, UserController.updateUser);

// router.patch(
//   `/block/:id`,
//   authMiddleware,
//   validateBlocked,
//   UserController.blockUser
// );

// router.patch(
//   `/unblock/:id`,
//   authMiddleware,
//   validateBlocked,
//   UserController.unblockUser
// );

export default router;
