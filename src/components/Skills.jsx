import { technologies } from "../data/skills";
import { SectionEyebrow } from "./About";

function Technology({ name, icon }) {
  return (
    <li className="technology-tile">
      <span 
        className="technology-icon"
        style={{
          "--technology-icon":
            `url("${import.meta.env.BASE_URL}icons/${icon}.svg")`,
        }}
        aria-hidden="true"      
      >
      </span>
      <span className="technology-name">{name}</span>
    </li>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="border-b border-dim-2 bg-void grid-bg scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <SectionEyebrow index="03" title="TECH_STACK.CFG"></SectionEyebrow>

        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-data">Technologies I have used in projects.</p>

        <ul className="technology-grid mt-8" aria-label="Technologies I have used in projects.">
            {technologies.map((item) => (
              <Technology key={item.name} {...item} />
            ))}
        </ul>
      </div>
    </section>
  );
}