import { useEffect, useState } from "react";

const BOOT_LINES = [
  "INITIALIZING SYSTEM.PORTFOLIO...",
  "LOADING MODULE: MACHINE_LEARNING [OK]",
  "LOADING MODULE: SOFTWARE_ENGINEERING [OK]",
  "RENDERING IDENTITY CARD...",
  "IDENTITY VERIFIED - WELCOME",
];

const BOOT_STEP_MS = 300;


export default function Hero() {
  const [bootStep, setBootStep] = useState(() => 
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ? BOOT_LINES.length + 1 : 0);

  const isBooting = bootStep <= BOOT_LINES.length;

  useEffect(() => {
    if (!isBooting) return;

    const timer = window.setTimeout(() => {
      setBootStep((step) => step + 1);
    }, BOOT_STEP_MS);

    return () => window.clearTimeout(timer);
  }, [bootStep, isBooting]); 

  return (
    <section id="top" className="identity-hero" aria-label="Profil Alif Masrur">
      {isBooting && (
        <div className="identity-boot">
          <div className="identity-boot-terminal" lang="en">
            <div className="identity-boot-heading">
              <span>SYSTEM.PORTFOLIO // BOOT</span>
              <span>
                {Math.round((bootStep / BOOT_LINES.length) * 100)}%
              </span>
            </div>
            <p className="sr-only" role="status">
              Loading portfolio... 
            </p>

            <div className="identity-boot-lines" aria-hidden="true">
              {BOOT_LINES.slice(0, bootStep).map((line) => (
                <p key={line}>
                  <span>&gt; </span>
                  {line}
                </p>
              ))}
              <span className="identity-boot-cursor"/>
            </div>

            <div className="identity-boot-track" aria-hidden="true">
              <span
                style={{
                  width: `${(bootStep / BOOT_LINES.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
      <article className={`identity-card ${isBooting ? "identity-card-pending" : "identity-card-ready"}`} lang="en" inert={isBooting} aria-hidden={isBooting} aria-labelledby="hero-title">
        <header className="identity-status">
          <span className="identity-brand">ML / SWE</span>
          <span className="identity-label">SYSTEM ONLINE</span>
          <span className="identity-signal" aria-hidden="true"><i /><i /><i /><i /></span>
        </header>
        <div className="identity-credentials">
          <div>
            <p className="identity-label">ENGINEER</p>
            <p className="identity-id">ALM-9.2</p>
          </div>
          <div className="identity-access" aria-hidden="true">
            <p className="identity-label">ACCESS</p>
            <p className="identity-mask">**********</p>
          </div>
        </div>
        <div className="identity-profile">
          <div className="identity-avatar">
            <img
              src="/alife2.png"
              alt="Alif Masrur"
              className="identity-photo"
            />
          </div>
          <div className="identity-details">
            <p className="identity-system">SYSTEM.PORTFOLIO</p>
            <span className="identity-mark" aria-hidden="true">/</span>
            <p className="identity-label identity-code-label">ENGINEER CODE</p>
            <p className="identity-code">ALM-ML-2026</p>
            <p className="identity-japanese" lang="ja">エンジニア</p>
            <h1 id="hero-title" className="identity-title">
              <span className="sr-only">Alif Masrur — </span>
              MACHINE<br />LEARNING ENG.
            </h1>
            <p className="identity-japanese" lang="ja">機械学習</p>
          </div>
        </div>
        <p className="identity-bio">
          My name is Alif Masrur. I am a machine learning &amp; software
          engineer. I like building things from scratch to really understand
          how they work — from Transformer architectures to MLOps pipelines
          that ship themselves.
        </p>
        <div className="px-5 py-5">
            <a href="/resume-alif-english.pdf"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block border border-phosphor px-5 py-3 text-sm text-phosphor transition-colors hover:bg-phosphor/10">
                
              VIEW RESUME ↗
            </a>
        </div>

        <footer className="identity-footer">
          <span aria-hidden="true">✳</span>
          <span>MACHINE LEARNING ENGINEER</span>
          <span aria-hidden="true">✳</span>
        </footer>
      </article>
    </section>
  );
}
