# NUTSO.GG

Full-stack Solana social casino (Nuts.gg-style originals).

Vite + React client, Express + Socket.IO API, HMAC-SHA256 fairness.

## Local

```bash
npm install
npm run dev
```

- Client: http://localhost:5173
- API: http://localhost:3001/health

## Vercel

`vercel.json` builds `client/` to `client/dist`. Set `VITE_API_URL` to your API host. Socket.IO cannot run on Vercel serverless — deploy `server/` on Fly/Render/Hetzner.
