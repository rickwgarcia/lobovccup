import { Router } from 'express';
import {
  uploadSubmission,
  getMySubmissions,
  getAllSubmissions,
  getDownloadUrl,
} from '../controllers/submissions.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { requireRole } from '../middleware/role.middleware.js';
import { upload } from '../middleware/upload.middleware.js';

const router = Router();

router.post('/upload', requireAuth, upload.single('file'), uploadSubmission);
router.get('/me', requireAuth, getMySubmissions);
router.get('/download/:id', requireAuth, getDownloadUrl);
router.get('/', requireAuth, requireRole('admin'), getAllSubmissions);

export default router;
