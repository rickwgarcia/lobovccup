import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { readFile } from 'fs/promises';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { marked } from 'marked';
import { env } from './config/env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});
app.use(limiter);

// Content endpoint — reads /content/{page}.md, returns parsed HTML
const CONTENT_DIR = resolve(__dirname, '../../content');
const VALID_PAGES = ['home', 'founder-guide', 'vc-guide', 'schedule', 'faq', 'hero', 'hero-stats', 'tracks', 'prizes', 'cta'];

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

// Serve frontend statically in local dev
if (env.isDev) {
  app.use(express.static(join(__dirname, '../../frontend')));
}

app.use((req, res) => {
  res.status(404).json({ error: `${req.method} ${req.path} not found` });
});

app.use((err, req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: env.isDev ? err.message : 'Internal server error' });
});

export default app;
