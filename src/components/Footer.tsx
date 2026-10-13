import { Mail, MessageCircle } from "lucide-react";
import { GithubIcon as Github, InstagramIcon as Instagram } from "./BrandIcons";
import { useLang } from "../i18n";
import { profile } from "../content/profile";

export function Footer() {
  const { t } = useLang();
  const link = (key: string) => profile.links.find((l) => l.key === key)?.url;
  return (
    <footer className="relative z-10 border-t-[3px] border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-xl font-bold tracking-tight">Younis Dany · يونس ضاعني</p>
          <p className="mt-1 text-sm text-ink-soft">{t.footer.tagline}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {link("github") && (
            <a href={link("github")} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper shadow-sharp-sm transition hover:bg-lime">
              <Github className="h-4 w-4" aria-hidden />
            </a>
          )}
          {link("whatsapp") && (
            <a href={link("whatsapp")} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper shadow-sharp-sm transition hover:bg-emerald hover:text-white">
              <MessageCircle className="h-4 w-4" aria-hidden />
            </a>
          )}
          {link("instagram") && (
            <a href={link("instagram")} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper shadow-sharp-sm transition hover:bg-magenta hover:text-white">
              <Instagram className="h-4 w-4" aria-hidden />
            </a>
          )}
          {profile.email && (
            <a href={`mailto:${profile.email}`} aria-label="Email" className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-ink bg-paper shadow-sharp-sm transition hover:bg-cobalt hover:text-white">
              <Mail className="h-4 w-4" aria-hidden />
            </a>
          )}
        </div>
      </div>
      <div className="border-t border-ink/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 text-xs text-ink-mute sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} Younis Dany. {t.footer.rights}
          </p>
          <p>{t.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
