import { useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { experiences } from "../data/experience";
import CertificateModal from "./CertificateModal";

export default function Experience() {
  const { language, t } = useLanguage();
  const [activeExp, setActiveExp] = useState(null);

  return (
    <section id="experience" className="page-section">
      <div className="section-head">
        <h2>{t("EXPERIENCE.LOG")}</h2>
        <span className="section-count">{experiences.length}</span>
      </div>

      <ol className="exp-list">
        {experiences.map((exp) => {
          const certImages = exp.certificate?.images ?? [];
          const certUrl = exp.certificate?.url ?? "";
          const hasCertActions = certImages.length > 0 || Boolean(certUrl);

          return (
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

                {hasCertActions && (
                  <div className="exp-actions">
                    {certImages.length > 0 && (
                      <button
                        type="button"
                        className="ascii-btn"
                        onClick={() => setActiveExp(exp)}
                      >
                        <span>[{t("viewCertLabel")}]</span>
                      </button>
                    )}
                    {certUrl && (
                      <a
                        href={certUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        [{t("verifyLink")}]
                      </a>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {activeExp && activeExp.certificate?.images?.length > 0 && (
        <CertificateModal
          title={activeExp.role[language]}
          subtitle={`${activeExp.org} · ${activeExp.period[language]}`}
          images={activeExp.certificate.images}
          url={activeExp.certificate.url}
          onClose={() => setActiveExp(null)}
        />
      )}
    </section>
  );
}
