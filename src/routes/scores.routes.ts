import { Router } from "express";
import {
  getScores,
  postScores,
  putScores,
  deleteScores,
} from "../controllers/scores.controllers";

const router = Router();

router.get("/", getScores);
router.post("/", postScores);
router.put("/", putScores);
router.delete("/", deleteScores);

export default router;
