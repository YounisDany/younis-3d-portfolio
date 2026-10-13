import { Bot, Code2, Database, LayoutGrid, PackageOpen, PenTool, Server, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "../i18n";
import { capabilityGroups, principles } from "../content/skills";
import { profile } from "../content/profile";
import { Card, Page, Reveal, SectionTitle } from "../components/Page";

const ICONS: Record<string, LucideIcon> = {
  layout: LayoutGrid,
  smartphone: Smartphone,
  server: Server,
  database: Database,
  bot: Bot,
  package: PackageOpen,
};
const TONES = ["bg-ruby text-white", "bg-cobalt text-white", "bg-saffron text-ink", "bg-emerald text-white", "bg-magenta text-white", "bg-lime text-ink"];

export function Skills() {
  const { t, locale } = useLang();
  const r = profile.resume;

  return (
    <Page kicker={t.nav.skills} title={t.skills.title} subtitle={t.skills.subtitle}>
      {/* Two shelves */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card accent="cobalt" className="h-full">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-[1.5px] border-ink bg-ink text-lime">
                <Code2 className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="font-display text-xl font-bold">{t.skills.codeShelf}</h2>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {r.programming.map((s) => (
                <li key={s} dir="ltr" className="rounded-full border-[1.5px] border-ink bg-chalk px-3.5 py-1.5 font-mono text-sm font-semibold">
                  {s}
                </li>
              ))}
              {["TypeScript", "React", "Next.js", "Node.js", "Tailwind CSS", "Three.js"].map((s) => (
                <li key={s} dir="ltr" className="rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 font-mono text-sm font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
        <Reveal delay={0.08}>
          <Card accent="ruby" className="h-full">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border-[1.5px] border-ink bg-ruby text-white">
                <PenTool className="h-5 w-5" aria-hidden />
              </span>
              <h2 className="font-display text-xl font-bold">{t.skills.designShelf}</h2>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {r.designTools.map((s) => (
                <li key={s} dir="ltr" className="rounded-full border-[1.5px] border-ink bg-chalk px-3.5 py-1.5 font-mono text-sm font-semibold">
                  {s}
                </li>
              ))}
              {["Figma", "Brand identity", "Motion graphics", "UI design"].map((s) => (
                <li key={s} dir="ltr" className="rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 font-mono text-sm font-semibold">
                  {s}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>

      {/* Capability groups */}
      <div className="mt-16 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {capabilityGroups.map((g, i) => {
          const Icon = ICONS[g.icon] ?? Code2;
          return (
            <Reveal key={g.id} delay={(i % 3) * 0.06}>
              <Card className="h-full">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border-[1.5px] border-ink ${TONES[i % TONES.length]}`}>
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold">{g.title[locale]}</h3>
                <p className="mt-2 text-sm leading-[1.8] text-ink-soft">{g.description[locale]}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li key={item} dir="ltr" className="rounded-full bg-chalk px-2.5 py-0.5 font-mono text-[11px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          );
        })}
      </div>

      {/* Principles */}
      <div className="mt-16">
        <Reveal>
          <SectionTitle index="∞">{t.skills.principles}</SectionTitle>
        </Reveal>
        <div className="mt-8 overflow-hidden rounded-[1.6rem] border-[1.5px] border-ink bg-paper shadow-sharp">
          {principles.map((p, i) => (
            <Reveal key={p.title.en} delay={i * 0.05}>
              <div className={`flex flex-col gap-2 p-6 sm:flex-row sm:gap-8 ${i > 0 ? "border-t-[1.5px] border-ink" : ""}`}>
                <span dir="ltr" className="font-display text-3xl font-bold text-qamariya sm:w-16 sm:shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold">{p.title[locale]}</h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-[1.8] text-ink-soft">{p.description[locale]}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Page>
  );
}
