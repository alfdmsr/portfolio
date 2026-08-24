import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { SectionEyebrow } from "./About";

export default function Projects() {
  return (
    <section id="projects" className="border-b border-dim-2 bg-void">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionEyebrow index="02" title="PROJECTS.DB" />
        <p className="mt-3 text-xs tracking-widest text-muted">
          {projects.length} ENTRIES FOUND — SORTED BY RECENT
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
