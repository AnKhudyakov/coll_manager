import Router from "express";
import SearchController from "./controllers/SearchController.js";

const router = Router();

router.get("/", SearchController.getResult);


export default router;
