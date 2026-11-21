import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { imageToAscii } from "../utils/asciiArt";

const PORTRAIT_SRC = "/alip.jpeg";

const DATA_ROWS = [
  { k: "ROLE", v: "ML / SOFTWARE ENGINEER" },
  { k: "FOCUS", v: "DEEP LEARNING, MLOPS, NLP" },
  { k: "BASED", v: "INDONESIA" },
  { k: "STATUS", v: "OPEN TO COLLAB" },
  { k: "ENGINEER CODE", v: "ALM-ML-2026" },
];

const STATS = [
  { label: "PROJECTS SHIPPED", value: "10+" },
  { label: "MODELS TRAINED", value: "20+" },
  { label: "FROM-SCRATCH BUILDS", value: "3" },
  { label: "CI/CD PIPELINES", value: "2" },
];

export default function About() {
  const { t } = useLanguage();
  const [showAscii, setShowAscii] = useState(false);
  const [asciiPortrait, setAsciiPortrait] = useState("");

  useEffect(() => {
    if (!showAscii || asciiPortrait) return;
    let active = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!active) return;
      setAsciiPortrait(imageToAscii(img, 46, 28));
    };
    img.src = PORTRAIT_SRC;
    return () => {
      active = false;
    };
  }, [showAscii, asciiPortrait]);

  return (
    <section id="about" className="page-section">
      <div className="section-head">
        <h2>{t("ABOUT.LOG")}</h2>
        <span className="section-count">ALM-9.2</span>
      </div>

      <div className="about-grid">
        <div>
          <p className="about-bio">{t("aboutBio")}</p>

          <table className="meta-table">
            <tbody>
              {DATA_ROWS.map((row) => (
                <tr key={row.k}>
                  <th scope="row">{t(row.k)}</th>
                  <td>{t(row.v)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="portrait-box">
          <div className={`portrait-well ${showAscii ? "is-ascii" : ""}`}>
            {showAscii && asciiPortrait ? (
              <pre
                className="portrait-ascii"
                role="img"
                aria-label="ASCII portrait of Alif Masrur"
              >
                {asciiPortrait}
              </pre>
            ) : (
              <img
                src={PORTRAIT_SRC}
                alt="Alif Masrur"
                className="portrait-img"
              />
            )}
          </div>
          <div className="portrait-controls">
            <span>photo.jpeg</span>
            <button
              type="button"
              className="ascii-btn"
              onClick={() => setShowAscii((v) => !v)}
            >
              <span>[{showAscii ? t("photoView") : t("asciiView")}]</span>
            </button>
          </div>
        </div>
      </div>

      <div className="slots">
        {STATS.map((s) => (
          <div key={s.label} className="slot">
            <span className="slot-value">{s.value}</span>
            <span className="slot-label">{t(s.label)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
