import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, Download, MousePointerClick } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useLang } from "../i18n";
import { profile } from "../content/profile";
import { Stage } from "../scene/MajlisStage";
import { stage, STOP_COUNT, stopAt } from "../scene/stage";
import { Intro } from "../components/Intro";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const TOUR_ROUTES = ["/about", "/projects", "/about", "/skills", "/contact", "/projects"];

/** Scroll, pointer and drag listeners feeding the stage store. */
function useStageInput(container: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = container.current;
    if (!el) return;
    const update = () => {
      const max = Math.max(1, el.offsetHeight - window.innerHeight);
      stage.progress = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const move = (e: PointerEvent) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      if (stage.drag.active) {
        stage.drag.yaw += (nx - stage.pointer.x) * 2.4;
        stage.drag.pitch += (ny - stage.pointer.y) * 1.2;
        stage.drag.yaw = Math.max(-0.9, Math.min(0.9, stage.drag.yaw));
        stage.drag.pitch = Math.max(-0.4, Math.min(0.4, stage.drag.pitch));
      }
      stage.pointer.x = nx;
      stage.pointer.y = ny;
    };
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("a,button,nav,header,[data-ui]")) return;
      stage.drag.active = true;
    };
    const up = () => {
      stage.drag.active = false;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      stage.progress = 0;
      stage.smooth = 0;
      stage.drag.yaw = 0;
      stage.drag.pitch = 0;
    };
  }, [container]);
}

/** Dots on the side that show which stop is framed and jump on click. */
function TourDots({ onJump }: { onJump: (i: number) => void }) {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  useEffect(() => {
    let raf = 0;
    let last = -1;
    const tick = () => {
      const s = stopAt(stage.smooth);
      if (s !== last) {
        last = s;
        setActive(s);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div data-ui className="fixed inset-y-0 end-4 z-[40] hidden flex-col items-center justify-center gap-3 sm:end-6 md:flex">
      {Array.from({ length: STOP_COUNT }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onJump(i)}
          aria-label={t.tour[i].kicker}
          aria-current={active === i ? "step" : undefined}
          className="group relative flex h-6 w-6 items-center justify-center"
        >
          <span
            className={`block rounded-full border-[1.5px] border-ink transition-all duration-300 ${
              active === i ? "h-4 w-4 bg-ruby" : "h-2.5 w-2.5 bg-paper group-hover:bg-lime"
            }`}
          />
          <span className="pointer-events-none absolute end-full me-3 whitespace-nowrap rounded-full border-[1.5px] border-ink bg-paper px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-ink opacity-0 shadow-sharp-sm transition group-hover:opacity-100">
            {t.tour[i].kicker}
          </span>
        </button>
      ))}
    </div>
  );
}

export function Home() {
  const { t, isRtl } = useLang();
  const Arrow = isRtl ? ArrowLeft : ArrowRight;
  const reduce = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const stops = useRef<(HTMLElement | null)[]>([]);
  const [ready, setReady] = useState(false);
  const [quality, setQuality] = useState<"high" | "low">("low");

  useStageInput(container);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const q = coarse || window.innerWidth < 900 ? "low" : "high";
    const id = setTimeout(() => setQuality(q), 0);
    return () => clearTimeout(id);
  }, []);

  const onIntroDone = useCallback(() => {
    setReady(true);
    stage.live = true;
  }, []);

  useEffect(() => {
    return () => {
      stage.live = false;
    };
  }, []);

  const jump = useCallback(
    (i: number) => stops.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
    [reduce],
  );

  const reveal = (delay = 0) => ({
    initial: { opacity: 0, y: 18 },
    animate: ready ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <div ref={container} className="relative">
      <Intro onDone={onIntroDone} />

      {/* Fixed 3D stage */}
      <div className="fixed inset-0 z-0">
        <Stage quality={quality} label={t.a11y.stage} />
      </div>

      <TourDots onJump={jump} />

      {/* Scroll chapters (DOM overlay) */}
      <div className="pointer-events-none relative z-10">
        {/* Stop 0 — welcome */}
        <section
          ref={(el) => {
            stops.current[0] = el;
          }}
          className="flex min-h-svh flex-col justify-end px-4 pb-16 pt-28 sm:px-6 md:justify-center md:pb-24"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div className="pointer-events-auto max-w-2xl" data-ui>
              <motion.p {...reveal(0.05)} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink shadow-sharp-sm">
                <span className="h-2 w-2 rounded-full bg-emerald" />
                {t.hero.eyebrow}
              </motion.p>
              <motion.h1 {...reveal(0.15)} className="mt-6 text-display-2xl text-ink">
                <span className="block text-halo">{t.hero.title1}</span>
                <span className="relative block">
                  <span aria-hidden className="absolute inset-0 text-halo text-chalk">{t.hero.titleAccent}</span>
                  <span className="relative text-qamariya">{t.hero.titleAccent}</span>
                </span>
              </motion.h1>
              <motion.p {...reveal(0.3)} className="mt-5 max-w-lg rounded-3xl glass-light p-5 text-base leading-[1.85] text-ink-soft shadow-sharp md:text-lg">
                {t.hero.sub}
              </motion.p>
              <motion.div {...reveal(0.42)} className="mt-7 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => jump(1)}
                  className="inline-flex h-12 items-center gap-2.5 rounded-full border-[1.5px] border-ink bg-ruby px-6 text-sm font-bold text-white shadow-sharp transition hover:-translate-y-0.5 hover:bg-ruby-deep"
                >
                  {t.hero.cta}
                  <ArrowDown className="h-4 w-4" aria-hidden />
                </button>
                <a
                  href={profile.resume.cvUrl}
                  download
                  className="inline-flex h-12 items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-6 text-sm font-bold text-ink shadow-sharp transition hover:-translate-y-0.5 hover:bg-lime"
                >
                  <Download className="h-4 w-4" aria-hidden />
                  {t.hero.cv}
                </a>
              </motion.div>
              <motion.p {...reveal(0.6)} dir="ltr" className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
                <MousePointerClick className="h-3.5 w-3.5" aria-hidden />
                {t.hero.hint}
              </motion.p>
            </div>
          </div>
        </section>

        {/* Stops 1–4 — tour captions */}
        {t.tour.slice(1).map((chapter, idx) => {
          const i = idx + 1;
          const alignEnd = i % 2 === 0;
          return (
            <section
              key={i}
              ref={(el) => {
                stops.current[i] = el;
              }}
              className={`flex min-h-svh items-end px-4 pb-16 pt-28 sm:px-6 md:items-center md:pb-24 ${alignEnd ? "md:justify-end" : ""}`}
            >
              <div className={`mx-auto flex w-full max-w-7xl ${alignEnd ? "justify-end" : ""}`}>
                <motion.article
                  data-ui
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ amount: 0.4, once: false }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="pointer-events-auto max-w-md rounded-[2rem] glass-light p-6 shadow-sharp sm:p-8"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cobalt">{chapter.kicker}</p>
                  <h2 className="mt-3 text-display-lg text-ink">{chapter.title}</h2>
                  <p className="mt-3 text-[15px] leading-[1.85] text-ink-soft">{chapter.body}</p>
                  <Link
                    to={TOUR_ROUTES[i]}
                    className="group mt-6 inline-flex h-11 items-center gap-2 rounded-full border-[1.5px] border-ink bg-ink px-5 text-sm font-bold text-chalk shadow-sharp-ruby transition hover:-translate-y-0.5"
                  >
                    {chapter.cta}
                    <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden />
                  </Link>
                </motion.article>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
