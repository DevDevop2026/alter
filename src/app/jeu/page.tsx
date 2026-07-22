"use client";

import { useState } from "react";
import Link from "next/link";
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
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Jeu</h1>

        {!started ? (
          <div className="text-center">
            <button
              onClick={() => setStarted(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm transition-transform hover:scale-105 cursor-pointer shadow-lg"
            >
              Entrer dans le jeu
            </button>
            <p className="text-sm text-slate-400 mt-3">Cliquez pour démarrer et remplir le formulaire de participation.</p>
          </div>
        ) : (
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
            {!code ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-300 font-semibold">Nom</label>
                  <input name="nom" required value={form.nom} onChange={handleChange} className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100" />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 font-semibold">Prénom</label>
                  <input name="prenom" required value={form.prenom} onChange={handleChange} className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100" />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 font-semibold">Pays</label>
                  <input name="pays" required value={form.pays} onChange={handleChange} className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100" />
                </div>

                <div>
                  <label className="block text-sm text-slate-300 font-semibold">Numéro WhatsApp (ex: +22570...)</label>
                  <input name="tel" required value={form.tel} onChange={handleChange} className="mt-1 w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-slate-100" />
                </div>

                <div className="flex justify-end">
                  <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold">Entrer dans le jeu</button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <p className="text-sm text-slate-300">Votre code généré :</p>
                <div className="inline-flex items-center justify-center px-6 py-4 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xl tracking-widest">{code}</div>

                <div className="space-y-2">
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold">
                    Valider votre jeu
                  </a>
                  <p className="text-xs text-slate-400">En cliquant, vous serez redirigé vers WhatsApp pour envoyer vos informations au donateur.</p>
                </div>

                <div className="pt-2">
                  <Link href="/" className="text-sm text-emerald-300 underline">Retour à l'accueil</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
