import { useEffect, useState } from "react";
import { api } from "../api";

type Row = { rank: number; username: string; wagered: number; profit: number; vipTier: string; level: number };

export default function Leaderboard() {
  const [rows, setRows] = useState<Row[]>([]);
  useEffect(() => {
    api<Row[]>("/api/leaderboard").then(setRows).catch(() => {});
  }, []);
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-4 font-display text-3xl">Leaderboard</h1>
      <div className="overflow-hidden rounded-xl bg-panel">
        {rows.map((r) => (
          <div key={r.username} className="grid grid-cols-5 px-4 py-2 text-sm text-white/80">
            <span>#{r.rank}</span>
            <span>{r.username}</span>
            <span>{r.vipTier}</span>
            <span>{r.wagered.toFixed(4)}</span>
            <span className={r.profit >= 0 ? "text-mint" : "text-red-400"}>{r.profit.toFixed(4)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
