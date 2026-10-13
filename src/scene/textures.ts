/**
 * Procedural canvas textures — no image downloads, everything is drawn
 * at runtime so the room stays a few kilobytes and fully themeable.
 */

import * as THREE from "three";
import { PALETTE } from "./stage";

function makeCanvas(w: number, h: number) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  if (!ctx) throw new Error("2D canvas unavailable");
  return { c, ctx };
}

function finish(c: HTMLCanvasElement, repeat: [number, number] = [1, 1]): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(repeat[0], repeat[1]);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/** A Yemeni-style carpet: ruby field, saffron border, cobalt/white diamonds. */
export function carpetTexture(): THREE.CanvasTexture {
  const { c, ctx } = makeCanvas(1024, 768);
  ctx.fillStyle = PALETTE.rubyDeep;
  ctx.fillRect(0, 0, 1024, 768);

  // Outer border bands
  const bands: [string, number][] = [
    [PALETTE.saffron, 0],
    [PALETTE.ink, 28],
    [PALETTE.chalk, 40],
    [PALETTE.cobalt, 52],
    [PALETTE.ruby, 84],
  ];
  for (const [color, inset] of bands) {
    ctx.fillStyle = color;
    ctx.fillRect(inset, inset, 1024 - inset * 2, 768 - inset * 2);
  }

  // Diamond lattice
  const step = 96;
  for (let y = 140; y < 640; y += step) {
    for (let x = 140; x < 900; x += step) {
      const even = ((x + y) / step) % 2 < 1;
      ctx.fillStyle = even ? PALETTE.cobalt : PALETTE.chalk;
      ctx.beginPath();
      ctx.moveTo(x, y - 34);
      ctx.lineTo(x + 34, y);
      ctx.lineTo(x, y + 34);
      ctx.lineTo(x - 34, y);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = even ? PALETTE.saffron : PALETTE.ruby;
      ctx.beginPath();
      ctx.moveTo(x, y - 14);
      ctx.lineTo(x + 14, y);
      ctx.lineTo(x, y + 14);
      ctx.lineTo(x - 14, y);
      ctx.closePath();
      ctx.fill();
    }
  }

  // Center medallion
  ctx.fillStyle = PALETTE.ink;
  ctx.beginPath();
  ctx.ellipse(512, 384, 150, 110, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PALETTE.saffron;
  ctx.beginPath();
  ctx.ellipse(512, 384, 125, 88, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PALETTE.cobalt;
  ctx.beginPath();
  ctx.ellipse(512, 384, 80, 52, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = PALETTE.chalk;
  ctx.beginPath();
  ctx.ellipse(512, 384, 30, 20, 0, 0, Math.PI * 2);
  ctx.fill();

  return finish(c);
}

/** Checked cobalt/white cloth — the mashedda (Yemeni shawl) and cushion stripes. */
export function checkTexture(a = PALETTE.cobalt, b = PALETTE.chalk, cells = 8): THREE.CanvasTexture {
  const { c, ctx } = makeCanvas(256, 256);
  const s = 256 / cells;
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      ctx.fillStyle = (x + y) % 2 === 0 ? a : b;
      ctx.fillRect(x * s, y * s, s, s);
    }
  }
  return finish(c, [3, 2]);
}

/** Striped cushion fabric: base color with thin chalk + ink stripes. */
export function stripeTexture(base: string): THREE.CanvasTexture {
  const { c, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = PALETTE.chalk;
  ctx.fillRect(0, 96, 256, 18);
  ctx.fillRect(0, 142, 256, 18);
  ctx.fillStyle = PALETTE.ink;
  ctx.fillRect(0, 120, 256, 6);
  ctx.fillRect(0, 166, 256, 6);
  return finish(c, [2, 1]);
}

/** Laptop screen: a code editor with a lime cursor. */
export function screenTexture(): THREE.CanvasTexture {
  const { c, ctx } = makeCanvas(512, 320);
  ctx.fillStyle = "#101014";
  ctx.fillRect(0, 0, 512, 320);
  ctx.fillStyle = "#1C1C24";
  ctx.fillRect(0, 0, 512, 26);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = [PALETTE.ruby, PALETTE.saffron, PALETTE.emerald][i];
    ctx.beginPath();
    ctx.arc(16 + i * 18, 13, 5, 0, Math.PI * 2);
    ctx.fill();
  }
  const lines = [
    [PALETTE.magenta, 60],
    [PALETTE.chalk, 180],
    [PALETTE.cobalt, 110],
    [PALETTE.lime, 220],
    [PALETTE.chalk, 90],
    [PALETTE.saffron, 150],
    [PALETTE.cobalt, 200],
    [PALETTE.chalk, 70],
    [PALETTE.emerald, 240],
    [PALETTE.magenta, 120],
  ] as const;
  lines.forEach(([color, w], i) => {
    const indent = (i % 3) * 22;
    ctx.fillStyle = color;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(24 + indent, 48 + i * 24, w, 10);
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = PALETTE.lime;
  ctx.fillRect(24 + 22, 48 + 10 * 24, 10, 14);
  return finish(c);
}

/** Phone screen: a green call bubble. */
export function phoneTexture(): THREE.CanvasTexture {
  const { c, ctx } = makeCanvas(128, 256);
  ctx.fillStyle = "#0B0B10";
  ctx.fillRect(0, 0, 128, 256);
  ctx.fillStyle = PALETTE.emerald;
  ctx.beginPath();
  ctx.arc(64, 120, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("✆", 64, 136);
  ctx.fillStyle = PALETTE.chalk;
  ctx.fillRect(34, 190, 60, 6);
  ctx.fillRect(44, 206, 40, 6);
  return finish(c);
}

/** A simple "code" icon tile for shelf items. */
export function labelTexture(text: string, bg: string, fg = "#fff"): THREE.CanvasTexture {
  const { c, ctx } = makeCanvas(256, 256);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = fg;
  ctx.font = "bold 110px 'Space Grotesk', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 128, 136);
  return finish(c);
}
