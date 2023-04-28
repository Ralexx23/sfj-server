import { Router } from 'express';
import { getQuestions, postQuestion, putQuestions, deleteQuestions } from '../controllers/questions.controller';

const router = Router();

router.get('/', getQuestions);
router.post('/', postQuestion);
router.put('/', putQuestions);
router.delete('/', deleteQuestions);

export default router;