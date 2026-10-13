import { Award, Briefcase, Download, GraduationCap, Languages, MapPin } from "lucide-react";
import { useLang } from "../i18n";
import { profile } from "../content/profile";
import { Card, Page, Reveal, SectionTitle } from "../components/Page";

export function About() {
  const { t, locale } = useLang();
  const r = profile.resume;

  return (
    <Page
      kicker={t.nav.about}
      title={t.about.title}
      subtitle={t.about.intro}
      aside={
        <a
          href={r.cvUrl}
          download
          className="inline-flex h-12 items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-ruby px-6 text-sm font-bold text-white shadow-sharp transition hover:-translate-y-0.5 hover:bg-ruby-deep"
        >
          <Download className="h-4 w-4" aria-hidden />
          {t.about.download}
        </a>
      }
    >
      {/* Portrait + facts */}
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="relative mx-auto max-w-sm">
            <div className="absolute -inset-3 rounded-[2.4rem] bg-[conic-gradient(from_200deg,#FF2E4D,#2A5BFF,#FFB300,#0EC28B,#FF2E4D)] opacity-70 blur-xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] border-[1.5px] border-ink bg-paper shadow-sharp">
              <img src={r.photo} alt={t.about.photoAlt} className="h-auto w-full object-cover object-top" width={608} height={860} />
            </div>
          </div>
        </Reveal>
        <div className="space-y-5 lg:col-span-8">
          <Reveal>
            <Card accent="cobalt">
              <p className="text-display-md text-qamariya">{t.about.statement}</p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">{t.about.location}</dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                    <MapPin className="h-4 w-4 text-ruby" aria-hidden />
                    {profile.location?.[locale]}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">{t.about.availability}</dt>
                  <dd className="mt-1 text-sm font-semibold">{profile.availability?.[locale]}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">{t.hero.eyebrow}</dt>
                  <dd className="mt-1 text-sm font-semibold">{r.headline[locale]}</dd>
                </div>
              </dl>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card>
              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-cobalt" aria-hidden />
                <h3 className="font-display text-lg font-bold">{t.about.languages}</h3>
              </div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {r.languages.map((l) => (
                  <li key={l.name.en} className="flex items-center justify-between gap-4 rounded-2xl bg-chalk px-4 py-3">
                    <span>
                      <span className="block text-sm font-bold">{l.name[locale]}</span>
                      <span className="block text-xs text-ink-mute">{l.level[locale]}</span>
                    </span>
                    <span className="flex gap-1" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={`h-2.5 w-5 rounded-full border border-ink ${i < l.dots ? "bg-cobalt" : "bg-paper"}`} />
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        </div>
      </div>

      {/* Experience */}
      <div className="mt-16">
        <Reveal>
          <SectionTitle index="01">{t.about.experience}</SectionTitle>
        </Reveal>
        <ol className="mt-8 space-y-5">
          {r.experience.map((e, i) => (
            <Reveal key={e.title.en} delay={i * 0.06}>
              <Card accent={i === 0 ? "ruby" : "ink"} className="grid gap-4 md:grid-cols-12">
                <div className="md:col-span-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden />
                    {e.period[locale]}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-display text-xl font-bold">{e.title[locale]}</h3>
                  <p className="mt-1 text-sm font-semibold text-ink-soft">{e.org[locale]}</p>
                  {e.detail && <p className="mt-3 text-[15px] leading-[1.8] text-ink-soft">{e.detail[locale]}</p>}
                </div>
              </Card>
            </Reveal>
          ))}
        </ol>
      </div>

      {/* Education */}
      <div className="mt-16">
        <Reveal>
          <SectionTitle index="02">{t.about.education}</SectionTitle>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {r.education.map((e, i) => (
            <Reveal key={e.title.en} delay={i * 0.06}>
              <Card>
                <GraduationCap className="h-6 w-6 text-cobalt" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-bold">{e.title[locale]}</h3>
                <p className="mt-1 text-sm text-ink-soft">{e.org[locale]}</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">{e.period[locale]}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Courses */}
      <div className="mt-16">
        <Reveal>
          <SectionTitle index="03">{t.about.courses}</SectionTitle>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {r.courses.map((e, i) => (
            <Reveal key={e.title.en} delay={i * 0.05}>
              <Card>
                <div className="flex items-start justify-between gap-3">
                  <Award className="h-6 w-6 text-saffron" aria-hidden />
                  <span className="rounded-full border border-ink/15 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{e.period[locale]}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{e.title[locale]}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{e.org[locale]}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </Page>
  );
}
