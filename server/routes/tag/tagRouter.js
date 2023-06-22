import Router from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { validateBlocked } from "../../middleware/validateMiddleware.js";
import TagController from "./controllers/TagController.js";

const router = Router();

router.get("/", TagController.getTags);

router.post(`/`, authMiddleware, TagController.createTag);

router.get("/:id", TagController.getTagById);

router.delete(
  `/:id`,
  authMiddleware,
  TagController.removeTag
);

router.patch(
  `/:id`,
  authMiddleware,
  TagController.updateTag
);

export default router;
