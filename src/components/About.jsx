import { useLanguage } from "../i18n/useLanguage";

const DATA_ROWS = [
  { k: "ROLE", v: "ML / SOFTWARE ENGINEER" },
  { k: "FOCUS", v: "DEEP LEARNING, MLOPS, NLP" },
  { k: "BASED", v: "INDONESIA" },
  { k: "STATUS", v: "OPEN TO COLLAB" },
];

const STATS = [
  { label: "PROJECTS SHIPPED", value: "10+" },
  { label: "MODELS TRAINED", value: "20+" },
  { label: "FROM-SCRATCH BUILDS", value: "3" },
  { label: "CI/CD PIPELINES", value: "2" },
];

export default function About() {
  const { t } = useLanguage();
  return (
    <section id="about" className="border-b border-dim-2 bg-void">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionEyebrow index="01" title={t("ABOUT.LOG")} />

        <div className="mt-8 grid gap-5 md:grid-cols-5">
          <div className="md:col-span-3 border border-dim-2 bg-panel p-6">
            <p className="text-sm leading-relaxed text-data sm:text-base">
              {t("aboutBio")}
            </p>

            <div className="mt-6 border-t border-dim-2 pt-4">
              {DATA_ROWS.map((row) => (
                <div
                  key={row.k}
                  className="flex items-center justify-between border-b border-dim-2/60 py-2 text-xs tracking-widest last:border-b-0"
                >
                  <span className="text-muted">{t(row.k)}</span>
                  <span className="text-bright">{t(row.v)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="flex flex-col justify-between border border-dim-2 bg-panel-alt p-4"
              >
                <span className="text-3xl font-extrabold text-phosphor text-glow-sm sm:text-4xl">
                  {s.value}
                </span>
                <span className="mt-2 text-[10px] leading-tight tracking-widest text-muted">
                  {t(s.label)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionEyebrow({ index, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-bold text-dim">[{index}]</span>
      <h2 className="text-xl font-bold tracking-widest text-phosphor sm:text-2xl">
        {title}
      </h2>
      <span className="h-px flex-1 bg-dim-2" aria-hidden="true" />
    </div>
  );
}
