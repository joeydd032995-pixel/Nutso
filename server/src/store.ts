import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Bet, ChatMessage, User } from "./types.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../data");
const FILE = path.join(DATA_DIR, "db.json");
interface DB { users: User[]; bets: Bet[]; chat: ChatMessage[]; }
function empty(): DB { return { users: [], bets: [], chat: [] }; }
function load(): DB {
  try {
    if (!fs.existsSync(FILE)) return empty();
    return JSON.parse(fs.readFileSync(FILE, "utf8")) as DB;
  } catch { return empty(); }
}
function persist(db: DB) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(FILE, JSON.stringify(db, null, 2));
}
let db = load();
export const store = {
  get users() { return db.users; },
  get bets() { return db.bets; },
  get chat() { return db.chat; },
  save() { persist(db); },
  findUserById(id: string) { return db.users.find((u) => u.id === id); },
  findUserByUsername(username: string) { return db.users.find((u) => u.username.toLowerCase() === username.toLowerCase()); },
  findUserByEmail(email: string) { return db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()); },
  addUser(user: User) { db.users.push(user); persist(db); return user; },
  updateUser(id: string, patch: Partial<User>) {
    const u = this.findUserById(id);
    if (!u) return undefined;
    Object.assign(u, patch);
    persist(db);
    return u;
  },
  addBet(bet: Bet) {
    db.bets.unshift(bet);
    if (db.bets.length > 4000) db.bets.length = 4000;
    persist(db);
    return bet;
  },
  addChat(msg: ChatMessage) {
    db.chat.push(msg);
    if (db.chat.length > 300) db.chat = db.chat.slice(-300);
    persist(db);
    return msg;
  },
};
