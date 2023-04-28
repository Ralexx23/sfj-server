import { Router } from 'express';
import { getScore, postScore, putScore, deleteScore } from '../controllers/score.controller';

const router = Router();

router.get('/', getScore);
router.post('/', postScore);
router.put('/', putScore);
router.delete('/', deleteScore);

export default router;