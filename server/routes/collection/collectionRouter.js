import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import CollectionController from "./controllers/CollectionController.js";
import { validateBlocked } from "../../middleware/validateMiddleware.js";

const router = Router();

router.get("/", CollectionController.getCollections);

router.post(
  `/`,
  authMiddleware,
  validateBlocked,
  CollectionController.createCollection
);

router.get("/:id", CollectionController.getCollectionById);

router.get("/user/:id", CollectionController.getCollectionsByUser);

router.delete(
  `/:id`,
  authMiddleware,
  validateBlocked,
  CollectionController.removeCollection
);

router.put(
  `/:id`,
  authMiddleware,
  validateBlocked,
  CollectionController.updateCollection
);

export default router;
