"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";

const donors = [
  { name: "Elown Musk", src: "https://i.pravatar.cc/500?u=elon" },
  { name: "Pépé Milionario", src: "https://i.pravatar.cc/500?u=pepe" },
  { name: "Keanu Reeves", src: "https://i.pravatar.cc/500?u=keanu" },
];

export default function AProposPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % donors.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-(--color-bg) text-slate-900">
      <PageShell
        title="À propos de Projet Solidarité"
        eyebrow="Transparence • confiance"
        description="Découvrez l’objectif du projet, son fonctionnement et la vision qui guide chaque participation."
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-(--color-surface-alt) p-4">
            <div className="relative h-64 overflow-hidden rounded-2xl bg-white">
              {donors.map((donor, i) => (
                <div
                  key={donor.name}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={donor.src}
                    alt={donor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-slate-700">{donors[index].name}</p>
          </div>

          <div className="space-y-4 text-left">
            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">🌍 À propos de Projet Solidarité</h2>
              <p className="mt-2 text-sm text-slate-600">
                <strong>Projet Solidarité</strong> est une initiative unique qui allie entraide et divertissement. Notre mission est simple : offrir des dons aux participants grâce à un jeu interactif basé sur la chance et la transparence.
              </p>
            </div>

            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">🎮 Comment ça marche ?</h2>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li>• Chaque utilisateur remplit un formulaire avec son <strong>nom, prénom et numéro WhatsApp</strong>.</li>
                <li>• Une fois validé, le système génère automatiquement un <strong>code alphanumérique de 8 caractères</strong>, unique pour chaque joueur.</li>
                <li>• Ce code est ensuite envoyé directement aux organisateurs via WhatsApp.</li>
                <li>• Les organisateurs vérifient le code et annoncent le lot gagné, qui est ensuite remis au participant.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Chaque joueur ne peut participer qu’une seule fois, garantissant l’équité et la fiabilité du processus.
              </p>
            </div>

            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">🤝 Nos donateurs</h2>
              <p className="mt-2 text-sm text-slate-600">
                Le projet est rendu possible grâce à la générosité de personnalités inspirantes :
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li><strong>Elown Musk</strong> – symbole d’innovation et de vision futuriste.</li>
                <li><strong>Pépé Milionario</strong> – figure de réussite et de partage.</li>
                <li><strong>Keanu Reeves</strong> – acteur mondialement reconnu, apprécié pour son humilité et son engagement humanitaire.</li>
              </ul>
              <p className="mt-3 text-sm text-slate-600">
                Ces donateurs incarnent l’esprit de solidarité et contribuent à rendre chaque participation significative.
              </p>
            </div>

            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">🌟 Notre vision</h2>
              <p className="mt-2 text-sm text-slate-600">
                Nous croyons que la solidarité peut prendre des formes nouvelles et ludiques. En transformant un simple jeu en opportunité de recevoir un don, nous créons un espace où la chance rencontre la générosité.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                <strong>Projet Solidarité</strong> n’est pas seulement un site de jeu, c’est une communauté où chaque code tiré est une promesse de partage et d’espoir.
              </p>
            </div>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
