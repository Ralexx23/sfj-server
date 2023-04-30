import { Router } from "express";
import {
  getGames,
  postGames,
  putGames,
  deleteGames,
} from "../controllers/games.controller";
import multer from "../libs/multer";

const router = Router();

router.get("/", getGames);
router.post("/", multer.single("image"), postGames);
router.put("/", putGames);
router.delete("/", deleteGames);

export default router;
