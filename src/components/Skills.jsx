import { useLanguage } from "../i18n/useLanguage";
import { technologies } from "../data/skills";

function TechnologySlot({ name, icon }) {
  return (
    <li className="stack-slot">
      <span
        className="stack-icon"
        style={{
          "--stack-icon": `url("${import.meta.env.BASE_URL}icons/${icon}.svg")`,
        }}
        aria-hidden="true"
      />
      <span className="stack-label">{name}</span>
    </li>
  );
}

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="page-section">
      <div className="section-head">
        <h2>{t("TECH_STACK.CFG")}</h2>
        <span className="section-count">{technologies.length}</span>
      </div>

      <p className="muted">{t("technologies")}</p>

      <ul className="stack-grid" aria-label={t("technologies")}>
        {technologies.map((item) => (
          <TechnologySlot key={item.name} {...item} />
        ))}
      </ul>
    </section>
  );
}
