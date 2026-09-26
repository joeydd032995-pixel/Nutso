import { FormEvent, useState } from "react";
import { api } from "../api";
import { useStore } from "../store";

export default function Account() {
  const { user, setUser, setModal } = useStore();
  const [msg, setMsg] = useState("");
  if (!user) {
    return (
      <div className="p-10 text-center">
        <button className="text-mint" onClick={() => setModal("login")}>Sign in to view fairness seeds</button>
      </div>
    );
  }
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = await api<{ user: typeof user; revealedServerSeed?: string }>("/api/account/seeds", {
      method: "POST",
      body: JSON.stringify({ clientSeed: fd.get("clientSeed"), rotate: fd.get("rotate") === "on" }),
    });
    if (r.user) setUser(r.user);
    setMsg(r.revealedServerSeed ? `Old server seed revealed: ${r.revealedServerSeed}` : "Saved.");
  }
  return (
    <div className="mx-auto max-w-xl space-y-4 p-6">
      <h1 className="font-display text-3xl">Account</h1>
      <div className="rounded-xl bg-panel p-4 text-sm text-white/70">
        <div>User · {user.username}</div>
        <div>VIP · {user.vipTier} · level {user.level}</div>
        <div>Nonce · {user.nonce}</div>
        <div className="break-all">Server seed hash · {user.serverSeedHash}</div>
      </div>
      <form onSubmit={onSubmit} className="space-y-3 rounded-xl bg-panel p-4">
        <label className="block text-sm text-white/60">Client seed</label>
        <input name="clientSeed" defaultValue={user.clientSeed} className="w-full rounded bg-black/40 px-3 py-2" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="rotate" /> Rotate server seed (reveals the previous one)
        </label>
        <button className="rounded-md bg-mint px-4 py-2 font-bold text-black">Update</button>
        {msg && <p className="break-all text-xs text-white/50">{msg}</p>}
      </form>
    </div>
  );
}
