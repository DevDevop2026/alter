"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  Sparkles,
  Send,
  AlertCircle,
  Key,
  Check,
  Gift,
  HelpCircle,
} from "lucide-react";
import { AudioAssistant } from "./AudioAssistant";

export function DonationForm() {
  const router = useRouter();

  const [codeMode, setCodeMode] = useState<"AUTO" | "MANUAL">("AUTO");
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    codeChoice: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const formAudioScript =
    "Bienvenue ! Pour recevoir votre don spécial, remplissez trois informations simples. Premièrement : votre nom de famille. Deuxièmement : votre prénom. Troisièmement : votre numéro de téléphone. Si vous avez un email, c'est optionnel. Vous pouvez ensuite appuyer sur le grand bouton vert tout en bas pour obtenir votre code unique et parler directement avec l'administrateur sur WhatsApp.";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "codeChoice" ? value.toUpperCase() : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) {
      setServerError(null);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!formData.nom.trim()) {
      errs.nom = "⚠️ Entrez votre Nom s'il vous plaît.";
    } else if (formData.nom.trim().length < 2) {
      errs.nom = "⚠️ Le nom doit comporter au moins 2 lettres.";
    }

    if (!formData.prenom.trim()) {
      errs.prenom = "⚠️ Entrez votre Prénom s'il vous plaît.";
    } else if (formData.prenom.trim().length < 2) {
      errs.prenom = "⚠️ Le prénom doit comporter au moins 2 lettres.";
    }

    if (!formData.telephone.trim()) {
      errs.telephone = "⚠️ Entrez votre Numéro de Téléphone s'il vous plaît.";
    } else {
      const digits = formData.telephone.replace(/\D/g, "");
      if (digits.length < 6) {
        errs.telephone = "⚠️ Téléphone invalide (minimum 6 chiffres).";
      }
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errs.email = "⚠️ Format de l'adresse email incorrect.";
      }
    }

    if (codeMode === "MANUAL") {
      const formatted = formData.codeChoice.trim().toUpperCase();
      const codeRegex = /^[A-Z]-[A-Z]\d{3}$/;
      if (!formatted) {
        errs.codeChoice = "⚠️ Saisissez votre code (exemple : B-O028).";
      } else if (!codeRegex.test(formatted)) {
        errs.codeChoice = "⚠️ Le code doit respecter le format L1-L2NNN (ex: B-O028).";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        telephone: formData.telephone,
        email: formData.email,
        codeChoice: codeMode === "MANUAL" ? formData.codeChoice : undefined,
      };

      const res = await fetch("/api/don-specials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(data.message || "Impossible d'enregistrer. Veuillez réessayer.");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem(`don_${data.don.id}`, JSON.stringify(data));
      }

      router.push(`/succes?id=${data.don.id}`);
    } catch (err) {
      console.error("Form submit error:", err);
      setServerError("Problème de connexion. Vérifiez votre réseau internet.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* VOCAL INSTRUCTION BANNER FOR NON-READERS */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-lg shrink-0">
            🔊
          </div>
          <div>
            <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Besoin d'aide vocale ?
            </p>
            <p className="text-xs text-slate-300">
              Appuyez sur le bouton pour écouter ce qu'il faut remplir.
            </p>
          </div>
        </div>
        <AudioAssistant textToSpeak={formAudioScript} label="Écouter le guide vocal" />
      </div>

      {serverError && (
        <div className="p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500/40 text-rose-200 flex items-start gap-3 text-sm animate-pulse">
          <AlertCircle className="w-6 h-6 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold text-base">Oups ! Attention</p>
            <p className="font-medium">{serverError}</p>
          </div>
        </div>
      )}

      {/* MODE CHOICE WITH VISUAL ICONS */}
      <div className="p-5 rounded-2xl bg-slate-900 border-2 border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
            <Gift className="w-4 h-4" /> Mode d'attribution du Code
          </span>
          <span className="text-[11px] text-slate-400">Étape 1 sur 2</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => {
              setCodeMode("AUTO");
              setErrors((prev) => ({ ...prev, codeChoice: "" }));
            }}
            className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
              codeMode === "AUTO"
                ? "bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 scale-102"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                codeMode === "AUTO" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
              }`}>
                ✨
              </div>
              <div>
                <p className="text-sm font-bold">Code Automatique</p>
                <p className="text-xs text-slate-400">Le système crée votre code (recommandé)</p>
              </div>
            </div>
            {codeMode === "AUTO" && <Check className="w-6 h-6 text-emerald-400 shrink-0" />}
          </button>

          <button
            type="button"
            onClick={() => setCodeMode("MANUAL")}
            className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between ${
              codeMode === "MANUAL"
                ? "bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 scale-102"
                : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${
                codeMode === "MANUAL" ? "bg-emerald-500 text-slate-950" : "bg-slate-800 text-slate-400"
              }`}>
                🔑
              </div>
              <div>
                <p className="text-sm font-bold">Mon propre Code</p>
                <p className="text-xs text-slate-400">Tapez votre propre code (ex: B-O028)</p>
              </div>
            </div>
            {codeMode === "MANUAL" && <Check className="w-6 h-6 text-emerald-400 shrink-0" />}
          </button>
        </div>

        {codeMode === "MANUAL" && (
          <div className="pt-2 border-t border-slate-800">
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Entrez votre Code personnalisé (Format L1-L2NNN, ex: B-O028)
            </label>
            <input
              type="text"
              name="codeChoice"
              value={formData.codeChoice}
              onChange={handleChange}
              placeholder="B-O028"
              maxLength={7}
              className={`w-full px-4 py-3 bg-slate-950 border-2 ${
                errors.codeChoice ? "border-rose-500" : "border-emerald-500/50 focus:border-emerald-400"
              } rounded-2xl text-white font-mono font-black text-lg tracking-wider uppercase focus:outline-none`}
            />
            {errors.codeChoice && (
              <p className="mt-1.5 text-xs text-rose-400 font-bold">{errors.codeChoice}</p>
            )}
          </div>
        )}
      </div>

      {/* FORM INPUTS WITH BIG ICONS AND VISUAL BADGES */}
      <div className="space-y-4">
        {/* NOM */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="text-xl">👤</span>
              <span>1. Votre NOM DE FAMILLE</span>
              <span className="text-rose-400 font-extrabold">*</span>
            </label>
            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">Obligatoire</span>
          </div>

          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Exemple : KOUASSI"
            className={`w-full px-4 py-3.5 bg-slate-950 border-2 ${
              errors.nom ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-emerald-500"
            } rounded-xl text-white text-base font-semibold placeholder-slate-600 focus:outline-none transition-all`}
          />
          {errors.nom && <p className="text-xs text-rose-400 font-bold mt-1">{errors.nom}</p>}
        </div>

        {/* PRENOM */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="text-xl">✍️</span>
              <span>2. Votre PRÉNOM</span>
              <span className="text-rose-400 font-extrabold">*</span>
            </label>
            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">Obligatoire</span>
          </div>

          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Exemple : Jean-Marc"
            className={`w-full px-4 py-3.5 bg-slate-950 border-2 ${
              errors.prenom ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-emerald-500"
            } rounded-xl text-white text-base font-semibold placeholder-slate-600 focus:outline-none transition-all`}
          />
          {errors.prenom && <p className="text-xs text-rose-400 font-bold mt-1">{errors.prenom}</p>}
        </div>

        {/* TELEPHONE */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-slate-800 space-y-1.5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className="text-xl">📞</span>
              <span>3. Votre TÉLÉPHONE</span>
              <span className="text-rose-400 font-extrabold">*</span>
            </label>
            <span className="text-[10px] uppercase font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-md">Obligatoire</span>
          </div>

          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Exemple : 07 01 02 03 04"
            className={`w-full px-4 py-3.5 bg-slate-950 border-2 ${
              errors.telephone ? "border-rose-500 focus:ring-rose-500" : "border-slate-800 focus:border-emerald-500"
            } rounded-xl text-white text-base font-mono font-semibold placeholder-slate-600 focus:outline-none transition-all`}
          />
          {errors.telephone && <p className="text-xs text-rose-400 font-bold mt-1">{errors.telephone}</p>}
        </div>

        {/* EMAIL OPTIONAL */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border-2 border-slate-800 space-y-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <span className="text-xl">✉️</span>
              <span>4. Votre EMAIL</span>
            </label>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">Facultatif</span>
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Exemple : monadresse@email.com (non obligatoire)"
            className={`w-full px-4 py-3 bg-slate-950 border-2 ${
              errors.email ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"
            } rounded-xl text-white text-sm placeholder-slate-600 focus:outline-none transition-all`}
          />
          {errors.email && <p className="text-xs text-rose-400 font-bold mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* BIG ANIMATED VIBRANT SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-lg sm:text-xl shadow-2xl shadow-emerald-500/30 transition-all duration-300 transform hover:scale-102 active:scale-98 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed border-2 border-emerald-300"
      >
        {loading ? (
          <>
            <div className="w-7 h-7 border-4 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
            <span>Création de votre Code en cours...</span>
          </>
        ) : (
          <>
            <span className="text-2xl animate-bounce">🎁</span>
            <span className="tracking-tight">VALIDER ET OBTEIR MON CODE DON</span>
            <Send className="w-6 h-6" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1.5">
        <Sparkles className="w-4 h-4 text-emerald-400" />
        <span>Une fois validé, vous serez dirigé vers le WhatsApp de l'administrateur.</span>
      </p>
    </form>
  );
}
