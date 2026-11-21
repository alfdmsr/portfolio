import { useLanguage } from "../i18n/useLanguage";
import { experiences } from "../data/experience";

export default function Experience() {
  const { language, t } = useLanguage();

  return (
    <section id="experience" className="page-section">
      <div className="section-head">
        <h2>{t("EXPERIENCE.LOG")}</h2>
        <span className="section-count">{experiences.length}</span>
      </div>

      <ol className="exp-list">
        {experiences.map((exp) => (
          <li key={exp.id} className="exp-item">
            <div className="exp-aside">
              <div className="exp-period">{exp.period[language]}</div>
              <div className="exp-location">{exp.location}</div>
            </div>

            <div className="exp-body">
              <div className="exp-role-row">
                <h3 className="exp-role">{exp.role[language]}</h3>
                {exp.type && (
                  <span className="exp-type">[{t(exp.type)}]</span>
                )}
              </div>

              <p className="exp-org">{exp.org}</p>

              <ul className="exp-points">
                {exp.highlights[language].map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>

              {exp.stack?.length > 0 && (
                <div className="exp-stack">{exp.stack.join(" · ")}</div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
