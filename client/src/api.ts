const TOKEN_KEY = "nutso_token";

export const API_BASE = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");

function url(path: string) {
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}
export function setToken(t: string | null) {
  if (t) localStorage.setItem(TOKEN_KEY, t);
  else localStorage.removeItem(TOKEN_KEY);
}

export async function api<T>(path: string, init: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((init.headers as Record<string, string>) || {}),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url(path), { ...init, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || res.statusText);
  return data as T;
}

export type User = {
  id: string;
  username: string;
  balance: number;
  wagered: number;
  profit: number;
  xp: number;
  level: number;
  vipTier: string;
  clientSeed: string;
  serverSeedHash: string;
  nonce: number;
  createdAt: number;
  role: string;
};

export type LiveBet = {
  id: string;
  username: string;
  game: string;
  amount: number;
  payout: number;
  multiplier: number;
  won: boolean;
  createdAt: number;
};
