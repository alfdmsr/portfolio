import { useLanguage } from "../i18n/useLanguage";
import { projects } from "../data/projects";
import {
  PROJECT_CATEGORIES,
  getProjectCategory,
  matchesSearch,
} from "../utils/projectFilter";
import ProjectCard from "./ProjectCard";

export default function Projects({
  searchQuery,
  category,
  onCategoryChange,
  onClearFilters,
  motionPaused,
  onToggleMotion,
}) {
  const { language, t } = useLanguage();

  const filtered = projects.filter((project) => {
    const inCategory =
      category === "all" || getProjectCategory(project) === category;
    const inSearch = matchesSearch(project, searchQuery, language);
    return inCategory && inSearch;
  });

  const isFiltered = category !== "all" || searchQuery.trim().length > 0;

  return (
    <section id="projects" className="page-section">
      <div className="section-head">
        <h2>{t("PROJECTS.DB")}</h2>
        <span className="section-count">
          {isFiltered ? `${filtered.length} / ${projects.length}` : projects.length}
        </span>
      </div>

      <div className="projects-toolbar">
        <div className="tabs" role="tablist" aria-label={t("PROJECTS")}>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={category === cat.id}
              className={`ascii-btn ${category === cat.id ? "active" : ""}`}
              onClick={() => onCategoryChange(cat.id)}
            >
              <span>{t(cat.labelKey)}</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          className="ascii-btn"
          onClick={onToggleMotion}
        >
          <span>[{motionPaused ? t("play") : t("pause")}]</span>
        </button>
      </div>

      {filtered.length > 0 ? (
        <div className="projects-grid">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              motionPaused={motionPaused}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>{t("noProjectsFound")}</span>
          <button
            type="button"
            className="ascii-btn active"
            onClick={onClearFilters}
          >
            <span>[{t("clearFilter")}]</span>
          </button>
        </div>
      )}
    </section>
  );
}
