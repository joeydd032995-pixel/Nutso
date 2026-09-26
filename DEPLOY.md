# Deploy

Repo: https://github.com/joeydd032995-pixel/Nutso

## Vercel (client)

1. Import this repo.
2. Root directory: repo root.
3. Env: `VITE_API_URL=https://YOUR-API-HOST`
4. `vercel.json` builds `client/` → `client/dist`.

Socket.IO / Express must run elsewhere (Fly, Render, Hetzner). Set `FRONTEND_URL` on the API to the Vercel origin.

## Complete source

GitHub has the monorepo scaffold, client core, RNG, and persistence.
The full game tables (`Games.tsx`, canvases, engines, API index, lobby JPGs) were too large for the file API in one session — they are in `nutso-casino.zip` from chat.

Overlay that zip on this clone, then:

```bash
git add .
git commit -m "feat: games, canvases, API, tiles"
git push
```
