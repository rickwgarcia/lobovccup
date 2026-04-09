import { Router } from 'express';
import { getDeals } from '../controllers/deals.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', requireAuth, getDeals);

export default router;
