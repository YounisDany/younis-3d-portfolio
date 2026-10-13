import { ArrowUpRight, Mail, MapPin, MessageCircle } from "lucide-react";
import { GithubIcon as Github, InstagramIcon as Instagram } from "../components/BrandIcons";
import { useLang } from "../i18n";
import { profile } from "../content/profile";
import { Card, Page, Reveal } from "../components/Page";

export function Contact() {
  const { t } = useLang();
  const get = (key: string) => profile.links.find((l) => l.key === key);
  const channels = [
    { key: "whatsapp", label: t.contact.whatsapp, icon: MessageCircle, href: get("whatsapp")?.url, handle: get("whatsapp")?.handle, tone: "bg-emerald text-white" },
    { key: "email", label: t.contact.email, icon: Mail, href: profile.email ? `mailto:${profile.email}` : undefined, handle: profile.email ?? "", tone: "bg-cobalt text-white" },
    { key: "github", label: t.contact.github, icon: Github, href: get("github")?.url, handle: get("github")?.handle, tone: "bg-ink text-lime" },
    { key: "instagram", label: t.contact.instagram, icon: Instagram, href: get("instagram")?.url, handle: get("instagram")?.handle, tone: "bg-magenta text-white" },
  ].filter((c) => c.href);

  return (
    <Page kicker={t.nav.contact} title={t.contact.title} subtitle={t.contact.subtitle}>
      <div className="grid gap-5 md:grid-cols-2">
        {channels.map((c, i) => {
          const Icon = c.icon;
          const external = c.key !== "email";
          return (
            <Reveal key={c.key} delay={i * 0.06}>
              <a
                href={c.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group block h-full"
              >
                <Card className="flex h-full items-center gap-5 transition hover:-translate-y-1">
                  <span className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-[1.5px] border-ink ${c.tone}`}>
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-bold">{c.label}</span>
                    <span dir="ltr" className="block truncate text-sm text-ink-soft">
                      {c.handle}
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-ink-mute transition group-hover:text-ink rtl:-scale-x-100" aria-hidden />
                </Card>
              </a>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={0.2}>
        <Card accent="cobalt" className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-[1.8] text-ink-soft">{t.contact.note}</p>
          <p className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-chalk px-3.5 py-1.5 text-sm font-semibold">
            <MapPin className="h-4 w-4 text-ruby" aria-hidden />
            {t.contact.location}
          </p>
        </Card>
      </Reveal>
    </Page>
  );
}
