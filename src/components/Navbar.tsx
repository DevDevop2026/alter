"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, ShieldCheck, Gift } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight text-white block leading-tight">
                Dons Spéciaux
              </span>
              <span className="text-xs text-slate-400 block font-mono">
                Système de Code Unique
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname === "/"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Heart className="w-4 h-4 text-emerald-400" />
              <span>Accueil</span>
            </Link>

            <Link
              href="/jeu"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname?.startsWith("/jeu")
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v18l15-9L5 3z" />
              </svg>
              <span>Jeu</span>
            </Link>

            <Link
              href="/a-propos"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname?.startsWith("/a-propos")
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
              <span>À propos</span>
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname?.startsWith("/contact")
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8a2 2 0 00-2-2h-3.586a1 1 0 00-.707.293l-1.414 1.414a1 1 0 01-.707.293H9a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2V8z" />
              </svg>
              <span>Contact</span>
            </Link>

            <Link
              href="/temoignages"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname?.startsWith("/temoignages")
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 8h10M7 12h6" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V12" />
              </svg>
              <span>Témoignages</span>
            </Link>

            <Link
              href="/admin"
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                pathname?.startsWith("/admin")
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span className="sr-only">Espace Admin</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
