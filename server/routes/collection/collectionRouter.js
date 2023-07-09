import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import CollectionController from "./controllers/CollectionController.js";

const router = Router();

router.get("/", CollectionController.getCollections);

router.post(`/`, authMiddleware, CollectionController.createCollection);

router.get("/:id", CollectionController.getCollectionById);

router.get(
  "/user/:id",
  authMiddleware,
  CollectionController.getCollectionsByUser
);

router.delete(`/:id`, authMiddleware, CollectionController.removeCollection);

router.put(`/:id`, authMiddleware, CollectionController.updateCollection);

export default router;
