import { useMemo, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { credentials } from "../data/credentials";
import CertificateModal from "./CertificateModal";

const FILTERS = [
  { id: "all", labelKey: "credAll" },
  { id: "award", labelKey: "credAwards" },
  { id: "cert", labelKey: "credCerts" },
];

export default function Credentials() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState("all");
  const [activeItem, setActiveItem] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "all") return credentials;
    return credentials.filter((item) => item.kind === filter);
  }, [filter]);

  const countText =
    filter === "all"
      ? `${credentials.length}`
      : `${filtered.length} / ${credentials.length}`;

  return (
    <section id="credentials" className="page-section">
      <div className="section-head">
        <h2>{t("CREDENTIALS.LOG")}</h2>
        <span className="section-count">{countText}</span>
      </div>

      <div className="credentials-toolbar">
        <div className="tabs" role="tablist" aria-label={t("CREDENTIALS.LOG")}>
          {FILTERS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={filter === tab.id}
              className={`ascii-btn ${filter === tab.id ? "active" : ""}`}
              onClick={() => setFilter(tab.id)}
            >
              <span>{t(tab.labelKey)}</span>
            </button>
          ))}
        </div>
      </div>

      <ol className="cred-list">
        {filtered.map((item) => {
          const hasImages = item.images?.length > 0;
          const viewLabel =
            item.images?.length > 1
              ? `${t("viewCert")} (${item.images.length})`
              : t("viewCert");

          return (
            <li key={item.id} className="cred-item">
              <span className="cred-year">{item.year}</span>

              <div className="cred-body">
                <div className="cred-title-row">
                  <h3 className="cred-title">
                    {hasImages ? (
                      <button
                        type="button"
                        className="ascii-btn cred-title-btn"
                        onClick={() => setActiveItem(item)}
                      >
                        <span className="dotted-link">
                          {item.title[language]}
                        </span>
                      </button>
                    ) : (
                      item.title[language]
                    )}
                  </h3>
                  <span className="cred-right">
                    <span className="cred-kind">
                      [{t(item.kind === "award" ? "AWARD" : "CERT")}]
                    </span>
                    {hasImages && (
                      <button
                        type="button"
                        className="ascii-btn"
                        onClick={() => setActiveItem(item)}
                      >
                        <span>[{viewLabel}]</span>
                      </button>
                    )}
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        [{t("verifyLink")}]
                      </a>
                    )}
                  </span>
                </div>

                <p className="cred-issuer">{item.issuer}</p>
                <p className="cred-detail">{item.detail[language]}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {activeItem && activeItem.images?.length > 0 && (
        <CertificateModal
          title={activeItem.title[language]}
          subtitle={`${activeItem.issuer} · ${activeItem.year}`}
          images={activeItem.images}
          url={activeItem.url}
          onClose={() => setActiveItem(null)}
        />
      )}
    </section>
  );
}
