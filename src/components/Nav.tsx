import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useLang } from "../i18n";

const LINKS = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/projects", key: "projects" },
  { to: "/skills", key: "skills" },
  { to: "/contact", key: "contact" },
] as const;

export function Nav() {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition ${
      isActive ? "bg-ink text-chalk" : "text-ink hover:bg-ink/8"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-[60] px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        {/* Brand */}
        <NavLink to="/" className="glass-light flex items-center gap-2.5 rounded-full py-1.5 pe-4 ps-1.5 shadow-sharp-sm">
          <span className="relative h-8 w-8 overflow-hidden rounded-full border-[1.5px] border-ink">
            <img src="/photo.webp" alt="" className="h-full w-full object-cover object-top" />
          </span>
          <span className="font-display text-sm font-bold tracking-tight">Younis Dany</span>
        </NavLink>

        {/* Desktop links */}
        <nav aria-label={t.nav.menu} className="glass-light hidden items-center gap-1 rounded-full p-1 shadow-sharp-sm md:flex">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass}>
              {t.nav[l.key]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={t.nav.switchAria}
            className="glass-light inline-flex h-10 items-center gap-2 rounded-full px-3.5 text-sm font-semibold shadow-sharp-sm transition hover:bg-lime"
          >
            <Languages className="h-4 w-4" aria-hidden />
            {t.nav.switch}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            className="glass-light inline-flex h-10 w-10 items-center justify-center rounded-full shadow-sharp-sm md:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            aria-label={t.nav.menu}
            className="glass-light mx-auto mt-3 flex max-w-7xl flex-col gap-1 rounded-3xl p-2 shadow-sharp md:hidden"
          >
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-base font-semibold ${isActive ? "bg-ink text-chalk" : "text-ink hover:bg-ink/8"}`
                }
              >
                {t.nav[l.key]}
              </NavLink>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
