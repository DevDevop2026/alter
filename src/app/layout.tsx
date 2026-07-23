import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dons Spéciaux — Code Unique & Redirection WhatsApp",
  description: "Plateforme de gestion de dons spéciaux avec génération algorithmique de code unique, notification administrateur et redirection WhatsApp.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body className="antialiased selection:bg-emerald-500 selection:text-slate-950">
        <div className="min-h-screen bg-[var(--color-bg)] text-slate-900">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
