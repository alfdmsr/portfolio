import { skillGroups } from "../data/skills";
import { SectionEyebrow } from "./About";

function SkillBar({ name, level }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[11px] tracking-wide">
        <span className="text-data">{name}</span>
        <span className="text-muted">{level}%</span>
      </div>
      <div className="h-2 w-full border border-dim-2 bg-panel-alt">
        <div
          className="h-full bg-gradient-to-r from-dim to-phosphor"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="border-b border-dim-2 bg-void grid-bg">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionEyebrow index="03" title="SKILLS.CFG" />

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="border border-dim-2 bg-panel p-5"
            >
              <h3 className="mb-4 text-[11px] font-bold tracking-widest text-muted">
                {group.category}
              </h3>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <SkillBar key={item.name} {...item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
