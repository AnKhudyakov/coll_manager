import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateBlocked } from "../../middleware/validateMiddleware.js";
import ItemController from "./controllers/ItemController.js";

const router = Router();

router.get("/", ItemController.getItems);

router.post(`/`, authMiddleware, validateBlocked, ItemController.createItem);

router.get("/:id", ItemController.getItemById);

router.get("/collection/:id", ItemController.getItemsByCollection);

router.get("/user/:id", ItemController.getItemsByUser);

router.delete(
  `/:id`,
  authMiddleware,
  validateBlocked,
  ItemController.removeItem
);

router.put(
  `/:id`,
  authMiddleware,
  validateBlocked,
  ItemController.updateItem
);

export default router;
