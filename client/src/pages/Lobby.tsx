import { Link } from "react-router-dom";
import { LiveTable } from "../components/Shell";
import { GAMES } from "../games";
import { Tile3D } from "../webgl/Tile3D";

export default function Lobby() {
  return (
    <div className="mx-auto max-w-6xl px-3 pb-24 pt-4 sm:px-4 sm:py-6">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
        {GAMES.map((g) => (
          <Link
            key={g.slug}
            to={`/${g.slug}`}
            className="tile-3d relative flex aspect-[3/4] overflow-hidden rounded-xl bg-black ring-1 ring-white/10 sm:rounded-2xl"
          >
            <Tile3D src={`/tiles/${g.slug}.jpg`} alt={g.name} />
            {g.badge && (
              <span className="absolute left-2 top-2 max-w-[80%] truncate rounded bg-black/60 px-2 py-0.5 text-[9px] font-semibold sm:text-[10px]">
                {g.badge}
              </span>
            )}
          </Link>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-3xl px-2 text-center text-xs leading-relaxed text-white/45 sm:mt-8 sm:text-sm">
        NUTSO.GG is a social casino house on Solana rails — originals only, 1% house edge on most titles, instant
        simulated deposits, and a faucet every three minutes. Every roll is HMAC-SHA256(server seed, client seed + nonce).
      </p>
      <LiveTable />
    </div>
  );
}
