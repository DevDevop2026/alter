"use client";

import { useEffect, useRef, useState } from "react";

export interface Testimonial {
  name: string;
  country: string;
  avatar: string;
  message: string;
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const len = testimonials.length;
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 3500);
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [len]);

  if (!testimonials.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold">Témoignages</h2>
          <div className="text-sm text-slate-400">{index + 1} / {len}</div>
        </div>

        <div className="h-48 sm:h-56 flex items-center">
          {testimonials.map((t, i) => (
            <div
              key={t.name + i}
              className={`w-full absolute inset-0 transition-opacity duration-700 flex items-center justify-center px-6 ${i === index ? "opacity-100 relative" : "opacity-0"}`}>
              <div className="flex flex-col sm:flex-row items-center gap-6 max-w-3xl">
                <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full object-cover shadow-md" />
                <div>
                  <div className="font-bold text-lg">{t.name} <span className="text-sm text-slate-400">· {t.country}</span></div>
                  <p className="mt-2 text-slate-300 text-sm sm:text-base">"{t.message}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2 h-2 rounded-full transition-opacity ${i === index ? "bg-emerald-400" : "bg-slate-700"}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function MiniTestimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || testimonials.length === 0) return;

    let pos = 0;
    const step = 1;
    const totalScroll = Math.max(1, el.scrollWidth - el.clientWidth);

    const id = window.setInterval(() => {
      pos += step;
      if (pos >= totalScroll) {
        pos = 0;
      }
      el.scrollTo({ left: pos, behavior: "auto" });
    }, 60);

    return () => window.clearInterval(id);
  }, [testimonials.length]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="rounded-2xl border border-emerald-100 bg-[#f8fcfa] p-4 shadow-sm">
        <div ref={containerRef} className="flex gap-4 overflow-x-hidden py-2">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.name}-${i}`}
              className="min-w-60 shrink-0 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.country}</div>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">“{t.message}”</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
