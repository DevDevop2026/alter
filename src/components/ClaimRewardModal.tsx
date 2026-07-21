"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Trophy,
  User,
  Phone,
  Mail,
  Sparkles,
  Send,
  AlertCircle,
  Key,
  Check,
  Gift,
  X,
  PhoneCall,
} from "lucide-react";
import { AudioAssistant } from "./AudioAssistant";

interface ClaimRewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  prizeName: string;
}

export function ClaimRewardModal({
  isOpen,
  onClose,
  prizeName,
}: ClaimRewardModalProps) {
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

  const vocalScript =
    "Bravo ! Vous avez gagné un Don Spécial ! Pour récupérer votre récompense, remplissez simplement votre nom, votre prénom et votre numéro de téléphone ci-dessous. Appuyez ensuite sur le grand bouton vert pour obtenir votre code unique et contacter l'administrateur sur WhatsApp.";

  if (!isOpen) return null;

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
        errs.telephone = "⚠️ Numéro invalide (minimum 6 chiffres).";
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
        setServerError(data.message || "Erreur lors de la réservation de votre don.");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem(`don_${data.don.id}`, JSON.stringify(data));
      }

      // Route to success page with full confetti & WhatsApp auto-redirect
      router.push(`/succes?id=${data.don.id}`);
    } catch (err) {
      console.error("Form submit error:", err);
      setServerError("Erreur de réseau. Veuillez vérifier votre connexion.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
      <div className="max-w-xl w-full bg-slate-900 border-4 border-emerald-500 rounded-3xl shadow-2xl relative my-8 overflow-hidden">
        
        {/* TOP GLOW HEADER */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 p-6 text-slate-950 text-center relative">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-950/20 hover:bg-slate-950/40 text-slate-950 flex items-center justify-center font-bold transition-colors cursor-pointer"
            title="Fermer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="w-16 h-16 rounded-2xl bg-slate-950 text-amber-300 flex items-center justify-center text-3xl font-black mx-auto mb-2 shadow-xl animate-bounce">
            🎉
          </div>

          <span className="inline-block px-3 py-1 bg-slate-950/20 text-slate-950 font-black text-xs uppercase tracking-widest rounded-full mb-1">
            FÉLICITATIONS ! VOUS AVEZ GAGNÉ !
          </span>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {prizeName || "Grand Don Spécial DÉCOUVERT !"}
          </h2>

          <div className="mt-3 flex justify-center">
            <AudioAssistant
              textToSpeak={vocalScript}
              label="Écouter les instructions vocales 🔊"
              className="bg-slate-950 text-emerald-300 border-slate-900 hover:bg-slate-900"
            />
          </div>
        </div>

        {/* POPUP FORM BODY */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          <p className="text-center text-xs sm:text-sm font-bold text-emerald-400 bg-emerald-500/10 p-3 rounded-2xl border border-emerald-500/30">
            👉 Remplissez vos coordonnées pour valider et recevoir votre code unique :
          </p>

          {serverError && (
            <div className="p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-500/40 text-rose-200 flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <p className="font-semibold">{serverError}</p>
            </div>
          )}

          {/* MODE SELECTOR */}
          <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Choix du Code Unique :
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCodeMode("AUTO")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  codeMode === "AUTO"
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                ✨ Automatique
              </button>

              <button
                type="button"
                onClick={() => setCodeMode("MANUAL")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  codeMode === "MANUAL"
                    ? "bg-emerald-500 text-slate-950 font-black"
                    : "bg-slate-900 text-slate-400 hover:text-white"
                }`}
              >
                🔑 Choisir Code
              </button>
            </div>

            {codeMode === "MANUAL" && (
              <input
                type="text"
                name="codeChoice"
                value={formData.codeChoice}
                onChange={handleChange}
                placeholder="Exemple: B-O028"
                maxLength={7}
                className="w-full mt-2 px-3 py-2 bg-slate-900 border border-emerald-500 rounded-xl text-white font-mono font-bold text-xs uppercase"
              />
            )}
            {errors.codeChoice && <p className="text-xs text-rose-400 font-bold">{errors.codeChoice}</p>}
          </div>

          {/* NOM */}
          <div>
            <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-1">
              1. Votre Nom <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Exemple : KOUASSI"
              className={`w-full px-4 py-3 bg-slate-950 border-2 ${
                errors.nom ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"
              } rounded-xl text-white font-semibold text-sm focus:outline-none`}
            />
            {errors.nom && <p className="text-xs text-rose-400 font-bold mt-1">{errors.nom}</p>}
          </div>

          {/* PRENOM */}
          <div>
            <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-1">
              2. Votre Prénom <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              name="prenom"
              value={formData.prenom}
              onChange={handleChange}
              placeholder="Exemple : Jean-Marc"
              className={`w-full px-4 py-3 bg-slate-950 border-2 ${
                errors.prenom ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"
              } rounded-xl text-white font-semibold text-sm focus:outline-none`}
            />
            {errors.prenom && <p className="text-xs text-rose-400 font-bold mt-1">{errors.prenom}</p>}
          </div>

          {/* TELEPHONE */}
          <div>
            <label className="block text-xs font-extrabold text-slate-200 uppercase tracking-wider mb-1">
              3. Votre Téléphone <span className="text-rose-400">*</span>
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              placeholder="Exemple : 07 01 02 03 04"
              className={`w-full px-4 py-3 bg-slate-950 border-2 ${
                errors.telephone ? "border-rose-500" : "border-slate-800 focus:border-emerald-500"
              } rounded-xl text-white font-mono font-semibold text-sm focus:outline-none`}
            />
            {errors.telephone && <p className="text-xs text-rose-400 font-bold mt-1">{errors.telephone}</p>}
          </div>

          {/* EMAIL OPTIONAL */}
          <div>
            <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-1">
              4. Votre Email (Optionnel)
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Exemple : exemple@email.com (facultatif)"
              className="w-full px-4 py-2.5 bg-slate-950 border-2 border-slate-800 focus:border-emerald-500 rounded-xl text-white text-xs"
            />
            {errors.email && <p className="text-xs text-rose-400 font-bold mt-1">{errors.email}</p>}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-lg shadow-xl shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-emerald-300 mt-2"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                <span>Génération du Code en cours...</span>
              </>
            ) : (
              <>
                <PhoneCall className="w-5 h-5" />
                <span>VALIDEZ ET RÉCUPÉRER SUR WHATSAPP 📲</span>
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
}
