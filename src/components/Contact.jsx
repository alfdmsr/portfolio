import { useState } from "react";
import { useLanguage } from "../i18n/useLanguage";

const CHANNELS = [
  {
    label: "email",
    value: "halo.almasrur@gmail.com",
    href: "mailto:halo.almasrur@gmail.com",
    copyable: true,
  },
  {
    label: "linkedin",
    value: "in/alif-masrur",
    href: "https://www.linkedin.com/in/alifmasrur345/",
  },
  {
    label: "github",
    value: "@alfdmsr",
    href: "https://github.com/alfdmsr",
  },
];

export default function Contact() {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  async function handleCopy(value) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.assign(`mailto:${value}`);
    }
  }

  return (
    <section id="contact" className="page-section">
      <div className="section-head">
        <h2>{t("CONTACT.SEND")}</h2>
        <span className="section-count">{CHANNELS.length}</span>
      </div>

      <ul className="channel-list">
        {CHANNELS.map((c) => (
          <li key={c.label} className="channel-row">
            <div className="channel-left">
              <span className="channel-key">{c.label}</span>
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="dotted-link"
              >
                {c.value}
              </a>
            </div>

            <div className="channel-actions">
              {c.copyable && (
                <button
                  type="button"
                  className="ascii-btn"
                  onClick={() => handleCopy(c.value)}
                >
                  <span>[{copied ? t("copied") : t("copy")}]</span>
                </button>
              )}
              <a
                href={c.href}
                target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={c.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="muted"
              >
                [{t("openLink")}]
              </a>
            </div>
          </li>
        ))}
      </ul>

      <div className="contact-cta">
        <span>{t("READY TO BUILD SOMETHING TOGETHER?")}</span>
        <a
          href="/resume-alif-english.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="dotted-link"
        >
          [{t("resumeFull")}]
        </a>
      </div>
    </section>
  );
}
