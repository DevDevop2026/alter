"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PageShell } from "@/components/PageShell";
import { PARTENAIRE_IMAGES, PROFIL_IMAGES } from "@/lib/gallery";
import { usePrefersReducedMotion } from "@/lib/useReducedMotion";

/** Portraits réels de la communauté, servis depuis /public/images/profil. */
const communityPhotos = PROFIL_IMAGES.map((image) => ({
  alt: image.alt,
  src: image.src,
}));

export default function AProposPage() {
  const [index, setIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % communityPhotos.length), 3200);
    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div
      className="a-propos-page min-h-screen bg-(--color-bg) text-slate-900"
      style={{
        backgroundImage:
          "linear-gradient(rgba(247,251,248,0.34), rgba(247,251,248,0.34)), url('/images/temoignages/1787386135816.jpg')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <PageShell
        title="À propos d'Almira Aldahab Foundation"
        eyebrow="Transparence • confiance"
        description="Découvrez la Almira Aldahab Foundation, sa dirigeante Amira, l’initiative solidaire Projet Solidarité et les partenaires qui soutiennent sa vision."
      >
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-(--color-surface-alt) p-4">
            <div className="relative h-64 overflow-hidden rounded-2xl bg-white">
              <Image
                key={communityPhotos[index].src}
                src={communityPhotos[index].src}
                alt={communityPhotos[index].alt}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="testimonial-fade h-full w-full object-contain"
              />
            </div>
            <p className="mt-4 text-center text-sm font-semibold text-slate-700">
              Visages de la communauté solidaire
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">🌍 À propos d&apos;Almira Aldahab Foundation</h2>
              <p className="mt-2 text-sm text-slate-600">
                <strong>Projet Solidarité</strong> est l’initiative solidaire d’<strong>Almira Aldahab Foundation</strong>, dirigée par sa PDG <strong>Amira</strong>. Elle a pour objectif de rapprocher la générosité des participants grâce à un jeu solidaire accessible, une procédure claire et une communication transparente.
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
                Chaque participant suit un parcours précis et ne peut participer qu’une seule fois, afin de renforcer l’équité, la fiabilité et la transparence du jeu solidaire.
              </p>
            </div>

            <div className="info-card">
              <h2 className="text-xl font-semibold text-slate-900">🌟 Notre vision</h2>
              <p className="mt-2 text-sm text-slate-600">
                Nous croyons qu’une initiative solidaire peut être à la fois humaine, moderne et ludique. Projet Solidarité transforme une participation guidée en une occasion de découvrir la générosité, le partage et l’engagement communautaire.
              </p>
              <p className="mt-3 text-sm text-slate-600">
                <strong>Projet Solidarité</strong> est une communauté engagée, portée par la vision d’Amira et de la <strong>Almira Aldahab Foundation</strong>, où chaque participation représente une promesse de partage et d’espoir.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-3xl border border-emerald-100 bg-(--color-surface-alt) p-4">
            <HeroCarousel
              slides={PARTENAIRE_IMAGES}
              ariaLabel="Images des partenaires d'Almira Aldahab Foundation"
              badgeLabel="Images"
              imageFit="contain"
            />
          </div>

          <div className="info-card text-left">
            <h2 className="text-xl font-semibold text-slate-900">Partenariat</h2>
            <p className="mt-2 text-sm text-slate-600">
              Le projet est soutenu par des partenaires engagés aux côtés d’Almira Aldahab Foundation :
            </p>
            <ol className="mt-2 space-y-2 text-sm text-slate-600">
              <li><strong>Partenaire 1 :</strong> Pépé Milionario – engagement, réussite et partage.</li>
              <li><strong>Partenaire 2 :</strong> Keanu Reeves – solidarité, bienveillance et engagement humain.</li>
              <li><strong>Partenaire 3 :</strong> Elon Musk – innovation, ambition et vision d’avenir.</li>
            </ol>
            <p className="mt-3 text-sm text-slate-600">
              Ces partenaires contribuent à faire connaître l’initiative solidaire et à donner du sens à chaque participation.
            </p>
          </div>
        </div>
      </PageShell>
    </div>
  );
}
