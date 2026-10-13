import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Shared shell for the inner pages: gypsum background, hero band, content. */
export function Page({
  kicker,
  title,
  subtitle,
  aside,
  children,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="relative min-h-svh bg-gypsum pb-24 pt-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink shadow-sharp-sm">
              <span className="h-2 w-2 rounded-full bg-ruby" />
              {kicker}
            </p>
            <h1 className="mt-5 text-display-xl text-ink">{title}</h1>
            {subtitle && <p className="mt-4 max-w-2xl text-base leading-[1.85] text-ink-soft md:text-lg">{subtitle}</p>}
          </div>
          {aside && <div className="shrink-0">{aside}</div>}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </motion.div>
  );
}

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Card({ children, className = "", accent = "ink" }: { children: ReactNode; className?: string; accent?: "ink" | "ruby" | "cobalt" }) {
  const shadow = accent === "ruby" ? "shadow-sharp-ruby" : accent === "cobalt" ? "shadow-sharp-cobalt" : "shadow-sharp";
  return <div className={`rounded-[1.6rem] border-[1.5px] border-ink bg-paper p-6 ${shadow} ${className}`}>{children}</div>;
}

export function SectionTitle({ index, children }: { index: string; children: ReactNode }) {
  return (
    <h2 className="flex items-center gap-3 text-display-lg text-ink">
      <span dir="ltr" className="rounded-full border-[1.5px] border-ink bg-lime px-2.5 py-0.5 font-mono text-xs font-semibold">
        {index}
      </span>
      {children}
    </h2>
  );
}
