/**
 * Stage store — mutable, allocation-free state shared between the DOM
 * (scroll, pointer, drag) and the render loop. Read every frame by the
 * camera rig; written by listeners in the Home page.
 */

export const STOP_COUNT = 6;

export type HotspotId = "laptop" | "frame" | "shelf" | "phone";

export const stage = {
  /** 0–1 scroll progress across the home tour. */
  progress: 0,
  /** Smoothed progress (render loop). */
  smooth: 0,
  /** Normalized pointer, -0.5 … 0.5. */
  pointer: { x: 0, y: 0 },
  /** Extra yaw/pitch from dragging, decays back to zero. */
  drag: { yaw: 0, pitch: 0, active: false },
  /** Which hotspot the pointer is over (for the cursor + HUD). */
  hover: null as HotspotId | null,
  /** True once the intro has finished — the avatar waves, screens boot. */
  live: false,
};

export function stopAt(progress: number): number {
  return Math.min(STOP_COUNT - 1, Math.max(0, Math.round(progress * (STOP_COUNT - 1))));
}

/** Bell weight (0–1) of stop `i` at `progress`. */
export function stopWeight(progress: number, i: number): number {
  const d = Math.abs(progress - i / (STOP_COUNT - 1)) * (STOP_COUNT - 1);
  return Math.max(0, 1 - d);
}

export function smoothstep(t: number): number {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  return x * x * (3 - 2 * x);
}

/** Colors shared by the scene and the DOM (keep in sync with index.css). */
export const PALETTE = {
  chalk: "#F6F3EE",
  chalkDeep: "#ECE7DF",
  ink: "#16151A",
  ruby: "#FF2E4D",
  rubyDeep: "#D4123A",
  cobalt: "#2A5BFF",
  cobaltDeep: "#1B3FC4",
  saffron: "#FFB300",
  emerald: "#0EC28B",
  lime: "#D4FF2E",
  magenta: "#FF3DC0",
  wood: "#B8702E",
  woodDark: "#7A4418",
  brass: "#D8A430",
  skin: "#E0B089",
  hair: "#24170F",
} as const;
