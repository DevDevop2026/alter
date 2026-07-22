"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
const TestimonialsCarousel = dynamic(() => import("@/components/TestimonialsCarousel").then(m => m.TestimonialsCarousel), { ssr: false });

export default function TemoignagesPage() {
  const testimonials = useMemo(() => [
    { name: 'María García', country: 'Espagne', avatar: 'https://i.pravatar.cc/300?img=11', message: 'J’ai reçu 30 000 dollars, c’est incroyable !' },
    { name: 'João Silva', country: 'Brésil', avatar: 'https://i.pravatar.cc/300?img=12', message: 'J’ai gagné une voiture neuve, la qualité du service est top.' },
    { name: 'Ana Pereira', country: 'Brésil', avatar: 'https://i.pravatar.cc/300?img=13', message: 'Merci ! On m’a offert une moto, je suis très reconnaissante.' },
    { name: 'Carlos Ruiz', country: 'Espagne', avatar: 'https://i.pravatar.cc/300?img=14', message: 'Une expérience formidable, j’ai obtenu un gros cadeau.' },
    { name: 'Fernanda Costa', country: 'Brésil', avatar: 'https://i.pravatar.cc/300?img=15', message: 'Service rapide et cordial, je recommande vivement.' },
    { name: 'Sofia Martinez', country: 'Espagne', avatar: 'https://i.pravatar.cc/300?img=16', message: 'J’ai reçu un superbe prix, je suis ravie !' },
    { name: 'Pedro Lopes', country: 'Brésil', avatar: 'https://i.pravatar.cc/300?img=17', message: 'Simple et efficace, j’ai gagné quelque chose d’incroyable.' },
    { name: 'Isabela Nunes', country: 'Brésil', avatar: 'https://i.pravatar.cc/300?img=18', message: 'Très sérieux et professionnel, merci beaucoup.' },
    { name: 'Miguel Hernández', country: 'Espagne', avatar: 'https://i.pravatar.cc/300?img=19', message: 'Je suis tombé des nues, le cadeau était réel !' },
    { name: 'Laura Gómez', country: 'Espagne', avatar: 'https://i.pravatar.cc/300?img=20', message: 'Service impeccable, j’ai reçu un beau présent.' },
  ], []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Témoignages</h1>
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </div>
  );
}
