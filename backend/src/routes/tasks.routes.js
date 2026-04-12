import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

const router = Router();

router.get('/',      requireAuth, getTasks);
router.post('/',     requireAuth, requireRole('admin'), createTask);
router.put('/:id',   requireAuth, requireRole('admin'), updateTask);
router.delete('/:id',requireAuth, requireRole('admin'), deleteTask);

export default router;
