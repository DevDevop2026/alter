import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { I18nProvider } from "@/components/I18nProvider";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const description =
  "Proyecto Solidaridad es una iniciativa solidaria de Almira Aldahab Foundation, dirigida por Amira, con un juego solidario, donaciones y una participación transparente.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Proyecto Solidaridad — Almira Aldahab Foundation",
    template: "%s — Almira Aldahab Foundation",
  },
  description,
  keywords: [
    "Proyecto Solidaridad",
    "Almira Aldahab Foundation",
    "Amira directora ejecutiva",
    "iniciativa solidaria",
    "juego solidario",
    "donaciones",
    "participación transparente",
    "código único",
    "WhatsApp",
  ],
  applicationName: "Almira Aldahab Foundation",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: "Almira Aldahab Foundation",
    title: "Proyecto Solidaridad — Almira Aldahab Foundation",
    description,
    images: [
      {
        url: "/images/recompense/1787388667061.jpg",
        alt: "Entrega de un premio en Proyecto Solidaridad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyecto Solidaridad — Almira Aldahab Foundation",
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
    <html lang="es">
      <body className="antialiased selection:bg-emerald-500 selection:text-slate-950">
        <I18nProvider>
          <div className="min-h-screen bg-(--color-bg) text-slate-900">
            <Navbar />
            {children}
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
