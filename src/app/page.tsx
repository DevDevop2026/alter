"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FortuneWheelGame } from "@/components/FortuneWheelGame";
import { ClaimRewardModal } from "@/components/ClaimRewardModal";
import { AudioAssistant } from "@/components/AudioAssistant";
import { Sparkles, Trophy, Gift, ArrowRight, ShieldCheck, Play } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [wonPrizeName, setWonPrizeName] = useState("");

  const homeAudioScript =
    "Bienvenue ! Tournez la roue de la chance ou choisissez une boîte cadeau pour gagner votre Don Spécial. Dès que vous avez gagné, un formulaire va s'ouvrir automatiquement. Vous y écrirez votre nom et votre numéro de téléphone pour recevoir votre code cadeau et contacter l'administrateur sur WhatsApp.";

  const handleWin = (prizeName: string) => {
    setWonPrizeName(prizeName);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* BANNER WITH VOCAL ASSISTANCE */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-4 border-emerald-500/40 shadow-2xl text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-500 text-slate-950 font-black text-3xl shadow-xl shadow-emerald-500/20 animate-bounce">
            🎡
          </div>

          <div>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> JEU CONCOURS DONS SPÉCIAUX
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Jouez, Gagnez & Récupérez votre Don !
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-2 font-medium">
              Tournez la roue ou ouvrez un coffre cadeau. Un formulaire apparaîtra <strong className="text-emerald-400">automatiquement</strong> pour saisir vos infos et recevoir votre code unique !
            </p>
          </div>

          <div className="flex justify-center pt-2">
            <AudioAssistant textToSpeak={homeAudioScript} label="Écouter le mode de jeu vocal 🔊" />
          </div>
        </div>

        {/* MAIN GAME CONTAINER */}
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900 border-2 border-emerald-500/40 shadow-2xl space-y-6">
          <div className="text-center space-y-1 pb-4 border-b border-slate-800">
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center justify-center gap-2">
              <span>🎯</span>
              <span>1. Tournez la Roue pour Découvrir votre Don</span>
            </h2>
            <p className="text-xs text-amber-300 font-bold">
              ⚡ Dès que la roue s'arrête, la fenêtre de réclamation s'ouvrira automatiquement !
            </p>
          </div>

          {/* THE GAME COMPONENT */}
          <FortuneWheelGame onWin={handleWin} />
        </div>

        {/* MANUAL TRIGGER BUTTON IN CASE USER WANTS TO RE-OPEN THE MODAL */}
        {wonPrizeName && (
          <div className="p-5 rounded-3xl bg-emerald-950/60 border-2 border-emerald-500 text-center space-y-3 shadow-xl">
            <p className="text-emerald-300 font-extrabold text-sm sm:text-base">
              🎉 Votre Récompense Découverte : <span className="text-white underline">{wonPrizeName}</span>
            </p>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-transform hover:scale-105 cursor-pointer shadow-lg"
            >
              <span>Ouvrir à nouveau le formulaire pour récupérer mon don 📲</span>
            </button>
          </div>
        )}

        {/* ADMIN SHORTCUT FOOTER CARD */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border-2 border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl">
              🛡️
            </div>
            <div>
              <p className="text-xs font-black text-white">Espace Administrateur</p>
              <p className="text-[11px] text-slate-400">Pour consulter et configurer les attributions de dons.</p>
            </div>
          </div>

          <Link
            href="/admin"
            className="px-4 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-black text-xs transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>Administration</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      {/* AUTOMATIC POP-UP MODAL WHEN WINNING */}
      <ClaimRewardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        prizeName={wonPrizeName}
      />

      <footer className="py-6 border-t border-slate-900 bg-slate-950 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Plateforme Dons Spéciaux — Jeu Concours & Redirection WhatsApp.</p>
          <Link href="/admin" className="hover:text-slate-300 transition-colors font-semibold">
            Tableau de Bord Admin
          </Link>
        </div>
      </footer>
    </div>
  );
}
