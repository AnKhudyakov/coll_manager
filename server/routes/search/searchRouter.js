import Router from "express";
//import { authMiddleware } from "../../middleware/authMiddleware.js";
import SearchController from "./controllers/SearchController.js";
//import { validateAdmin } from "../../middleware/validateMiddleware.js";

const router = Router();

router.get("/", SearchController.getResult);


export default router;
