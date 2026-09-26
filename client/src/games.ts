export const GAMES = [
  { slug: "snakes", name: "SNAKES", badge: "Without Warning", tint: "from-orange-500 to-red-600", emoji: "🐍" },
  { slug: "blackjack", name: "BLACKJACK", tint: "from-sky-200 to-sky-400", emoji: "🃏" },
  { slug: "chicken", name: "CHICKEN", tint: "from-yellow-300 to-amber-400", emoji: "🐔" },
  { slug: "darts", name: "DARTS", tint: "from-violet-500 to-fuchsia-600", emoji: "🎯" },
  { slug: "keno", name: "KENO", tint: "from-lime-400 to-green-500", emoji: "🔢" },
  { slug: "plinko", name: "PLINKO", tint: "from-pink-400 to-fuchsia-500", emoji: "🟣" },
  { slug: "mines", name: "MINES", tint: "from-purple-500 to-violet-700", emoji: "💣" },
  { slug: "dice", name: "DICE", badge: "Adv. Autoplay", tint: "from-emerald-300 to-cyan-400", emoji: "🎲" },
  { slug: "tower", name: "TOWER", tint: "from-orange-300 to-rose-400", emoji: "🏰" },
  { slug: "limbo", name: "LIMBO", tint: "from-sky-400 to-blue-600", emoji: "📈" },
  { slug: "roulette", name: "ROULETTE", tint: "from-amber-400 to-orange-500", emoji: "🎡" },
  { slug: "hilo", name: "HI-LO", tint: "from-fuchsia-400 to-purple-600", emoji: "🂡" },
  { slug: "crash", name: "CRASH", tint: "from-rose-500 to-red-700", emoji: "🚀" },
] as const;

export function fmtSol(n: number, digits = 8) {
  return Number(n || 0).toFixed(digits);
}

export function usd(n: number) {
  return `$${(n * 180).toFixed(2)}`;
}
