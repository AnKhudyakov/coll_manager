import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import ItemController from "./controllers/ItemController.js";

const router = Router();

router.get("/", ItemController.getItems);

router.post(`/`, authMiddleware, ItemController.createItem);

router.get("/:id", ItemController.getItemById);

router.get("/collection/:id", ItemController.getItemsByCollection);

router.get("/user/:id", authMiddleware, ItemController.getItemsByUser);

router.delete(`/:id`, authMiddleware, ItemController.removeItem);

router.put(`/:id`, authMiddleware, ItemController.updateItem);

router.put(`/:id/like`, authMiddleware, ItemController.addLike);

export default router;
