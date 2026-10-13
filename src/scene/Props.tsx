import { Float, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PALETTE, stage } from "./stage";
import { labelTexture, phoneTexture, screenTexture } from "./textures";
import { Hotspot } from "./Hotspot";
import { useLang } from "../i18n";
import { publishedProjects } from "../content/projects";
import { getProjectArt } from "../content/art";

const wood = new THREE.MeshStandardMaterial({ color: PALETTE.wood, roughness: 0.7 });
const brass = new THREE.MeshStandardMaterial({ color: PALETTE.brass, metalness: 0.85, roughness: 0.3 });

/* ── Low table with coffee ─────────────────────────────────────────────── */

export function CoffeeTable({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow material={wood}>
        <cylinderGeometry args={[0.8, 0.8, 0.07, 32]} />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <mesh key={i} position={[Math.cos(a) * 0.55, 0.2, Math.sin(a) * 0.55]} material={wood} castShadow>
            <cylinderGeometry args={[0.04, 0.05, 0.4, 10]} />
          </mesh>
        );
      })}
      {/* Tray */}
      <mesh position={[-0.15, 0.47, 0.05]} material={brass}>
        <cylinderGeometry args={[0.42, 0.42, 0.025, 32]} />
      </mesh>
      <mesh position={[-0.15, 0.49, 0.05]} material={brass}>
        <torusGeometry args={[0.42, 0.02, 8, 48]} />
      </mesh>
      {/* Dallah */}
      <group position={[-0.28, 0.49, -0.02]}>
        <mesh position={[0, 0.17, 0]} material={brass} castShadow>
          <cylinderGeometry args={[0.07, 0.13, 0.34, 16]} />
        </mesh>
        <mesh position={[0, 0.37, 0]} material={brass}>
          <cylinderGeometry args={[0.04, 0.07, 0.08, 16]} />
        </mesh>
        <mesh position={[0, 0.45, 0]} material={brass}>
          <coneGeometry args={[0.055, 0.14, 16]} />
        </mesh>
        <mesh position={[0.12, 0.26, 0]} rotation={[0, 0, -0.9]} material={brass}>
          <cylinderGeometry args={[0.02, 0.03, 0.26, 10]} />
        </mesh>
        <mesh position={[-0.11, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]} material={brass}>
          <torusGeometry args={[0.07, 0.015, 8, 20, Math.PI]} />
        </mesh>
      </group>
      {/* Cups */}
      {[0.05, 0.18, 0.11].map((x, i) => (
        <mesh key={i} position={[x, 0.515, [0.12, -0.1, 0.28][i]]} castShadow>
          <cylinderGeometry args={[0.035, 0.028, 0.055, 12]} />
          <meshStandardMaterial color="#fff" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Laptop + holographic project screens ─────────────────────────────── */

function HoloScreen({ url, index }: { url: string; index: number }) {
  const tex = useTexture(url);
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const frame = useRef<THREE.MeshBasicMaterial>(null);
  const angle = (index - 1) * 0.5;

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const on = stage.live ? 1 : 0;
    if (mat.current) mat.current.opacity = THREE.MathUtils.damp(mat.current.opacity, 0.92 * on, 2.5, delta);
    if (frame.current) frame.current.opacity = THREE.MathUtils.damp(frame.current.opacity, 0.55 * on, 2.5, delta);
    if (group.current) group.current.rotation.z = Math.sin(t * 0.8 + index) * 0.03;
  });

  return (
    <group ref={group} position={[Math.sin(angle) * 1.1, 1.75 + index * 0.18, Math.cos(angle) * 0.4 - 0.2]} rotation={[-0.08, angle * -0.9, 0]}>
      <mesh>
        <planeGeometry args={[1.05, 0.66]} />
        <meshBasicMaterial ref={mat} map={tex} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[1.11, 0.72]} />
        <meshBasicMaterial ref={frame} color={PALETTE.cobalt} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function Laptop({ position }: { position: [number, number, number] }) {
  const { t } = useLang();
  const screen = useMemo(() => screenTexture(), []);
  const glow = useRef<THREE.MeshStandardMaterial>(null);
  const arts = useMemo(
    () => publishedProjects.map((p) => getProjectArt(p.slug)).filter((a): a is string => Boolean(a)).slice(0, 3),
    [],
  );

  useFrame((state) => {
    if (glow.current) glow.current.emissiveIntensity = stage.live ? 0.9 + Math.sin(state.clock.elapsedTime * 2) * 0.1 : 0.15;
  });

  return (
    <Hotspot id="laptop" to="/projects" label={t.room.laptop} position={position} ringRadius={0.7} labelOffset={[0, 1.15, 0.3]}>
      <group>
        <mesh castShadow>
          <boxGeometry args={[0.74, 0.03, 0.5]} />
          <meshStandardMaterial color="#D9D6D0" metalness={0.5} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.02, 0.05]}>
          <boxGeometry args={[0.58, 0.004, 0.24]} />
          <meshStandardMaterial color="#2A2A30" roughness={0.6} />
        </mesh>
        <group position={[0, 0.015, -0.25]} rotation={[-1.25, 0, 0]}>
          <mesh position={[0, 0.25, 0]} castShadow>
            <boxGeometry args={[0.74, 0.5, 0.025]} />
            <meshStandardMaterial color="#D9D6D0" metalness={0.5} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.25, 0.014]}>
            <planeGeometry args={[0.68, 0.43]} />
            <meshStandardMaterial ref={glow} map={screen} emissive="#ffffff" emissiveMap={screen} emissiveIntensity={0.9} toneMapped={false} />
          </mesh>
        </group>
        <Float speed={1.6} rotationIntensity={0.15} floatIntensity={0.5}>
          {arts.map((url, i) => (
            <HoloScreen key={url} url={url} index={i} />
          ))}
        </Float>
        <pointLight position={[0, 0.5, 0.3]} intensity={stage.live ? 1.2 : 0} color={PALETTE.cobalt} distance={3} />
      </group>
    </Hotspot>
  );
}

