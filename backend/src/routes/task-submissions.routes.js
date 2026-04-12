import { Router } from 'express';
import multer from 'multer';
import {
  uploadTaskSubmission,
  getMyTaskSubmissions,
  getSubmissionsForTask,
  getDownloadUrl,
} from '../controllers/task-submissions.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';

// Generic multer for task submissions — validation is done in the controller
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2 GB ceiling
});

const router = Router();

router.post('/upload',           requireAuth, upload.single('file'), uploadTaskSubmission);
router.get('/me',                requireAuth, getMyTaskSubmissions);
router.get('/task/:taskId',      requireAuth, requireRole('admin'), getSubmissionsForTask);
router.get('/download/:id',      requireAuth, getDownloadUrl);

export default router;
