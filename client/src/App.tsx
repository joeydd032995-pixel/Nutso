import { Navigate, Route, Routes } from "react-router-dom";
import { ChatDock, Header, Modals } from "./components/Shell";
import Account from "./pages/Account";
import {
  BlackjackPage,
  ChickenPage,
  CrashPage,
  DartsPage,
  DicePage,
  FairnessPage,
  HiLoPage,
  KenoPage,
  LimboPage,
  MinesPage,
  PlinkoPage,
  RoulettePage,
  SnakesPage,
  TowerPage,
} from "./pages/Games";
import Leaderboard from "./pages/Leaderboard";
import Lobby from "./pages/Lobby";
import { WebGLBackground } from "./webgl/Background";

export default function App() {
  return (
    <div className="relative min-h-dvh pb-20">
      <WebGLBackground />
      <Header />
      <div className="relative z-10">
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/dice" element={<DicePage />} />
        <Route path="/mines" element={<MinesPage />} />
        <Route path="/limbo" element={<LimboPage />} />
        <Route path="/target" element={<LimboPage />} />
        <Route path="/plinko" element={<PlinkoPage />} />
        <Route path="/keno" element={<KenoPage />} />
        <Route path="/roulette" element={<RoulettePage />} />
        <Route path="/blackjack" element={<BlackjackPage />} />
        <Route path="/hilo" element={<HiLoPage />} />
        <Route path="/tower" element={<TowerPage />} />
        <Route path="/chicken" element={<ChickenPage />} />
        <Route path="/snakes" element={<SnakesPage />} />
        <Route path="/darts" element={<DartsPage />} />
        <Route path="/crash" element={<CrashPage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/fairness" element={<FairnessPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </div>
      <Modals />
      <ChatDock />
    </div>
  );
}
