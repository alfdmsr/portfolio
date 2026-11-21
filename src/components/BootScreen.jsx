import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";

const BOOT_LINES = [
  "INITIALIZING SYSTEM.PORTFOLIO...",
  "LOADING MODULE: MACHINE_LEARNING [OK]",
  "LOADING MODULE: SOFTWARE_ENGINEERING [OK]",
  "RENDERING IDENTITY CARD...",
  "IDENTITY VERIFIED - WELCOME",
];

const STEP_MS = 220;
const HOLD_MS = 280;
const FADE_MS = 240;

export default function BootScreen({ onComplete }) {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(0);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    setExiting((already) => {
      if (already) return true;
      window.setTimeout(onComplete, FADE_MS);
      return true;
    });
  }, [onComplete]);

  useEffect(() => {
    if (exiting) return;

    if (step < BOOT_LINES.length) {
      const timer = window.setTimeout(() => {
        setStep((s) => s + 1);
      }, STEP_MS);
      return () => window.clearTimeout(timer);
    }

    const doneTimer = window.setTimeout(finish, HOLD_MS);
    return () => window.clearTimeout(doneTimer);
  }, [step, exiting, finish]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        finish();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [finish]);

  const pct = Math.round((step / BOOT_LINES.length) * 100);
  const filled = Math.round((step / BOOT_LINES.length) * 20);
  const bar = `[${"█".repeat(filled)}${"░".repeat(20 - filled)}] ${String(pct).padStart(3, " ")}%`;

  return (
    <div
      className={`boot-screen ${exiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      lang={language}
    >
      <div className="boot-panel">
        <div className="boot-head">
          <span>{t("SYSTEM.PORTFOLIO // BOOT")}</span>
          <button
            type="button"
            className="ascii-btn"
            onClick={finish}
          >
            <span>[{t("skip")}]</span>
          </button>
        </div>

        <p className="sr">{t("Loading portfolio...")}</p>

        <div className="boot-log-list" aria-hidden="true">
          {BOOT_LINES.slice(0, step).map((line) => (
            <p key={line}>
              <span className="boot-prefix">&gt; </span>
              {t(line)}
            </p>
          ))}
          <span className="boot-cursor" />
        </div>

        <div className="boot-bar-row" aria-hidden="true">
          <code>{bar}</code>
          <span className="muted">almas.sys</span>
        </div>
      </div>
    </div>
  );
}
