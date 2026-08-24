import { useEffect, useState } from "react";

const BOOT_LINES = [
  "INITIALIZING SYSTEM.PORTFOLIO...",
  "LOADING MODULE: MACHINE_LEARNING [OK]",
  "LOADING MODULE: DEEP_LEARNING [OK]",
  "LOADING MODULE: MLOPS [OK]",
  "IDENTITY VERIFIED — WELCOME",
];

export default function Hero() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setShowHero(true), 300);
    return () => clearTimeout(t);
  }, [visibleLines]);

  return (
    <section id="top" className="relative overflow-hidden border-b border-dim-2 grid-bg">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        {!showHero ? (
          <div className="font-mono text-sm text-muted md:text-base" role="status" aria-live="polite">
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <p key={i} className="py-0.5">
                <span className="text-dim">&gt;</span> {line}
              </p>
            ))}
            <span className="inline-block h-4 w-2 animate-blink bg-phosphor align-middle" />
          </div>
        ) : (
          <div className="animate-[fadeIn_0.6s_ease]">
            <p className="mb-4 text-xs tracking-[0.3em] text-muted">
              // SYSTEM.PORTFOLIO — BUILD 2026.08
            </p>
            <h1 className="text-glow text-4xl font-extrabold leading-tight tracking-tight text-phosphor sm:text-6xl md:text-7xl">
              ALIF MASRUR
            </h1>
            <p className="mt-3 max-w-2xl text-base text-bright sm:text-lg">
              [ MACHINE LEARNING &amp; SOFTWARE ENGINEER ]
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-data sm:text-base">
              Membangun sistem dari akarnya — dari attention mechanism di
              Transformer hingga pipeline MLOps otomatis. Setiap project di
              bawah adalah bukti proses, bukan cuma hasil akhir.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="border border-phosphor bg-phosphor/10 px-5 py-2.5 text-xs font-semibold tracking-widest text-phosphor transition-colors hover:bg-phosphor/20"
              >
                VIEW_PROJECTS →
              </a>
              <a
                href="#contact"
                className="border border-dim px-5 py-2.5 text-xs font-semibold tracking-widest text-data transition-colors hover:border-phosphor hover:text-phosphor"
              >
                CONTACT_ME
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
