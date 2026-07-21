"use client";

import { useState } from "react";
import { Sparkles, Gift, Trophy, Play } from "lucide-react";
import confetti from "canvas-confetti";

interface FortuneWheelGameProps {
  onWin: (prizeName: string) => void;
}

export function FortuneWheelGame({ onWin }: FortuneWheelGameProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [hasWon, setHasWon] = useState(false);
  const [gameMode, setGameMode] = useState<"WHEEL" | "CHESTS">("WHEEL");
  const [selectedChest, setSelectedChest] = useState<number | null>(null);

  // Spin the wheel game logic
  const handleSpinWheel = () => {
    if (spinning || hasWon) return;

    setSpinning(true);
    // Spin 5 to 8 full turns plus random angle
    const extraTurns = 360 * (5 + Math.floor(Math.random() * 3));
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = rotation + extraTurns + randomAngle;

    setRotation(totalRotation);

    setTimeout(() => {
      setSpinning(false);
      setHasWon(true);

      // Trigger Confetti explosion
      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#10B981", "#F59E0B", "#3B82F6", "#EC4899", "#8B5CF6"],
        });
      } catch (e) {
        console.warn("Confetti error", e);
      }

      // Automatically trigger popup after 1.2s delay
      setTimeout(() => {
        onWin("🎉 Grand Don Spécial DÉCOUVERT !");
      }, 1200);
    }, 4500);
  };

  // Chest game logic
  const handleOpenChest = (chestIndex: number) => {
    if (spinning || hasWon) return;

    setSelectedChest(chestIndex);
    setSpinning(true);

    setTimeout(() => {
      setSpinning(false);
      setHasWon(true);

      try {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.6 },
          colors: ["#10B981", "#F59E0B", "#3B82F6", "#EC4899"],
        });
      } catch (e) {
        console.warn("Confetti error", e);
      }

      setTimeout(() => {
        onWin(`🎁 Don Spécial Découvert dans le coffre #${chestIndex + 1} !`);
      }, 1000);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-6 py-4">
      {/* GAME MODE SWITCH TABS */}
      <div className="flex items-center justify-center gap-3 bg-slate-900/90 p-1.5 rounded-2xl border-2 border-slate-800">
        <button
          type="button"
          onClick={() => {
            if (!spinning) setGameMode("WHEEL");
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
            gameMode === "WHEEL"
              ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span>🎡 La Roue de la Chance</span>
        </button>

        <button
          type="button"
          onClick={() => {
            if (!spinning) setGameMode("CHESTS");
          }}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-2 ${
            gameMode === "CHESTS"
              ? "bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <span>🎁 Les Boîtes Cadeaux</span>
        </button>
      </div>

      {/* MODE 1: WHEEL OF FORTUNE */}
      {gameMode === "WHEEL" && (
        <div className="flex flex-col items-center space-y-6">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* WHEEL POINTER ARROW */}
            <div className="absolute -top-4 z-20 text-4xl filter drop-shadow-lg animate-bounce">
              🔻
            </div>

            {/* WHEEL BODY */}
            <div
              className="w-full h-full rounded-full border-8 border-amber-400/80 shadow-2xl relative overflow-hidden transition-all duration-[4500ms] cubic-bezier(0.15, 0.9, 0.2, 1)"
              style={{
                transform: `rotate(${rotation}deg)`,
                background: "conic-gradient(#10B981 0deg 90deg, #F59E0B 90deg 180deg, #3B82F6 180deg 270deg, #EC4899 270deg 360deg)",
              }}
            >
              {/* SLICE OVERLAYS WITH LABELS */}
              <div className="absolute inset-0 flex items-center justify-center font-black text-xs sm:text-sm text-slate-950 font-sans">
                <span className="absolute top-8 font-black uppercase text-white drop-shadow">🎁 DON SPÉCIAL</span>
                <span className="absolute right-6 font-black uppercase text-slate-950 drop-shadow">🌟 CADEAU OR</span>
                <span className="absolute bottom-8 font-black uppercase text-white drop-shadow">💎 DON VIP</span>
                <span className="absolute left-6 font-black uppercase text-slate-950 drop-shadow">✨ BONUS SURPRISE</span>
              </div>
            </div>

            {/* CENTER SPIN HUB BUTTON */}
            <div className="absolute z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-950 border-4 border-amber-400 flex flex-col items-center justify-center text-amber-300 shadow-2xl">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-wider">CHANCE</span>
            </div>
          </div>

          {/* SPIN ACTION BUTTON */}
          <button
            type="button"
            onClick={handleSpinWheel}
            disabled={spinning || hasWon}
            className="px-8 py-5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-lg sm:text-xl shadow-2xl shadow-amber-500/30 transition-transform hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer disabled:opacity-50 border-2 border-amber-200"
          >
            {spinning ? (
              <>
                <div className="w-6 h-6 border-4 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>La roue tourne...</span>
              </>
            ) : hasWon ? (
              <>
                <Sparkles className="w-6 h-6 text-slate-950 animate-bounce" />
                <span>VOUS AVEZ GAGNÉ !</span>
              </>
            ) : (
              <>
                <Play className="w-6 h-6 text-slate-950 fill-slate-950" />
                <span>LANCER LA ROUE POUR GAGNER 🎡</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* MODE 2: MYSTERY GIFT CHESTS */}
      {gameMode === "CHESTS" && (
        <div className="flex flex-col items-center space-y-6">
          <p className="text-sm font-bold text-slate-300 text-center">
            Cliquez sur l'une des 3 boîtes cadeaux pour découvrir votre Don Spécial !
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full max-w-md">
            {[0, 1, 2].map((idx) => {
              const isChosen = selectedChest === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOpenChest(idx)}
                  disabled={spinning || hasWon}
                  className={`p-6 sm:p-8 rounded-3xl border-4 flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    isChosen
                      ? "bg-amber-500/30 border-amber-400 scale-110 shadow-2xl shadow-amber-500/40 animate-pulse"
                      : "bg-slate-900 border-slate-800 hover:border-emerald-500 hover:scale-105"
                  } disabled:cursor-not-allowed`}
                >
                  <span className={`text-4xl sm:text-5xl transition-transform ${isChosen && spinning ? "animate-bounce" : ""}`}>
                    🎁
                  </span>
                  <span className="text-xs font-black text-amber-300 uppercase">
                    Boîte #{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {!hasWon && !spinning && (
            <span className="text-xs text-slate-400 font-medium">
              👉 Touchez une boîte cadeau pour tenter votre chance !
            </span>
          )}
        </div>
      )}
    </div>
  );
}
