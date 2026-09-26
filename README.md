# NUTSO.GG

Full-stack Solana social casino. Repo: https://github.com/joeydd032995-pixel/Nutso

## What's on GitHub

Monorepo + Vercel config, client shell (App, lobby, auth store, account, leaderboard), WebGL background helpers, HMAC RNG, JSON store, Docker.

Game table pages (`Games.tsx`), canvases, Express `index.ts` / `engines.ts`, and lobby JPGs are in the chat zip (`nutso-casino.zip`). Overlay that folder onto this clone and push:

```bash
unzip nutso-casino.zip
cd nutso-casino
git init
git remote add origin https://github.com/joeydd032995-pixel/Nutso.git
git fetch origin
git checkout -B main
git add .
git commit -m "feat: overlay games, API, tiles"
git push -u origin main --force
```

`--force` only if you intend this zip to be the source of truth.

## Local

```bash
npm install
npm run dev
```

## Vercel

Import this repo. Root = repo root. Env `VITE_API_URL` = API origin. Socket.IO stays off Vercel.
