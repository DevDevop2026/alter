"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Gift, Menu, X } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinkClass = (target: string, activeClass: string) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors flex items-center ${
      pathname === target || pathname?.startsWith(target)
        ? activeClass
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#dcefe4] bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 transition-transform group-hover:scale-105">
              <Gift className="h-5 w-5" />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-slate-900">Dons Spéciaux</span>
              <span className="block text-xs font-medium text-slate-500">Code unique • WhatsApp</span>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:text-emerald-700 md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center justify-end gap-2 md:flex">
            <Link href="/" className={navLinkClass("/", "bg-emerald-50 text-emerald-700")}>
              <span>Accueil</span>
            </Link>

            <Link href="/jeu" className={navLinkClass("/jeu", "bg-emerald-50 text-emerald-700")}>
              <span>Jeu</span>
            </Link>

            <Link href="/a-propos" className={navLinkClass("/a-propos", "bg-blue-50 text-blue-700")}>
              <span>À propos</span>
            </Link>

            <Link href="/contact" className={navLinkClass("/contact", "bg-blue-50 text-blue-700")}>
              <span>Contact</span>
            </Link>
          </nav>
        </div>

        <div className={`${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden border-t border-emerald-100 transition-all duration-300 md:hidden`}>
          <nav className="flex flex-col gap-2 px-1 py-3">
            <Link href="/" onClick={() => setOpen(false)} className={navLinkClass("/", "bg-emerald-50 text-emerald-700")}>
              <span>Accueil</span>
            </Link>

            <Link href="/jeu" onClick={() => setOpen(false)} className={navLinkClass("/jeu", "bg-emerald-50 text-emerald-700")}>
              <span>Jeu</span>
            </Link>

            <Link href="/a-propos" onClick={() => setOpen(false)} className={navLinkClass("/a-propos", "bg-blue-50 text-blue-700")}>
              <span>À propos</span>
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)} className={navLinkClass("/contact", "bg-blue-50 text-blue-700")}>
              <span>Contact</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
