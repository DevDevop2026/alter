"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { MediaItem } from "@/lib/gallery";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

type HeroCarouselProps = {
  slides: MediaItem[];
  /** Durée d'affichage d'une image (ms). */
  intervalMs?: number;
  /** Active le préchargement de la première image (LCP). */
  priority?: boolean;
  className?: string;
};

/**
 * Carrousel d'en-tête : met en avant les récompenses remises et les gagnants.
 * - Accessible (région, boutons labellisés, `aria-hidden` sur les diapos inactives)
 * - Autoplay suspendu au survol / focus, désactivé si « mouvement réduit »
 * - Optimisé : seule la 1re image est prioritaire, les autres sont en lazy loading
 */
export function HeroCarousel({
  slides,
  intervalMs = 5000,
  priority = true,
  className = "",
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const total = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  useEffect(() => {
    if (total <= 1 || paused || reducedMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % total), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, paused, reducedMotion, total]);

  if (total === 0) return null;

  const current = slides[index];

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label="Récompenses et gagnants du Projet Solidarité"
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden rounded-3xl border border-white/70 bg-slate-100 shadow-[0_18px_45px_-20px_rgba(15,23,42,0.35)] sm:aspect-16/11">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== index}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 88vw, 460px"
              priority={priority && i === 0}
              className="object-cover"
            />
          </div>
        ))}

        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/10 to-transparent" />

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur">
          <Sparkles className="h-3.5 w-3.5" />
          Preuves en images
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
          <p className="max-w-[75%] text-sm font-semibold text-white drop-shadow-sm sm:text-base">
            {current.caption ?? current.alt}
          </p>
          <span className="shrink-0 rounded-full bg-white/85 px-2.5 py-1 text-xs font-bold text-slate-800">
            {index + 1} / {total}
          </span>
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Image précédente"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow-md transition hover:bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Image suivante"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-slate-800 shadow-md transition hover:bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {slides.map((slide, i) => (
            <button
              key={`dot-${slide.src}`}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Afficher l'image ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-emerald-600" : "w-1.5 bg-emerald-900/25 hover:bg-emerald-700/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
