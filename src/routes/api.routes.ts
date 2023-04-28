import { Response, Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import gamesRoutes from "./games.routes";
import scoresRoutes from "./scores.routes";

const router = Router();
router.get("/", (_req, res: Response) => {
  res.send("Hello World from api v1");
});

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/games", gamesRoutes);
router.use("/scores", scoresRoutes);

export default router;
