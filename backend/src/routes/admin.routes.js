import { Router } from 'express';
import {
  getAllTeams,
  updateTeamEligibility,
  getDashboardStats,
  getTeamSubmissions,
} from '../controllers/admin.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

// All admin routes require authentication + admin role
router.use(requireAuth, requireRole('admin'));

router.get('/teams', getAllTeams);
router.patch('/teams/:id', updateTeamEligibility);
router.get('/teams/:id/submissions', getTeamSubmissions);
router.get('/stats', getDashboardStats);

export default router;
