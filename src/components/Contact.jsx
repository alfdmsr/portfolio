import { SectionEyebrow } from "./About";

const CHANNELS = [
  {
    label: "EMAIL",
    value: "masrurbyu@email.com",
    href: "mailto:masrurbyu@email.com",
  },
  {
    label: "LINKEDIN",
    value: "in/masrurbyu",
    href: "https://www.linkedin.com/in/masrurbyu/",
  },
  {
    label: "GITHUB",
    value: "@alfdmsr",
    href: "https://github.com/alfdmsr",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-void">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <SectionEyebrow index="04" title="CONTACT.SEND" />

        <div className="mt-8 border border-dim-2 bg-panel">
          <div className="flex items-center justify-between border-b border-dim-2 px-5 py-3">
            <span className="text-[11px] tracking-widest text-muted">
              NOTIFICATIONS
            </span>
            <span className="text-[11px] tracking-widest text-phosphor">
              {CHANNELS.length}
            </span>
          </div>

          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between gap-4 border-b border-dim-2 px-5 py-4 transition-colors last:border-b-0 hover:bg-panel-hover"
            >
              <div>
                <div className="text-[10px] tracking-widest text-muted">
                  {c.label}
                </div>
                <div className="mt-0.5 text-sm text-bright sm:text-base">
                  {c.value}
                </div>
              </div>
              <span className="shrink-0 text-dim transition-colors group-hover:text-phosphor">
                →
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] tracking-widest text-dim">
          READY TO BUILD SOMETHING TOGETHER?
        </p>
      </div>
    </section>
  );
}
