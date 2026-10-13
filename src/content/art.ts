/** slug → illustrative artwork (public/art). */
export const projectArt: Record<string, string> = {
  cafepos: "/art/cafepos.webp",
  masar: "/art/masar.webp",
  "saudi-regions-widget": "/art/saudi-regions-widget.webp",
  "link-guard": "/art/link-guard.webp",
  gasflow: "/art/gasflow.webp",
  "yemen-regions-widget": "/art/yemen-regions-widget.webp",
  "lawyers-office": "/art/lawyers-office.webp",
  t3afi: "/art/t3afi.webp",
  "trading-plan": "/art/trading-plan.webp",
  "rijal-almaa": "/art/rijal-almaa.webp",
  menuee: "/art/menuee.webp",
  "athar-alula": "/art/athar-alula.webp",
};

export function getProjectArt(slug: string): string | null {
  return projectArt[slug] ?? null;
}

/** Sharp accent per project accent key (keep in sync with index.css). */
export const ACCENT: Record<string, string> = {
  forest: "#0EC28B",
  charcoal: "#16151A",
  bronze: "#FFB300",
  teal: "#2A5BFF",
  wine: "#FF2E4D",
  moss: "#0EC28B",
  amber: "#FFB300",
};
