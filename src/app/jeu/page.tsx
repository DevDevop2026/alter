"use client";

import { useState } from "react";
import Link from "next/link";
import { HeroCarousel } from "@/components/HeroCarousel";
import { PageShell } from "@/components/PageShell";
import { HERO_SLIDES } from "@/lib/gallery";

const DEFAULT_ADMIN_WHATSAPP = "2250700000000";

function generateCode(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export default function JeuPage() {
  const [started, setStarted] = useState(false);
  const [form, setForm] = useState({ nom: "", prenom: "", pays: "", tel: "" });
  const [code, setCode] = useState<string | null>(null);

  const adminNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER ?? DEFAULT_ADMIN_WHATSAPP;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newCode = generateCode(8);
    setCode(newCode);
  }

  function buildWhatsAppUrl() {
    const message = `Bonjour, je souhaite valider mon jeu.\nCode: ${code}\nNom: ${form.nom}\nPrénom: ${form.prenom}\nPays: ${form.pays}\nNuméro WhatsApp: ${form.tel}`;
    const encoded = encodeURIComponent(message);
    const cleaned = String(adminNumber).replace(/[^0-9+]/g, "");
    const waNumber = cleaned.replace(/^\+/, "");
    return `https://wa.me/${waNumber}?text=${encoded}`;
  }

  return (
    <div className="min-h-screen bg-(--color-bg) text-slate-900">
      <PageShell
        title="Jeu"
        description="Participez au jeu solidaire Projet Solidarité, renseignez vos informations et obtenez votre code unique pour suivre la validation de votre don."
      >
        <div
          className="relative overflow-hidden rounded-3xl border border-emerald-200/70 bg-emerald-50/70 p-4 shadow-sm sm:p-6"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,253,250,0.38), rgba(239,246,255,0.38)), url('/images/recompense/1787389819218.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="relative mx-auto mb-8 max-w-2xl rounded-3xl border border-emerald-100 bg-white/75 p-4 shadow-sm sm:p-6">
            <HeroCarousel slides={HERO_SLIDES} />
          </div>

          {!started ? (
          <div className="relative flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-emerald-200 bg-white/55 p-8 text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Comment participer au jeu solidaire</h2>
            <div className="max-w-2xl text-left text-sm text-slate-600">
              <p className="mb-3 font-medium text-slate-700">Pour participer à <strong>Projet Solidarité</strong>, l’initiative solidaire d’Almira Aldahab Foundation :</p>
              <ol className="list-decimal space-y-2 pl-5">
                <li>Cliquez sur le bouton <strong>“Entrer dans le jeu”</strong>.</li>
                <li>Remplissez correctement le formulaire avec vos informations (<strong>Nom, Prénom, Pays, Numéro WhatsApp</strong>).</li>
                <li>Après validation, le système génère automatiquement un <strong>code unique de 8 caractères alphanumériques</strong>.</li>
                <li>Envoyez ce code aux organisateurs via WhatsApp pour confirmer votre participation.</li>
                <li>L’équipe vérifie votre code et vous informe de la suite du processus lié à votre don ou à votre récompense.</li>
              </ol>
            </div>
            <button
              onClick={() => setStarted(true)}
              className="btn-primary"
            >
              Entrer dans le jeu
            </button>
          </div>
          ) : (
          <div className="relative rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm">
            {!code ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="nom">Nom</label>
                    <input id="nom" name="nom" required value={form.nom} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="prenom">Prénom</label>
                    <input id="prenom" name="prenom" required value={form.prenom} onChange={handleChange} />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="form-field">
                    <label htmlFor="pays">Pays</label>
                    <input id="pays" name="pays" required value={form.pays} onChange={handleChange} />
                  </div>
                  <div className="form-field">
                    <label htmlFor="tel">Numéro WhatsApp</label>
                    <input id="tel" name="tel" required value={form.tel} onChange={handleChange} placeholder="+22570..." />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="btn-primary">Générer mon code</button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Votre code généré</p>
                <div className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-4 text-xl font-black tracking-[0.3em] text-white">
                  {code}
                </div>

                <div className="space-y-2">
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="btn-primary">
                    Valider ma participation
                  </a>
                  <p className="text-sm text-slate-600">Vous serez redirigé vers WhatsApp pour transmettre votre code et confirmer votre participation auprès de l’équipe.</p>
                </div>

                <div className="pt-2">
                  <Link href="/" className="text-sm font-semibold text-emerald-700 underline">
                    Retour à l’accueil
                  </Link>
                </div>
              </div>
            )}
          </div>
          )}
        </div>
      </PageShell>
    </div>
  );
}
