import { useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import AsciiHero from "./AsciiHero";

const EMAIL = "halo.almasrur@gmail.com";

export default function Hero({
  theme,
  onToggleTheme,
  sidebarOpen,
  onToggleSidebar,
}) {
  const { language, setLanguage, t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.assign(`mailto:${EMAIL}`);
    }
  }

  const nextLanguage = language === "id" ? "en" : "id";

  return (
    <section
      id="top"
      className="page-section"
      aria-label={t("profileLabel")}
    >
      <a className="notice" href="#contact">
        <span className="notice-tag">{t("openTag")}</span>
        <span className="notice-shine">{t("noticeText")}</span>
        <span className="notice-go">[{t("contactAction")}]</span>
      </a>

      <div className="top">
        <div className="top-heading">
          {!sidebarOpen && (
            <a className="top-brand" href="#top">
              almas.sys
            </a>
          )}
          <h1>
            Alif Masrur — {t("heroTitle")}
          </h1>
        </div>

        <span className="top-tools">
          <button
            type="button"
            className="ascii-btn"
            aria-expanded={sidebarOpen}
            aria-label={
              sidebarOpen ? t("hideSidebarLabel") : t("showSidebarLabel")
            }
            onClick={onToggleSidebar}
          >
            <span>
              [{sidebarOpen ? `− ${t("sidebar")}` : `+ ${t("sidebar")}`}]
            </span>
          </button>

          <a
            href="/resume-alif-english.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            [{t("VIEW RESUME ↗")}]
          </a>

          <button
            type="button"
            className="ascii-btn"
            aria-label={t("language")}
            onClick={() => setLanguage(nextLanguage)}
          >
            <span>[{language.toUpperCase()}/{nextLanguage.toUpperCase()}]</span>
          </button>

          <button
            type="button"
            className="ascii-btn"
            aria-label={
              theme === "dark" ? t("switchToLight") : t("switchToDark")
            }
            onClick={onToggleTheme}
          >
            <span>[{theme === "dark" ? t("light") : t("dark")}]</span>
          </button>
        </span>
      </div>

      {!sidebarOpen && (
        <nav className="compact-nav" aria-label={t("sections")}>
          <a href="#about">{t("ABOUT")}</a>
          <a href="#experience">{t("EXPERIENCE")}</a>
          <a href="#projects">{t("PROJECTS")}</a>
          <a href="#skills">{t("SKILLS")}</a>
          <a href="#contact">{t("CONTACT")}</a>
        </nav>
      )}

      <AsciiHero onToggleTheme={onToggleTheme} theme={theme} />

      <p className="pitch">{t("heroBio")}</p>

      <div className="term-line">
        <span>$ whoami</span>
        <code>alif-masrur · ALM-ML-2026 · {EMAIL}</code>
        <button
          type="button"
          className="ascii-btn"
          onClick={handleCopyEmail}
        >
          <span>[{copied ? t("copied") : t("copyEmail")}]</span>
        </button>
      </div>
    </section>
  );
}
