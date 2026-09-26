import { ReactNode } from "react";
import { LiveTable } from "./Shell";
import { ResultBurst } from "./canvases";
import { sfx } from "../lib/sfx";

export function GameLayout({ sidebar, children, game, flash = "" }: { sidebar: ReactNode; children: ReactNode; game: string; flash?: "win" | "lose" | ""; }) {
  return (
    <div className="mx-auto max-w-6xl px-3 py-6">
      <div className="overflow-hidden rounded-2xl bg-panel ring-1 ring-white/5">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
          <div className="font-display text-sm uppercase tracking-[0.2em] text-white/50">{game}</div>
          <div className="text-[10px] uppercase tracking-widest text-white/30">Provably fair · 1% edge</div>
        </div>
        <div className="grid gap-0 md:grid-cols-[300px_1fr]">
          <aside className="space-y-3 bg-[#161616] p-4 md:border-r md:border-white/5">{sidebar}</aside>
          <div className="relative min-h-[460px] bg-[#101114] p-4 md:p-6">
            {children}
            <ResultBurst kind={flash} />
          </div>
        </div>
      </div>
      <LiveTable game={game} />
    </div>
  );
}

export function PlayButton({ onClick, label = "PLAY", disabled }: { onClick: () => void; label?: string; disabled?: boolean }) {
  return (
    <button disabled={disabled} onClick={() => { sfx.play(); onClick(); }} className="play-btn flex w-full items-center justify-center gap-3 rounded-xl py-3.5 font-display text-xl tracking-wide disabled:opacity-50">
      {label}
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 text-xs">▶</span>
    </button>
  );
}

export function BetBox({ amount, setAmount, min = 0.00000001, max = 1 }: { amount: number; setAmount: (n: number) => void; min?: number; max?: number }) {
  return (
    <div className="grid grid-cols-[52px_1fr_52px] overflow-hidden rounded-xl ring-1 ring-white/10">
      <div className="grid grid-rows-2 text-[11px] font-bold text-white/70">
        <button className="bg-[#2a2a2a]" onClick={() => { sfx.click(); setAmount(Math.max(min, Number((amount / 2).toFixed(8)))); }}>−</button>
        <button className="bg-[#222]" onClick={() => { sfx.click(); setAmount(min); }}>MIN</button>
      </div>
      <div className="bg-[#0e0e0e] py-2 text-center">
        <div className="font-mono text-sm">{amount.toFixed(8)}</div>
        <div className="text-[10px] text-white/40">${(amount * 180).toFixed(2)}</div>
      </div>
      <div className="grid grid-rows-2 text-[11px] font-bold text-white/70">
        <button className="bg-[#2a2a2a]" onClick={() => { sfx.click(); setAmount(Number((amount * 2).toFixed(8))); }}>+</button>
        <button className="bg-[#222]" onClick={() => { sfx.click(); setAmount(max); }}>MAX</button>
      </div>
    </div>
  );
}
