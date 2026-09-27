"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinkClass = (target: string, activeClass: string) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition-colors flex items-center ${
      pathname === target || pathname?.startsWith(target)
        ? activeClass
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-[#dcefe4] bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-2">
          <Link href="/" className="group flex min-w-0 items-center gap-3">
            <div>
              <span className="block truncate text-[11px] font-bold tracking-tight text-slate-900 sm:text-lg">Almira Aldahab Foundation</span>
              <span className="hidden text-xs font-medium text-slate-500 sm:block">{t("nav.subtitle")}</span>
            </div>
          </Link>

          <LanguageSwitcher />

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-emerald-200 hover:text-emerald-700 md:hidden"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <nav className="hidden items-center justify-end gap-2 md:flex">
            <Link href="/" className={navLinkClass("/", "bg-emerald-50 text-emerald-700")}>
              <span>{t("nav.home")}</span>
            </Link>

            <Link href="/jeu" className={navLinkClass("/jeu", "bg-emerald-50 text-emerald-700")}>
              <span>{t("nav.game")}</span>
            </Link>

            <Link href="/a-propos" className={navLinkClass("/a-propos", "bg-blue-50 text-blue-700")}>
              <span>{t("nav.about")}</span>
            </Link>

            <Link href="/contact" className={navLinkClass("/contact", "bg-blue-50 text-blue-700")}>
              <span>{t("nav.contact")}</span>
            </Link>

            <Link href="/politique-confidentialite" className={navLinkClass("/politique-confidentialite", "bg-slate-100 text-slate-700")}>
              <span>{t("nav.privacy")}</span>
            </Link>
          </nav>
        </div>

        <div className={`${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden border-t border-emerald-100 transition-all duration-300 md:hidden`}>
          <nav className="flex flex-col gap-2 px-1 py-3">
            <Link href="/" onClick={() => setOpen(false)} className={navLinkClass("/", "bg-emerald-50 text-emerald-700")}>
              <span>{t("nav.home")}</span>
            </Link>

            <Link href="/jeu" onClick={() => setOpen(false)} className={navLinkClass("/jeu", "bg-emerald-50 text-emerald-700")}>
              <span>{t("nav.game")}</span>
            </Link>

            <Link href="/a-propos" onClick={() => setOpen(false)} className={navLinkClass("/a-propos", "bg-blue-50 text-blue-700")}>
              <span>{t("nav.about")}</span>
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)} className={navLinkClass("/contact", "bg-blue-50 text-blue-700")}>
              <span>{t("nav.contact")}</span>
            </Link>

            <Link href="/politique-confidentialite" onClick={() => setOpen(false)} className={navLinkClass("/politique-confidentialite", "bg-slate-100 text-slate-700")}>
              <span>{t("nav.privacy")}</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
