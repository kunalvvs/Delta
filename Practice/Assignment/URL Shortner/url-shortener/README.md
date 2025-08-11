# URL Shortener

A minimal URL shortener built with Express. Stores data in a JSON file for simplicity.

- POST /api/shorten { longUrl, custom? } -> { code, shortUrl }
- GET /:code -> 302 redirect to original URL
- GET /api/stats/:code -> metadata

## Run locally

1. Install dependencies
2. Start the dev server

```bash
npm install
npm run dev
```

Open http://localhost:3000
