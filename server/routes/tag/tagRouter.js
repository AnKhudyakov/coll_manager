import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateBlocked } from "../../middleware/validateMiddleware.js";
import TagController from "./controllers/TagController.js";

const router = Router();

router.get("/", TagController.getTags);

router.post(`/`, authMiddleware, validateBlocked, TagController.createTag);

router.get("/:id", TagController.getTagById);

router.delete(
  `/:id`,
  authMiddleware,
  validateBlocked,
  TagController.removeTag
);

router.patch(
  `/:id`,
  authMiddleware,
  validateBlocked,
  TagController.updateTag
);

export default router;
