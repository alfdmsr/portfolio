import { useLanguage } from "../i18n/useLanguage";
import { experiences } from "../data/experience";
import { projects } from "../data/projects";
import { technologies } from "../data/skills";

const SECTION_ITEMS = [
  { id: "top", labelKey: "OVERVIEW" },
  { id: "about", labelKey: "ABOUT" },
  { id: "experience", labelKey: "EXPERIENCE", count: experiences.length },
  { id: "projects", labelKey: "PROJECTS", count: projects.length },
  { id: "skills", labelKey: "SKILLS", count: technologies.length },
  { id: "contact", labelKey: "CONTACT", count: 3 },
];

export default function Sidebar({
  activeSection,
  searchQuery,
  onSearchChange,
  onSelectProject,
  onNavigateSection,
  onClose,
  searchInputRef,
}) {
  const { language, t } = useLanguage();

  function handleSearchInput(e) {
    const val = e.target.value;
    onSearchChange(val);
    if (val.trim()) {
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <aside className="side" aria-label={t("sidebar")}>
      <div className="side-header">
        <a className="side-home" href="#top" onClick={onNavigateSection}>
          almas.sys
        </a>
        <button
          type="button"
          className="ascii-btn"
          aria-label={t("hideSidebarLabel")}
          onClick={onClose}
        >
          <span>[{t("hideSidebar")}]</span>
        </button>
      </div>
      <p className="side-by">Alif Masrur · ML / SWE</p>

      <p className="side-links">
        <a
          href="/resume-alif-english.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          [resume]
        </a>
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
        <a href="mailto:halo.almasrur@gmail.com">[email]</a>
      </p>

      <form
        className="find"
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          onNavigateSection();
          document
            .getElementById("projects")
            ?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <label className="sr" htmlFor="project-search">
          {t("searchLabel")}
        </label>
        <input
          ref={searchInputRef}
          id="project-search"
          type="search"
          value={searchQuery}
          onChange={handleSearchInput}
          placeholder={t("searchPlaceholder")}
          autoComplete="off"
          autoCapitalize="none"
          spellCheck="false"
        />
        {searchQuery ? (
          <button
            type="button"
            className="ascii-btn find-clear"
            aria-label={t("clearFilter")}
            onClick={() => onSearchChange("")}
          >
            <span>×</span>
          </button>
        ) : (
          <span className="find-key" aria-hidden="true">
            /
          </span>
        )}
      </form>

      <nav className="side-nav" aria-label={t("sections")}>
        <h3 className="side-group-title">
          <span>{t("sections")}</span>
          <span className="count">{SECTION_ITEMS.length}</span>
        </h3>
        <ul className="side-sections-list">
          {SECTION_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "location" : undefined}
                onClick={onNavigateSection}
              >
                <span className="side-nav-item-text">{t(item.labelKey)}</span>
                {item.count !== undefined && (
                  <span className="item-count">{item.count}</span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <h3 className="side-group-title">
          <a href="#projects" onClick={onNavigateSection}>
            {t("projectsIndex")}
          </a>
          <span className="count">{projects.length}</span>
        </h3>
        <ul className="side-projects-list">
          {projects.map((p) => (
            <li key={p.id}>
              <a
                href={`#project-${p.id}`}
                onClick={() => onSelectProject(p.id)}
              >
                <span className="side-nav-item-text">
                  {p.name[language].toLowerCase()}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
