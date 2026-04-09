import { Router } from 'express';
import { signup, login, logout, getMe } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireUnmEmail } from '../middleware/validate.middleware.js';

const router = Router();

router.post('/signup', requireUnmEmail, signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAuth, getMe);

export default router;
