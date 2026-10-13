import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "../i18n";
import { profile } from "../content/profile";

const KEY = "yd3-intro";
const MS = 1900;

/**
 * Cinematic intro — chalk-white title card with a counter, then the two
 * halves slide apart like the wooden door of a majlis. Once per session.
 */
export function Intro({ onDone }: { onDone: () => void }) {
  const { t } = useLang();
  const reduce = useReducedMotion();
  const [state, setState] = useState<"idle" | "play" | "done">("idle");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    if (reduce || seen) {
      const id = setTimeout(() => {
        setState("done");
        onDone();
      }, 0);
      return () => clearTimeout(id);
    }
    const id = setTimeout(() => setState("play"), 0);
    return () => clearTimeout(id);
  }, [reduce, onDone]);

  useEffect(() => {
    if (state !== "play") return;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / MS);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        try {
          sessionStorage.setItem(KEY, "1");
        } catch {
          // ignore
        }
        setTimeout(() => {
          setState("done");
          onDone();
        }, 220);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [state, onDone]);

  const skip = () => {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      // ignore
    }
    setState("done");
    onDone();
  };

  const doorEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

  return (
    <AnimatePresence>
      {state === "play" && (
        <motion.div key="intro" className="fixed inset-0 z-[90]" aria-live="polite">
          {/* Two door leaves */}
          <motion.div
            className="absolute inset-y-0 start-0 w-1/2 border-e-[3px] border-ink bg-chalk bg-gypsum"
            exit={{ x: "-100%", transition: { duration: 1.0, ease: doorEase } }}
            style={{ x: 0 }}
          />
          <motion.div
            className="absolute inset-y-0 end-0 w-1/2 border-s-[3px] border-ink bg-chalk bg-gypsum"
            exit={{ x: "100%", transition: { duration: 1.0, ease: doorEase } }}
            style={{ x: 0 }}
          />

          {/* Title card */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-between p-6 sm:p-10"
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <div dir="ltr" className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.24em] text-ink-soft">
              <span className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-ruby animate-blink" />
                {t.intro.loading}
              </span>
              <button
                type="button"
                onClick={skip}
                className="rounded-full border-[1.5px] border-ink bg-paper px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-ink shadow-sharp-sm transition hover:bg-lime"
              >
                {t.intro.skip}
              </button>
            </div>

            <div className="flex flex-col items-center gap-3 text-center">
              {/* A qamariya arch drawn in CSS */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-24 w-48 overflow-hidden rounded-t-full border-[3px] border-b-0 border-ink"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_100%,#FF2E4D_0deg,#FF2E4D_36deg,#2A5BFF_36deg,#2A5BFF_72deg,#FFB300_72deg,#FFB300_108deg,#0EC28B_108deg,#0EC28B_144deg,#FF3DC0_144deg,#FF3DC0_180deg)]" />
                <div className="absolute bottom-0 start-1/2 h-10 w-20 -translate-x-1/2 rounded-t-full bg-chalk rtl:translate-x-1/2" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="font-mono text-[11px] uppercase tracking-[0.28em] text-cobalt"
              >
                {t.intro.presents}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                className="text-display-2xl text-ink"
              >
                {profile.nameAr}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                dir="ltr"
                className="font-display text-xl font-semibold text-ink-soft"
              >
                {profile.name}
              </motion.p>
            </div>

            <div className="flex items-end justify-between gap-6">
              <div className="h-[3px] flex-1 bg-ink/10">
                <div className="h-full bg-ink transition-[width] duration-100 ease-linear" style={{ width: `${count}%` }} />
              </div>
              <div dir="ltr" className="font-display text-5xl font-bold tabular-nums text-ink sm:text-7xl">
                {String(count).padStart(3, "0")}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
