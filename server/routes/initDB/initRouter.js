import Router from "express";
//import { authMiddleware } from "../../middleware/authMiddleware.js";
import initDBController from "./controllers/initDBController.js";
//import { validateAdmin } from "../../middleware/validateMiddleware.js";

const router = Router();

router.get("/", initDBController.createInitDB);

export default router;