/* ── Phone on the table ────────────────────────────────────────────────── */

export function Phone({ position }: { position: [number, number, number] }) {
  const { t } = useLang();
  const tex = useMemo(() => phoneTexture(), []);
  const g = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!g.current) return;
    const tt = state.clock.elapsedTime;
    // A gentle "ringing" wobble every few seconds.
    const ring = Math.max(0, Math.sin(tt * 1.4)) ** 6;
    g.current.rotation.z = Math.sin(tt * 40) * 0.05 * ring;
  });
  return (
    <Hotspot id="phone" to="/contact" label={t.room.phone} position={position} ringRadius={0.34} ringY={0.47} labelOffset={[0, 0.5, 0]}>
      <group ref={g} rotation={[0, 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.012, 0.36]} />
          <meshStandardMaterial color="#111" roughness={0.3} metalness={0.4} />
        </mesh>
        <mesh position={[0, 0.0075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.16, 0.33]} />
          <meshStandardMaterial map={tex} emissive="#fff" emissiveMap={tex} emissiveIntensity={0.8} toneMapped={false} />
        </mesh>
      </group>
    </Hotspot>
  );
}

/* ── Wall frame with the portrait ─────────────────────────────────────── */

export function Frame({ position }: { position: [number, number, number] }) {
  const { t } = useLang();
  const photo = useTexture("/photo.webp");
  return (
    <Hotspot id="frame" to="/about" label={t.room.frame} position={position} ringRadius={0.6} labelOffset={[-0.3, 0.9, 0]}>
      <group rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.96, 1.26, 0.06]} />
          <meshStandardMaterial color={PALETTE.ink} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.8, 1.1]} />
          <meshStandardMaterial color={PALETTE.chalk} />
        </mesh>
        <mesh position={[0, 0.05, 0.04]}>
          <planeGeometry args={[0.7, 0.98]} />
          <meshStandardMaterial map={photo} roughness={0.8} />
        </mesh>
        {/* Little sharp-shadow accent */}
        <mesh position={[0.06, -0.06, -0.01]}>
          <boxGeometry args={[0.96, 1.26, 0.02]} />
          <meshStandardMaterial color={PALETTE.ruby} />
        </mesh>
      </group>
    </Hotspot>
  );
}

/* ── Shelf with design + code tools ───────────────────────────────────── */

export function Shelf({ position }: { position: [number, number, number] }) {
  const { t } = useLang();
  const labels = useMemo(
    () => [labelTexture("</>", PALETTE.ink, PALETTE.lime), labelTexture("Ps", "#0A1F3F", "#31A8FF"), labelTexture("Ai", "#2E1500", "#FF9A00"), labelTexture("Ae", "#15003F", "#9999FF")],
    [],
  );
  return (
    <Hotspot id="shelf" to="/skills" label={t.room.shelf} position={position} ringRadius={0.7} labelOffset={[0.3, 0.7, 0]}>
      <group rotation={[0, Math.PI / 2, 0]}>
        {/* Plank + brackets */}
        <mesh material={wood} castShadow>
          <boxGeometry args={[1.8, 0.05, 0.36]} />
        </mesh>
        {[-0.7, 0.7].map((x) => (
          <mesh key={x} position={[x, -0.12, -0.12]} material={wood}>
            <boxGeometry args={[0.05, 0.2, 0.1]} />
          </mesh>
        ))}
        {/* Paint cans */}
        {[PALETTE.ruby, PALETTE.cobalt, PALETTE.saffron].map((c, i) => (
          <mesh key={c} position={[-0.68 + i * 0.2, 0.13, 0.02]} castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.22, 14]} />
            <meshStandardMaterial color={c} roughness={0.5} />
          </mesh>
        ))}
        {/* Brush */}
        <mesh position={[-0.3, 0.2, 0.08]} rotation={[0, 0, 0.5]}>
          <cylinderGeometry args={[0.012, 0.012, 0.36, 8]} />
          <meshStandardMaterial color={PALETTE.wood} />
        </mesh>
        {/* App tiles */}
        {labels.map((tex, i) => (
          <mesh key={i} position={[0.0 + i * 0.26, 0.14, 0.04]} rotation={[0, 0, 0]} castShadow>
            <boxGeometry args={[0.22, 0.22, 0.06]} />
            <meshStandardMaterial map={tex} roughness={0.4} />
          </mesh>
        ))}
        {/* Tiny server box with blinking LEDs */}
        <ServerBox position={[0.72, 0.1, 0.0]} />
      </group>
    </Hotspot>
  );
}

function ServerBox({ position }: { position: [number, number, number] }) {
  const leds = useRef<THREE.MeshStandardMaterial[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    leds.current.forEach((m, i) => {
      if (m) m.emissiveIntensity = Math.sin(t * (3 + i) + i) > 0 ? 2 : 0.1;
    });
  });
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.2, 0.16, 0.26]} />
        <meshStandardMaterial color="#2A2A30" roughness={0.5} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-0.05 + i * 0.05, 0.03, 0.135]}>
          <sphereGeometry args={[0.012, 8, 8]} />
          <meshStandardMaterial
            ref={(el) => {
              if (el) leds.current[i] = el;
            }}
            color={[PALETTE.emerald, PALETTE.saffron, PALETTE.ruby][i]}
            emissive={[PALETTE.emerald, PALETTE.saffron, PALETTE.ruby][i]}
            emissiveIntensity={1}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}
