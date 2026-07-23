import type { ReactNode } from "react";

type PageShellProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  align?: "left" | "center";
};

export function PageShell({
  title,
  eyebrow,
  description,
  children,
  align = "center",
}: PageShellProps) {
  return (
    <section className="page-shell">
      <div className="page-shell__container">
        <header
          className={`page-shell-card page-shell-card--header ${
            align === "left" ? "items-start text-left" : "items-center text-center"
          }`}
        >
          {eyebrow ? <span className="accent-pill">{eyebrow}</span> : null}
          <h1>{title}</h1>
          {description ? <p>{description}</p> : null}
        </header>

        <div className="page-shell-card page-shell-card--content">{children}</div>
      </div>
    </section>
  );
}
