import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { nanoid } from 'nanoid';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In production, serve client build
const clientDist = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDist));

async function readDb() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    if (e.code === 'ENOENT') return {};
    throw e;
  }
}

async function writeDb(db) {
  await fs.writeFile(DATA_FILE, JSON.stringify(db, null, 2));
}

function normalizeUrl(raw) {
  const trimmed = String(raw || '').trim();
  if (!trimmed) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `http://${trimmed}`;
}

app.post('/api/shorten', async (req, res) => {
  const { longUrl, custom } = req.body || {};
  if (!longUrl || typeof longUrl !== 'string') {
    return res.status(400).json({ error: 'longUrl is required' });
  }
  const normalized = normalizeUrl(longUrl.trim());
  let code = (custom || '').trim();
  if (code) {
    if (!/^[a-zA-Z0-9_-]{3,30}$/.test(code)) {
      return res.status(400).json({ error: 'Invalid custom code' });
    }
  } else {
    code = nanoid(7);
  }

  const db = await readDb();
  if (db[code]) {
    return res.status(409).json({ error: 'Code already in use' });
  }
  db[code] = { url: normalized, createdAt: Date.now(), clicks: 0 };
  await writeDb(db);
  const shortUrl = `${req.protocol}://${req.get('host')}/${code}`;
  res.json({ code, shortUrl });
});

app.get('/api/stats/:code', async (req, res) => {
  const db = await readDb();
  const entry = db[req.params.code];
  if (!entry) return res.status(404).json({ error: 'Not found' });
  res.json({ code: req.params.code, ...entry });
});

app.get('/:code', async (req, res) => {
  const { code } = req.params;
  const db = await readDb();
  const entry = db[code];
  if (!entry) return res.status(404).send('Short URL not found');
  entry.clicks = (entry.clicks || 0) + 1;
  await writeDb(db);
  res.redirect(entry.url);
});

// Fallback to client for any other route (so React Router would work if added)
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`URL Shortener running on http://localhost:${PORT}`);
});
