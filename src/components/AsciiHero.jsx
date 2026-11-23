import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { experiences } from "../data/experience";
import { projects } from "../data/projects";
import { technologies } from "../data/skills";
import { credentials } from "../data/credentials";

const SHELL_SUGGESTIONS = ["help", "whoami", "exp", "ls", "skills", "certs", "contact", "resume"];

const BANNER_DARK_URL =
  "https://ascii.rest/banner/almas.dark.svg?shadow=ascii&art=ruby&bg=0d1117";
const BANNER_LIGHT_URL =
  "https://ascii.rest/banner/almas.svg?shadow=ascii&art=ruby&bg=0d1117";

export default function AsciiHero({ onToggleTheme, theme }) {
  const { language, t } = useLanguage();
  const [mode, setMode] = useState("banner");

  // Interactive shell state
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const logRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (mode === "shell" && logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [history, mode]);

  function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    let output = "";
    switch (cmd) {
      case "help":
        output =
          language === "id"
            ? "perintah: whoami · about · exp · ls (proyek) · skills · certs · contact · resume · theme · clear"
            : "commands: whoami · about · exp · ls (projects) · skills · certs · contact · resume · theme · clear";
        break;
      case "whoami":
        output = `alif masrur (ALM-9.2 / ALM-ML-2026)\nrole  : ML / Software Engineer\nfocus : Deep Learning, MLOps, NLP\nbased : Indonesia`;
        break;
      case "about":
        output = t("aboutBio");
        break;
      case "exp":
      case "experience":
        output = experiences
          .map(
            (e) =>
              `${e.period[language]}  ${e.role[language]} @ ${e.org}\n` +
              e.highlights[language].map((h) => `  - ${h}`).join("\n")
          )
          .join("\n\n");
        break;
      case "ls":
      case "projects":
        output = projects
          .map(
            (p, idx) =>
              `${String(idx + 1).padStart(2, "0")}  ${p.id.padEnd(18)} [${p.status.toLowerCase()}]  ${p.metric.label}: ${p.metric.value}`
          )
          .join("\n");
        break;
      case "skills":
      case "stack":
        output = technologies.map((item) => item.name).join(" · ");
        break;
      case "certs":
      case "awards":
      case "credentials":
        output = credentials
          .map(
            (c) =>
              `${c.year}  [${c.kind}]  ${c.title[language]} — ${c.issuer}`
          )
          .join("\n");
        break;
      case "contact":
        output =
          "email    : halo.almasrur@gmail.com\nlinkedin : linkedin.com/in/alifmasrur345\ngithub   : github.com/alfdmsr";
        break;
      case "resume":
        window.open("/resume-alif-english.pdf", "_blank", "noopener,noreferrer");
        output =
          language === "id"
            ? "membuka /resume-alif-english.pdf di tab baru..."
            : "opening /resume-alif-english.pdf in a new tab...";
        break;
      case "theme":
        onToggleTheme();
        output =
          language === "id"
            ? `tema diganti ke ${theme === "dark" ? "terang" : "gelap"}.`
            : `theme switched to ${theme === "dark" ? "light" : "dark"}.`;
        break;
      default:
        output = `${t("shellUnknown")} ${cmd}`;
        break;
    }

    setHistory((prev) => [...prev, { cmd: raw.trim(), out: output }]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    runCommand(input);
    setInput("");
  }

  return (
    <div className="hero-stage">
      <div className="hero-stage-bar">
        <div className="tabs" role="tablist" aria-label="Hero mode">
          {[
            { id: "banner", label: t("heroBanner") },
            { id: "shell", label: t("heroShell") },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={mode === tab.id}
              className={`ascii-btn ${mode === tab.id ? "active" : ""}`}
              onClick={() => setMode(tab.id)}
            >
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {mode === "banner" && (
        <div className="well big banner-well">
          <picture className="hero-banner-picture">
            <source
              media="(prefers-color-scheme: dark)"
              srcSet={BANNER_DARK_URL}
            />
            <img
              alt="almas"
              src={theme === "dark" ? BANNER_DARK_URL : BANNER_LIGHT_URL}
              className="hero-banner-img"
            />
          </picture>
        </div>
      )}

      {mode === "shell" && (
        <div
          className="well big terminal-well"
          role="region"
          aria-label={t("heroShell")}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="shell-log" ref={logRef}>
            <div className="shell-entry">
              <div className="shell-out">{t("shellWelcome")}</div>
            </div>
            {history.map((entry, idx) => (
              <div className="shell-entry" key={`${entry.cmd}-${idx}`}>
                <div className="shell-cmd">almas@sys:~$ {entry.cmd}</div>
                <div className="shell-out">{entry.out}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="shell-suggestions" aria-label="Quick commands">
              {SHELL_SUGGESTIONS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  className="ascii-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    runCommand(cmd);
                  }}
                >
                  <span>[{cmd}]</span>
                </button>
              ))}
            </div>
            <form className="shell-prompt-row" onSubmit={handleSubmit}>
              <label htmlFor="hero-shell-input" className="shell-prompt-label">
                almas@sys:~$
              </label>
              <input
                ref={inputRef}
                id="hero-shell-input"
                type="text"
                className="shell-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("shellPlaceholder")}
                autoComplete="off"
                autoCapitalize="none"
                spellCheck="false"
              />
            </form>
          </div>
        </div>
      )}

      <div className="hero-caption">
        <span>ALM-9.2 · ALM-ML-2026</span>
        <span>{t("SYSTEM ONLINE")}</span>
      </div>
    </div>
  );
}
