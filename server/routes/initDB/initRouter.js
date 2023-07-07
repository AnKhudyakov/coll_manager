import Router from "express";
import initDBController from "./controllers/initDBController.js";

const router = Router();

router.get("/", initDBController.createInitDB);

export default router;
