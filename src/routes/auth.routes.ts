import { Router } from 'express';
import { GetAuth, Login } from '../controllers/auth.controllers';
import { requireAuth } from '../utils/requireAuth';

const router = Router();

router.get('/',requireAuth, GetAuth);

router.post('/login', Login);

export default router;