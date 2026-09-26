export type Currency = "SOL";
export interface User {
  id: string; username: string; email: string; passwordHash: string;
  balance: number; wagered: number; profit: number; xp: number; level: number; vipTier: string;
  clientSeed: string; serverSeed: string; serverSeedHash: string;
  nextServerSeed: string; nextServerSeedHash: string; nonce: number;
  emailVerified: boolean; lastFaucetAt: number; createdAt: number; role: "user" | "admin";
}
export interface PublicUser {
  id: string; username: string; balance: number; wagered: number; profit: number;
  xp: number; level: number; vipTier: string; clientSeed: string; serverSeedHash: string;
  nonce: number; createdAt: number; role: "user" | "admin";
}
export interface Bet {
  id: string; userId: string; username: string; game: string; amount: number; payout: number;
  multiplier: number; won: boolean; clientSeed: string; serverSeed: string; serverSeedHash: string;
  nonce: number; outcome: unknown; createdAt: number;
}
export interface ChatMessage {
  id: string; userId: string; username: string; vipTier: string; text: string; createdAt: number;
}
export interface CrashRound {
  id: string; status: "betting" | "running" | "crashed" | "idle"; crashPoint: number;
  multiplier: number; startedAt: number; bettingEndsAt: number; serverSeedHash: string;
  serverSeed?: string; bets: CrashBet[];
}
export interface CrashBet {
  userId: string; username: string; amount: number; autoCashout?: number; cashedOutAt?: number; payout: number;
}
