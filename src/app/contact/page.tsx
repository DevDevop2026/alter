"use client";

const DEFAULT_ADMIN_WHATSAPP = "2250700000000";

export default function ContactPage() {
  const adminNumber = process.env.NEXT_PUBLIC_ADMIN_WHATSAPP_NUMBER ?? DEFAULT_ADMIN_WHATSAPP;
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "admin@example.com";
  const cleaned = String(adminNumber).replace(/[^0-9+]/g, "").replace(/^\+/, "");
  const waLink = `https://wa.me/${cleaned}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-extrabold mb-6 text-center">Contact</h1>

        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-center">
          <p className="text-slate-300">Pour toute question ou validation de don, contactez directement le donateur via WhatsApp ou par email.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={waLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-green-600 hover:bg-green-500 text-white font-bold">
              WhatsApp
            </a>

            <a href={`mailto:${adminEmail}`} className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold">
              Email
            </a>
          </div>

          <p className="text-xs text-slate-500">Numéro WhatsApp du donateur : <span className="font-mono">{adminNumber}</span></p>
          <p className="text-xs text-slate-500">Email : <span className="font-mono">{adminEmail}</span></p>
        </div>
      </div>
    </div>
  );
}
