import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { readFile } from 'fs/promises';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { env } from './config/env.js';

import authRoutes from './routes/auth.routes.js';
import teamsRoutes from './routes/teams.routes.js';
import submissionsRoutes from './routes/submissions.routes.js';
import dealsRoutes from './routes/deals.routes.js';
import adminRoutes from './routes/admin.routes.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// Security headers (relax CSP for font loading from Google Fonts)
app.use(helmet({
  contentSecurityPolicy: false,
}));

// CORS — open; auth is JWT-based not cookie-based
app.use(cors());

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(limiter);

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many auth requests. Please wait before trying again.' },
});

// API routes
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/submissions', submissionsRoutes);
app.use('/api/deals', dealsRoutes);
app.use('/api/admin', adminRoutes);

// Content endpoint — reads /content/{page}.md, returns parsed HTML
// Path is relative to this file: backend/src/app.js → ../../content
const CONTENT_DIR = resolve(__dirname, '../../content');
const VALID_PAGES = ['home', 'founder-guide', 'vc-guide', 'schedule', 'faq'];

app.get('/api/content/:page', async (req, res) => {
  const { page } = req.params;
  if (!VALID_PAGES.includes(page)) {
    return res.status(404).json({ error: 'Content page not found' });
  }
  try {
    const markdown = await readFile(resolve(CONTENT_DIR, `${page}.md`), 'utf-8');
    return res.json({ html: marked.parse(markdown) });
  } catch (err) {
    console.error(`Content read error for ${page}:`, err.message);
    return res.status(500).json({ error: 'Failed to load content' });
  }
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', ts: new Date().toISOString() });
});

// Serve frontend statically in local dev (on Vercel, static files are served separately)
if (env.isDev) {
  app.use(express.static(join(__dirname, '../../frontend')));
}

// 404
app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.path} not found` });
});

// Error handler
app.use((err, req, res, _next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large' });
  }
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: env.isDev ? err.message : 'Internal server error',
  });
});

export default app;
