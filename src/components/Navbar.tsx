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
              <span>Nouveau Don</span>
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
              <span>Espace Admin</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
