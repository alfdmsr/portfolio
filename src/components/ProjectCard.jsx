const STATUS_STYLES = {
  DEPLOYED: "text-phosphor border-phosphor/50",
  COMPLETE: "text-data border-dim",
};

export default function ProjectCard({ project }) {
  const Wrapper = project.url ? "a" : "div";
  const wrapperProps = project.url
    ? { href: project.url, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col border border-dim-2 bg-panel p-5 transition-colors hover:border-phosphor/60 hover:bg-panel-hover"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold tracking-wide text-bright sm:text-base">
          {project.name}
        </h3>
        <span
          className={`shrink-0 border px-2 py-0.5 text-[9px] font-semibold tracking-widest ${
            STATUS_STYLES[project.status] ?? STATUS_STYLES.COMPLETE
          }`}
        >
          {project.status}
        </span>
      </div>

      <p className="mt-3 flex-1 text-xs leading-relaxed text-data sm:text-sm">
        {project.desc}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="border border-dim-2 px-1.5 py-0.5 text-[9px] tracking-widest text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-dim-2 pt-3">
        <div className="flex flex-wrap gap-2 text-[10px] text-dim">
          {project.stack.join(" · ")}
        </div>
        <div className="shrink-0 text-right">
          <div className="text-[9px] tracking-widest text-muted">
            {project.metric.label}
          </div>
          <div className="text-xs font-bold text-phosphor">
            {project.metric.value}
          </div>
        </div>
      </div>

      {project.url && (
        <div className="mt-3 text-[10px] font-semibold tracking-widest text-dim opacity-0 transition-opacity group-hover:opacity-100 group-hover:text-phosphor">
          OPEN_REPOSITORY →
        </div>
      )}
    </Wrapper>
  );
}
