import { useEffect, useState } from "react";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const NAV_LINKS = [
  { href: "#about", label: "ABOUT" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#skills", label: "SKILLS" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navbar() {
  const now = useClock();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return (
    <header className="sticky top-0 z-50 border-b border-dim-2 bg-void/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 text-xs tracking-widest text-data">
        <a href="#top" className="flex items-center gap-2 font-bold text-phosphor text-glow-sm">
          <span className="inline-block h-2 w-2 animate-blink rounded-full bg-phosphor" />
          ALMAS.SYS
        </a>

        <nav className="hidden gap-6 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted transition-colors hover:text-phosphor hover:text-glow-sm"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 font-semibold text-bright">
          <span aria-hidden="true">▮▮▯</span>
          <time dateTime={now.toISOString()}>
            {hh}:{mm}:{ss}
          </time>
        </div>
      </div>
    </header>
  );
}
