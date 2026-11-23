import { useCallback } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { renderProjectPreview } from "../utils/asciiArt";
import AsciiCanvas from "./AsciiCanvas";
import "./ProjectCard.css";

export default function ProjectCard({ project, motionPaused }) {
  const { language, t } = useLanguage();

  const renderPreview = useCallback(
    (frame) => renderProjectPreview(project.id, frame),
    [project.id]
  );

  const previewAndHeader = (
    <>
      <div className="well">
        <AsciiCanvas
          renderFrame={renderPreview}
          cols={38}
          rows={12}
          fps={6}
          paused={motionPaused}
          label={project.name[language]}
        />
      </div>

      <div className="card-header">
        <h3 className="card-name">{project.name[language]}</h3>
        <span
          className={`card-status ${
            project.status === "DEPLOYED" ? "is-deployed" : ""
          }`}
        >
          [{t(project.status)}]
        </span>
      </div>
    </>
  );

  const body = (
    <>
      <p className="card-desc">{project.desc[language]}</p>

      <div className="card-meta">
        <span>{project.stack.join(" · ")}</span>
        <span className="card-metric">
          {t(project.metric.label)}: {t(project.metric.value)}
        </span>
      </div>
    </>
  );

  if (project.demoUrl) {
    return (
      <article
        id={`project-${project.id}`}
        className="project-card has-actions"
      >
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="card-primary-link"
        >
          {previewAndHeader}
        </a>

        {body}

        <div className="card-footer">
          <div className="card-tags">
            {project.tags.map((tag) => (
              <span key={tag}>#{t(tag)}</span>
            ))}
          </div>

          <div className="card-links">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dotted-link"
            >
              [{t("liveDemo")}]
            </a>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-repo-link"
              >
                [{t("repoLink")}]
              </a>
            )}
          </div>
        </div>
      </article>
    );
  }

  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      id={`project-${project.id}`}
      {...wrapperProps}
      className="project-card"
    >
      {previewAndHeader}
      {body}

      <div className="card-tags">
        {project.tags.map((tag) => (
          <span key={tag}>#{t(tag)}</span>
        ))}
      </div>
    </Wrapper>
  );
}
