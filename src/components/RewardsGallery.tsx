"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Trophy, X } from "lucide-react";
import type { MediaItem } from "@/lib/gallery";
import { useTranslation } from "react-i18next";

type RewardsGalleryProps = {
  items: MediaItem[];
  /** Nombre d'images affichées avant le bouton « voir plus ». */
  initialCount?: number;
  className?: string;
  /** Thème visuel : fond clair (accueil) ou sombre (page succès). */
  tone?: "light" | "dark";
};

/**
 * Galerie de récompenses remises.
 * - Affichage progressif (les images masquées ne sont jamais téléchargées)
 * - Visionneuse plein écran accessible (Échap / flèches / clic)
 * - next/image : redimensionnement + AVIF/WebP automatiques
 */
export function RewardsGallery({
  items,
  initialCount = 6,
  className = "",
  tone = "light",
}: RewardsGalleryProps) {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useTranslation();

  const visible = expanded ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount;

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (direction: 1 | -1) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        return (current + direction + visible.length) % visible.length;
      });
    },
    [visible.length]
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [close, openIndex, step]);

  const activeItem = openIndex === null ? null : visible[openIndex];

  const isDark = tone === "dark";
  const frameClass = isDark ? "border-slate-800 bg-slate-900/70" : "border-emerald-100 bg-[#f8fcfa]";

  return (
    <div className={`w-full ${className}`}>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((item, index) => (
          <li key={item.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={t("gallery.enlarge", { alt: t("gallery.reward") })}
              className={`group relative block w-full overflow-hidden rounded-2xl border ${frameClass} shadow-sm transition-transform duration-300 hover:-translate-y-0.5`}
            >
              <span className="relative block aspect-4/5 w-full">
                <Image
                  src={item.src}
                  alt={t("gallery.imageAlt", { number: index + 1 })}
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-95" />
                <span className="absolute inset-x-3 bottom-3 flex items-center gap-1.5 text-left text-[11px] font-semibold text-white">
                  <Trophy className="h-3.5 w-3.5 shrink-0 text-amber-300" />
                  <span className="line-clamp-2">{t("gallery.reward")}</span>
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {hasMore && !expanded && (
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className={
              isDark
                ? "inline-flex items-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-bold text-slate-200 transition-colors hover:border-emerald-500/60 hover:text-white"
                : "inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-5 py-3 text-sm font-bold text-emerald-700 transition-colors hover:border-emerald-400 hover:text-emerald-800"
            }
          >
            {t("gallery.more", { count: items.length - initialCount })}
          </button>
        </div>
      )}

      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("gallery.imageAlt", { number: (openIndex ?? 0) + 1 })}
          className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-slate-950/92 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <div className="relative w-full max-w-4xl" onClick={(event) => event.stopPropagation()}>
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 sm:aspect-16/10">
              <Image
                src={activeItem.src}
                alt={t("gallery.imageAlt", { number: (openIndex ?? 0) + 1 })}
                fill
                sizes="(max-width: 1024px) 92vw, 900px"
                className="object-contain"
              />
            </div>

            <p className="mt-3 text-center text-sm font-medium text-slate-300">
              {t("gallery.imageLabel", { number: (openIndex ?? 0) + 1 }) + " — " + ((openIndex ?? 0) + 1) + " / " + visible.length}
            </p>

            <button
              type="button"
              onClick={close}
              aria-label={t("gallery.close")}
              className="absolute right-0 top-0 flex h-10 w-10 -translate-y-full items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:bg-white"
            >
              <X className="h-5 w-5" />
            </button>

            {visible.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label={t("gallery.previous")}
                  className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg transition hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label={t("gallery.next")}
                  className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-900 shadow-lg transition hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
