import { ExternalLink, Package, Star } from "lucide-react";
import { GithubIcon as Github } from "../components/BrandIcons";
import { useMemo, useState } from "react";
import { useLang } from "../i18n";
import { getUsedCategories, publishedProjects, type Project } from "../content/projects";
import { ACCENT, getProjectArt } from "../content/art";
import { Card, Page, Reveal } from "../components/Page";

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { t, locale } = useLang();
  const art = getProjectArt(p.slug);
  const accent = ACCENT[p.accent] ?? "#16151A";
  return (
    <Reveal delay={(index % 3) * 0.06} className="h-full">
      <Card className="flex h-full flex-col overflow-hidden !p-0">
        <div className="relative aspect-[16/10] overflow-hidden border-b-[1.5px] border-ink" style={{ background: accent }}>
          {art && <img src={art} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />}
          {p.featured && (
            <span className="absolute start-3 top-3 inline-flex items-center gap-1 rounded-full border-[1.5px] border-ink bg-saffron px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] shadow-sharp-sm">
              <Star className="h-3 w-3" aria-hidden />
              {t.projects.featured}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-bold tracking-tight">{p.name}</h3>
            <span className="shrink-0 rounded-full border border-ink/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
              {t.projects.status[p.status]}
            </span>
          </div>
          <p className="mt-2 text-sm leading-[1.8] text-ink-soft">{p.summary[locale]}</p>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {p.technologies.slice(0, 6).map((tech) => (
              <li key={tech} dir="ltr" className="rounded-full bg-chalk px-2.5 py-0.5 font-mono text-[11px] text-ink">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {p.repositoryUrl && (
              <a href={p.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-paper px-3.5 text-xs font-bold shadow-sharp-sm transition hover:bg-lime">
                <Github className="h-3.5 w-3.5" aria-hidden />
                {t.projects.repo}
              </a>
            )}
            {p.liveUrl && (
              <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-ink px-3.5 text-xs font-bold text-chalk shadow-sharp-sm transition hover:bg-cobalt">
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                {t.projects.live}
              </a>
            )}
            {p.npmUrl && (
              <a href={p.npmUrl} target="_blank" rel="noopener noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-full border-[1.5px] border-ink bg-ruby px-3.5 text-xs font-bold text-white shadow-sharp-sm transition hover:bg-ruby-deep">
                <Package className="h-3.5 w-3.5" aria-hidden />
                {t.projects.npm}
                {p.version && <span className="opacity-80">v{p.version}</span>}
              </a>
            )}
          </div>
        </div>
      </Card>
    </Reveal>
  );
}

export function Projects() {
  const { t } = useLang();
  const [cat, setCat] = useState<string>("all");
  const cats = useMemo(() => getUsedCategories(), []);
  const list = useMemo(
    () => (cat === "all" ? publishedProjects : publishedProjects.filter((p) => p.categories.includes(cat as Project["categories"][number]))),
    [cat],
  );

  return (
    <Page kicker={t.nav.projects} title={t.projects.title} subtitle={t.projects.subtitle}>
      <div className="flex flex-wrap items-center gap-2" role="group">
        <button
          type="button"
          onClick={() => setCat("all")}
          aria-pressed={cat === "all"}
          className={`h-10 rounded-full border-[1.5px] border-ink px-4 text-sm font-bold shadow-sharp-sm transition ${cat === "all" ? "bg-ink text-chalk" : "bg-paper hover:bg-lime"}`}
        >
          {t.projects.all} · {publishedProjects.length}
        </button>
        {cats.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            aria-pressed={cat === c.id}
            className={`h-10 rounded-full border-[1.5px] border-ink px-4 text-sm font-bold shadow-sharp-sm transition ${cat === c.id ? "bg-ink text-chalk" : "bg-paper hover:bg-lime"}`}
          >
            {t.projects.categories[c.id]} · {c.count}
          </button>
        ))}
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">{t.projects.count(list.length)}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((p, i) => (
          <ProjectCard key={p.slug} p={p} index={i} />
        ))}
      </div>
    </Page>
  );
}
