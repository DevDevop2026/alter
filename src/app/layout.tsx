import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Plateforme de gestion de dons spéciaux avec génération algorithmique de code unique, notification administrateur et redirection WhatsApp.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dons Spéciaux — Code Unique & Redirection WhatsApp",
    template: "%s — Projet Solidarité",
  },
  description,
  keywords: ["dons spéciaux", "Projet Solidarité", "code unique", "WhatsApp", "jeu solidaire"],
  applicationName: "Projet Solidarité",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Projet Solidarité",
    title: "Dons Spéciaux — Projet Solidarité",
    description,
    images: [
      {
        url: "/images/recompense/1787388667061.jpg",
        alt: "Remise d'une récompense à un gagnant du Projet Solidarité",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dons Spéciaux — Projet Solidarité",
    description,
    images: ["/images/recompense/1787388667061.jpg"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7fbf8",
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
