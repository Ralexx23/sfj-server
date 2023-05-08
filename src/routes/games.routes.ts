import { Router } from "express";
import {
  getGames,
  postGames,
  putGames,
  deleteGames,
} from "../controllers/games.controller";

const router = Router();

router.get("/", getGames);
router.post("/", postGames);
router.put("/", putGames);
router.delete("/:id", deleteGames);

export default router;
