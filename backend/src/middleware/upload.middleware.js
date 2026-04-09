import multer from 'multer';
import { SUBMISSION_TYPES } from '../config/storage.js';

// Use memory storage — files are buffered then uploaded to Supabase Storage
const storage = multer.memoryStorage();

function fileFilter(req, file, cb) {
  const submissionType = req.body.type || req.query.type;
  const config = SUBMISSION_TYPES[submissionType];

  if (!config) {
    return cb(new Error(`Unknown submission type: ${submissionType}`), false);
  }

  if (!config.allowedMimeTypes.includes(file.mimetype)) {
    return cb(
      new Error(
        `Invalid file type ${file.mimetype}. Allowed: ${config.allowedMimeTypes.join(', ')}`
      ),
      false
    );
  }

  cb(null, true);
}

// Max file size is determined dynamically per type, but multer needs a static limit.
// We use 2 GB as the ceiling (lp_video max) and validate per-type in the controller.
export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 },
});
