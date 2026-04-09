import { Router } from 'express';
import {
  createTeam,
  getMyTeam,
  getAllTeams,
} from '../controllers/teams.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

router.post('/', requireAuth, createTeam);
router.get('/me', requireAuth, getMyTeam);
router.get('/', requireAuth, requireRole('admin'), getAllTeams);

export default router;
