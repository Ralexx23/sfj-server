import { Router } from "express";
import { getGames, postGames , putGames, deleteGames } from "../controllers/games.controller";

const  router = Router();

router.get('/', getGames);
router.post('/', postGames);
router.put('/', putGames);
router.delete('/', deleteGames);

export default router;