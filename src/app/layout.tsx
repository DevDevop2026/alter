import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Projet Solidarité est une initiative solidaire d’Almira Aldahab Foundation, dirigée par Amira, sa PDG, avec un jeu solidaire, des dons et une participation transparente.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Projet Solidarité — Almira Aldahab Foundation",
    template: "%s — Almira Aldahab Foundation",
  },
  description,
  keywords: [
    "Projet Solidarité",
    "Almira Aldahab Foundation",
    "Amira PDG",
    "initiative solidaire",
    "jeu solidaire",
    "dons",
    "participation transparente",
    "code unique",
    "WhatsApp",
  ],
  applicationName: "Almira Aldahab Foundation",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Almira Aldahab Foundation",
    title: "Projet Solidarité — Almira Aldahab Foundation",
    description,
    images: [
      {
        url: "/images/recompense/1787388667061.jpg",
        alt: "Remise d'une récompense dans le cadre de Projet Solidarité",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projet Solidarité — Almira Aldahab Foundation",
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
        <div className="min-h-screen bg-(--color-bg) text-slate-900">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
