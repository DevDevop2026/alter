"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AudioAssistant } from "@/components/AudioAssistant";
import { Sparkles, Trophy, Gift, ArrowRight, ShieldCheck, Play } from "lucide-react";
const MiniTestimonials = dynamic(() => import('@/components/TestimonialsCarousel').then(m => m.MiniTestimonials), { ssr: false });
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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <section className="overflow-hidden rounded-4xl border border-emerald-100 bg-[#f8fcfa] shadow-[0_20px_60px_-24px_rgba(15,23,42,0.18)]">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="p-8 sm:p-10 lg:p-12">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                <Sparkles className="h-4 w-4" /> Initiative solidaire
              </span>

              <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Projet Solidarité
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Projet Solidarité est une initiative unique qui allie entraide et divertissement. Ayant à sa tête des partenaire comme Pépé milionnario, Reeky james et elown musk, notre mission est simple : offrir des dons aux participants grâce à un jeu interactif basé sur la chance et la transparence.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Nous croyons que la solidarité peut prendre des formes nouvelles et ludiques. En transformant un simple jeu en opportunité de recevoir un don, nous créons un espace où la chance rencontre la générosité.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Projet Solidarité n’est pas seulement un jeu, c’est une communauté où chaque code tiré est une promesse de partage et d’espoir.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/jeu"
                  className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-transform hover:-translate-y-0.5 hover:bg-emerald-500"
                >
                  <Gift className="h-4 w-4" />
                  <span>Faire un don</span>
                </Link>

                <Link
                  href="/a-propos"
                  className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-emerald-200 hover:text-emerald-700"
                >
                  <ShieldCheck className="h-4 w-4" />
                  <span>En savoir plus</span>
                </Link>
              </div>
            </div>

            <div className="relative bg-linear-to-br from-emerald-50 via-white to-blue-50 p-6 sm:p-8 lg:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_45%)]" />
              <div className="relative rounded-[28px] border border-white/80 bg-white/80 p-6 shadow-inner shadow-emerald-100/70 backdrop-blur">
                <svg viewBox="0 0 420 320" className="h-full w-full" role="img" aria-label="Illustration de solidarité">
                  <rect x="54" y="72" width="312" height="176" rx="28" fill="#f7fbf8" />
                  <circle cx="144" cy="133" r="40" fill="#dff7ea" />
                  <circle cx="276" cy="133" r="40" fill="#dceeff" />
                  <path d="M112 129c0-20 16-36 36-36 13 0 24 7 31 18" stroke="#0f766e" strokeWidth="12" strokeLinecap="round" />
                  <path d="M244 129c0-20-16-36-36-36-13 0-24 7-31 18" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
                  <path d="M146 178c10 16 28 26 48 26 20 0 38-10 48-26" stroke="#0f766e" strokeWidth="12" strokeLinecap="round" />
                  <path d="M132 208c22 10 54 16 84 16 30 0 62-6 84-16" stroke="#2563eb" strokeWidth="12" strokeLinecap="round" />
                  <path d="M160 116c10-14 26-22 44-22 20 0 38 9 50 24" stroke="#10b981" strokeWidth="10" strokeLinecap="round" />
                  <path d="M154 100c10-15 27-24 46-24 18 0 35 8 46 22" stroke="#3b82f6" strokeWidth="10" strokeLinecap="round" />
                  <path d="M178 218l18 20 38-44" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* MAIN GAME CONTAINER */}
        <div className="rounded-3xl border border-emerald-200/70 bg-linear-to-br from-emerald-50 via-white to-blue-50 p-6 shadow-[0_20px_60px_-24px_rgba(16,185,129,0.25)] sm:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-600">Jeu officiel</p>
              <h3 className="mt-3 text-2xl font-black text-slate-900">Participez au jeu Projet Solidarité</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                Remplissez vos informations, recevez votre code unique et poursuivez votre participation selon le processus du jeu.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white/90 p-5 text-left shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900">Comment participer</h4>
              <ol className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                <li>1. Cliquez sur le bouton ci-dessous pour ouvrir la page du jeu.</li>
                <li>2. Remplissez votre nom, prénom, pays et numéro WhatsApp.</li>
                <li>3. Générez votre code unique puis validez votre participation.</li>
              </ol>
              <div className="mt-5">
                <Link href="/jeu" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 font-black text-white transition-transform hover:-translate-y-0.5 hover:bg-emerald-500">
                  <Play className="h-4 w-4" />
                  <span>Entrer dans le jeu</span>
                </Link>
              </div>
            </div>
          </div>
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

        {/* MINI TESTIMONIALS SLIDER (extrait en bas de la page d'accueil) */}
        <div className="pt-8">
          {/* lazy load testimonials data inline to avoid extra imports */}
          <div className="max-w-5xl mx-auto px-4">
            {/* Import the component client-side (dynamic with ssr:false) */}
            {/* Rendu direct — le composant est chargé client-side via dynamic({ ssr:false }) */}
            <MiniTestimonials testimonials={[
              { name: 'María García', country: 'Espagne', avatar: 'https://i.pravatar.cc/150?img=11', message: 'J\u2019ai reçu 30\u2009000 dollars, je n’en reviens toujours pas !' },
              { name: 'João Silva', country: 'Brésil', avatar: 'https://i.pravatar.cc/150?img=12', message: 'J\u2019ai gagné une voiture neuve, merci beaucoup !' },
              { name: 'Lucía Fernández', country: 'Espagne', avatar: 'https://i.pravatar.cc/150?img=13', message: 'Service rapide et fiable, on m\u2019a offert une moto.' },
            ]} />
            </div>
        </div>
      </main>


      <footer className="border-t border-slate-800/80 bg-slate-950/95 py-8 text-sm text-slate-400">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-semibold text-slate-200">Projet Solidarité</p>
            <p className="mt-1">Des dons, de la chance et une vraie expérience de solidarité.</p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" className="transition-colors hover:text-emerald-400">
              Accueil
            </Link>
            <Link href="/jeu" className="transition-colors hover:text-emerald-400">
              Jeu
            </Link>
            <Link href="/a-propos" className="transition-colors hover:text-emerald-400">
              À propos
            </Link>
            <Link href="/contact" className="transition-colors hover:text-emerald-400">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
