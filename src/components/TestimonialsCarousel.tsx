"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Trophy } from "lucide-react";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";
import { useTranslation } from "react-i18next";

export interface Testimonial {
  name: string;
  country: string;
  avatar: string;
  message: string;
  /** Photo du gagnant (facultative) affichée à côté du témoignage. */
  photo?: string;
  /** Récompense remportée (facultative). */
  prize?: string;
}

export function TestimonialsCarousel({
  testimonials,
  intervalMs = 5500,
}: {
  testimonials: Testimonial[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const { t } = useTranslation();
  const reducedMotion = usePrefersReducedMotion();
  const len = testimonials.length;

  useEffect(() => {
    if (len <= 1 || paused || reducedMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % len), intervalMs);
    return () => window.clearInterval(id);
  }, [intervalMs, len, paused, reducedMotion]);

  const goTo = useCallback(
    (next: number) => {
      if (len === 0) return;
      setIndex(((next % len) + len) % len);
    },
    [len]
  );

  if (!len) return null;

  const current = testimonials[index];

  return (
    <div
      role="region"
      aria-roledescription="carrousel"
      aria-label={t("testimonialCarousel.aria")}
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold">{t("testimonials.title")}</h2>
          <div className="text-sm text-slate-400">
            {index + 1} / {len}
          </div>
        </div>

        <div key={current.name + index} className="testimonial-fade grid gap-5 sm:grid-cols-[9rem_1fr] sm:items-center">
          {current.photo ? (
            <div className="relative mx-auto h-36 w-36 shrink-0 overflow-hidden rounded-2xl border border-slate-800 sm:mx-0 sm:h-40 sm:w-40">
              <Image
                src={current.photo}
                alt={t("testimonialCarousel.photo", { name: current.name })}
                fill
                sizes="(max-width: 640px) 144px, 160px"
                className="object-cover"
              />
            </div>
          ) : null}

          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-emerald-500/40">
                <Image
                  src={current.avatar}
                  alt={t("testimonialCarousel.portrait", { name: current.name })}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </span>
              <div className="min-w-0">
                <div className="truncate font-bold text-lg">{current.name}</div>
                <div className="text-sm text-slate-400">{current.country}</div>
              </div>
            </div>

            {current.prize ? (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                <Trophy className="h-3.5 w-3.5" />
                {current.prize}
              </span>
            ) : null}

            <p className="mt-3 flex gap-2 text-slate-300 text-sm sm:text-base">
              <Quote className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500/70" />
              <span>{current.message}</span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          {len > 1 && (
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label={t("testimonialCarousel.previous")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-emerald-500/60 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}

          <div className="flex items-center gap-2">
            {testimonials.map((testimonial, i) => (
              <button
                key={testimonial.name + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={t("testimonialCarousel.show", { number: i + 1 })}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-emerald-400" : "w-2 bg-slate-700 hover:bg-slate-600"
                }`}
              />
            ))}
          </div>

          {len > 1 && (
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label={t("testimonialCarousel.next")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-700 text-slate-300 transition-colors hover:border-emerald-500/60 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function MiniTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const { t: translate } = useTranslation();

  if (testimonials.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-2xl border border-emerald-100 bg-[#f8fcfa] p-4 shadow-sm">
        <div className={`py-2 ${reducedMotion ? "overflow-x-auto" : "overflow-hidden"}`}>
          <div className={`flex gap-4 ${reducedMotion ? "" : "testimonial-marquee w-max"}`}>
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={`${t.name}-${i}`}
                aria-hidden={i >= testimonials.length}
                className="w-60 shrink-0 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image
                      src={t.avatar}
                      alt={translate("testimonialCarousel.portrait", { name: t.name })}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.country}</div>
                  </div>
                </div>
                {t.prize ? (
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-700">
                    <Trophy className="h-3 w-3" />
                    {t.prize}
                  </span>
                ) : null}
                <p className="mt-3 text-sm leading-6 text-slate-600">“{t.message}”</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
