"use client";

import { useTranslation } from "react-i18next";
import { PageShell } from "@/components/PageShell";

type PolicySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function PrivacyPolicyContent() {
  const { t } = useTranslation();
  const sections = t("privacy.sections", { returnObjects: true }) as PolicySection[];

  return (
    <div className="min-h-screen bg-(--color-bg) text-slate-900">
      <PageShell
        title={t("privacy.title")}
        eyebrow={t("privacy.eyebrow")}
        description={t("privacy.description")}
        align="left"
      >
        <div className="space-y-8 text-left">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-sm text-slate-600">
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </PageShell>
    </div>
  );
}
