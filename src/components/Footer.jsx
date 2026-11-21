import { useLanguage } from "../i18n/useLanguage";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="foot">
      <span>almas.sys © {new Date().getFullYear()} · Alif Masrur</span>
      <div className="foot-links">
        <a href="#top">[{t("top")}]</a>
        <a
          href="https://github.com/alfdmsr"
          target="_blank"
          rel="noopener noreferrer"
        >
          [github]
        </a>
        <a
          href="https://www.linkedin.com/in/alifmasrur345/"
          target="_blank"
          rel="noopener noreferrer"
        >
          [linkedin]
        </a>
        <a
          href="/resume-alif-english.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          [resume]
        </a>
      </div>
    </footer>
  );
}
