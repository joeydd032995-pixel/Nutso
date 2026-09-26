import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { api, getToken, setToken, type LiveBet, type User } from "./api";

type AuthModal = "closed" | "login" | "register" | "deposit" | "menu";

type Ctx = {
  user: User | null;
  setUser: (u: User | null) => void;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  refresh: () => Promise<void>;
  modal: AuthModal;
  setModal: (m: AuthModal) => void;
  socket: Socket | null;
  liveBets: LiveBet[];
  chat: { id: string; username: string; vipTier: string; text: string; createdAt: number }[];
  sendChat: (text: string) => void;
};

const C = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTok] = useState<string | null>(getToken());
  const [modal, setModal] = useState<AuthModal>("closed");
  const [socket, setSocket] = useState<Socket | null>(null);
  const [liveBets, setLiveBets] = useState<LiveBet[]>([]);
  const [chat, setChat] = useState<Ctx["chat"]>([]);

  const refresh = async () => {
    if (!getToken()) return;
    const r = await api<{ user: User }>("/api/auth/me");
    setUser(r.user);
  };

  useEffect(() => {
    refresh().catch(() => {
      setToken(null);
      setTok(null);
      setUser(null);
    });
    api<LiveBet[]>("/api/bets/recent").then(setLiveBets).catch(() => {});
  }, []);

  useEffect(() => {
    const s = io(import.meta.env.VITE_API_URL || "/", { auth: { token: getToken() || "" }, path: "/socket.io" });
    setSocket(s);
    s.on("bet:live", (b: LiveBet) => setLiveBets((prev) => [b, ...prev].slice(0, 40)));
    s.on("chat:history", (rows: Ctx["chat"]) => setChat(rows));
    s.on("chat:message", (m: Ctx["chat"][number]) => setChat((p) => [...p.slice(-79), m]));
    return () => { s.close(); };
  }, [token]);

  const value = useMemo<Ctx>(() => ({
    user, setUser, token,
    async login(username, password) {
      const r = await api<{ token: string; user: User }>("/api/auth/login", { method: "POST", body: JSON.stringify({ username, password }) });
      setToken(r.token); setTok(r.token); setUser(r.user); setModal("closed");
    },
    async register(username, email, password) {
      const r = await api<{ token: string; user: User }>("/api/auth/register", { method: "POST", body: JSON.stringify({ username, email, password }) });
      setToken(r.token); setTok(r.token); setUser(r.user); setModal("closed");
    },
    logout() { setToken(null); setTok(null); setUser(null); },
    refresh, modal, setModal, socket, liveBets, chat,
    sendChat(text) { socket?.emit("chat:send", text); },
  }), [user, token, modal, socket, liveBets, chat]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useStore() {
  const v = useContext(C);
  if (!v) throw new Error("store");
  return v;
}
