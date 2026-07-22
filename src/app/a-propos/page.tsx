"use client";

import { useEffect, useState } from "react";

const donors = [
  { name: "Elon Musk", src: "https://i.pravatar.cc/500?u=elon" },
  { name: "Pepe Millionnaire", src: "https://i.pravatar.cc/500?u=pepe" },
  { name: "Alain", src: "https://i.pravatar.cc/500?u=alain" },
];

export default function AProposPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % donors.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-6 text-center">À propos</h1>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-full max-w-md">
              <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-800">
                {donors.map((d, i) => (
                  <img
                    key={d.name}
                    src={d.src}
                    alt={d.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                      i === index ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold">Nos donateurs</h2>
              <p className="text-sm text-slate-400 mt-2">{donors[index].name}</p>
            </div>

            <div className="pt-4 text-slate-300 text-sm leading-relaxed">
              <p>
                Bienvenue sur le jeu concours: "Dons Spéciaux". Le principe est simple — participez au jeu, gagnez un code unique et contactez le donateur via WhatsApp pour récupérer votre don. Les photos ci-dessus présentent quelques-uns de nos donateurs (exemples) qui soutiennent l'initiative.
              </p>
              <p className="mt-3">
                Le jeu est accessible, responsive et sécurisé. Après avoir obtenu votre code, utilisez le bouton de validation pour contacter le donateur et finaliser la récupération du don.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
