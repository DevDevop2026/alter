"use client";

import dynamic from "next/dynamic";
import { PROFIL_IMAGES, RECOMPENSE_IMAGES, TEMOIGNAGE_IMAGES } from "@/lib/gallery";
import type { Testimonial } from "@/components/TestimonialsCarousel";

const TestimonialsCarousel = dynamic(
  () => import("@/components/TestimonialsCarousel").then((m) => m.TestimonialsCarousel),
  { ssr: false }
);
const RewardsGallery = dynamic(
  () => import("@/components/RewardsGallery").then((m) => m.RewardsGallery),
  { ssr: false }
);

/** Témoignages : portrait et photo réels issus de /public/images. */
const TESTIMONIALS: Testimonial[] = [
  {
    name: "María García",
    country: "Espagne",
    prize: "30 000 $ reçus",
    message: "J’ai reçu 30 000 dollars, c’est incroyable !",
  },
  {
    name: "João Silva",
    country: "Brésil",
    prize: "Voiture neuve",
    message: "J’ai gagné une voiture neuve, la qualité du service est top.",
  },
  {
    name: "Ana Pereira",
    country: "Brésil",
    prize: "Moto offerte",
    message: "Merci ! On m’a offert une moto, je suis très reconnaissante.",
  },
  {
    name: "Carlos Ruiz",
    country: "Espagne",
    prize: "Gros cadeau",
    message: "Une expérience formidable, j’ai obtenu un gros cadeau.",
  },
  {
    name: "Fernanda Costa",
    country: "Brésil",
    prize: "Bijoux",
    message:
      "Je pensais que c’était une blague mais j’ai été surprise d’avoir remporté des bijoux, je recommande vivement.",
  },
  {
    name: "Sofia Martinez",
    country: "Espagne",
    prize: "Prix surprise",
    message: "J’ai reçu un superbe prix, je suis ravie !",
  },
  {
    name: "Pedro Lopes",
    country: "Brésil",
    prize: "Don spécial",
    message: "Simple et efficace, j’ai gagné quelque chose d’incroyable.",
  },
  {
    name: "Isabela Nunes",
    country: "Brésil",
    prize: "Récompense remise",
    message: "Très sérieux et professionnel, merci beaucoup.",
  },
  {
    name: "Miguel Hernández",
    country: "Espagne",
    prize: "Cadeau réel",
    message: "Je suis tombé des nues, le cadeau était réel !",
  },
  {
    name: "Laura Gómez",
    country: "Espagne",
    prize: "Beau présent",
    message: "Service impeccable, j’ai reçu un beau présent.",
  },
].map((testimonial, index) => ({
  ...testimonial,
  avatar: PROFIL_IMAGES[index % PROFIL_IMAGES.length].src,
  photo: TEMOIGNAGE_IMAGES[index % TEMOIGNAGE_IMAGES.length].src,
}));

export default function TemoignagesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="mx-auto max-w-5xl space-y-10 px-4">
        <header className="text-center">
          <h1 className="text-3xl font-extrabold mb-3">Témoignages</h1>
          <p className="mx-auto max-w-2xl text-sm text-slate-400">
            Ils ont participé au jeu Projet Solidarité et ont reçu leur don. Retrouvez leurs messages,
            leurs photos et les récompenses réellement remises.
          </p>
        </header>

        <TestimonialsCarousel testimonials={TESTIMONIALS} />

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">📸 Photos de nos gagnants</h2>
          <p className="max-w-3xl text-sm text-slate-400">
            Quelques instants partagés avec les gagnants au moment de la remise de leur récompense.
          </p>
          <RewardsGallery items={TEMOIGNAGE_IMAGES} initialCount={8} tone="dark" />
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-extrabold">🏆 Récompenses remises</h2>
          <p className="max-w-3xl text-sm text-slate-400">
            La liste de nos récompenses déjà remises : chaque code tiré et validé donne lieu à une remise réelle.
          </p>
          <RewardsGallery items={RECOMPENSE_IMAGES} initialCount={8} tone="dark" />
        </section>
      </div>
    </div>
  );
}
