import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PALETTE, stage } from "./stage";
import { carpetTexture } from "./textures";
import { Model, MODEL } from "./Models";

/* ── Materials shared across the room ─────────────────────────────────── */

const chalk = new THREE.MeshStandardMaterial({ color: PALETTE.chalk, roughness: 0.95 });
const chalkDeep = new THREE.MeshStandardMaterial({ color: PALETTE.chalkDeep, roughness: 0.95 });
const wood = new THREE.MeshStandardMaterial({ color: PALETTE.wood, roughness: 0.7 });
const woodDark = new THREE.MeshStandardMaterial({ color: PALETTE.woodDark, roughness: 0.75 });
const ink = new THREE.MeshStandardMaterial({ color: PALETTE.ink, roughness: 0.6 });

/* ── Qamariya — the Yemeni stained-glass arch window ──────────────────── */

const PANES = [PALETTE.ruby, PALETTE.cobalt, PALETTE.saffron, PALETTE.emerald, PALETTE.magenta, PALETTE.cobalt, PALETTE.ruby];

function Qamariya({ position, seed = 0 }: { position: [number, number, number]; seed?: number }) {
  const r = 0.78;
  const paneMats = useMemo(
    () =>
      PANES.map(
        (c) =>
          new THREE.MeshStandardMaterial({
            color: c,
            emissive: c,
            emissiveIntensity: 0.55,
            transparent: true,
            opacity: 0.92,
            side: THREE.DoubleSide,
            roughness: 0.3,
          }),
      ),
    [],
  );
  const colors = useMemo(() => PANES.map((_, i) => PANES[(i + seed) % PANES.length]), [seed]);

  return (
    <group position={position}>
      {/* Gypsum frame — a thick white arch */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[r, r + 0.16, 48, 1, 0, Math.PI]} />
        <meshStandardMaterial color={PALETTE.chalk} roughness={0.9} side={THREE.DoubleSide} />
      </mesh>
      {/* Fan of colored panes */}
      {colors.map((_, i) => {
        const start = (i / PANES.length) * Math.PI;
        const len = Math.PI / PANES.length;
        return (
          <mesh key={i} position={[0, 0, 0.005]} material={paneMats[(i + seed) % paneMats.length]}>
            <circleGeometry args={[r * 0.96, 24, start, len]} />
          </mesh>
        );
      })}
      {/* Gypsum ribs between panes */}
      {colors.map((_, i) => {
        const a = (i / PANES.length) * Math.PI;
        return (
          <mesh key={`rib-${i}`} position={[Math.cos(a) * r * 0.48, Math.sin(a) * r * 0.48, 0.02]} rotation={[0, 0, a]}>
            <boxGeometry args={[r * 0.96, 0.035, 0.03]} />
            <meshStandardMaterial color={PALETTE.chalk} roughness={0.9} />
          </mesh>
        );
      })}
      {/* Center rosette */}
      <mesh position={[0, 0, 0.03]}>
        <circleGeometry args={[r * 0.22, 24, 0, Math.PI]} />
        <meshStandardMaterial color={PALETTE.chalk} roughness={0.9} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <circleGeometry args={[r * 0.12, 24, 0, Math.PI]} />
        <meshStandardMaterial color={PALETTE.saffron} emissive={PALETTE.saffron} emissiveIntensity={0.6} />
      </mesh>
      {/* Sill */}
      <mesh position={[0, -0.06, 0.06]}>
        <boxGeometry args={[r * 2 + 0.34, 0.1, 0.14]} />
        <meshStandardMaterial color={PALETTE.chalk} roughness={0.9} />
      </mesh>
      {/* Rectangular lattice window below */}
      <group position={[0, -0.62, 0.01]}>
        <mesh>
          <planeGeometry args={[r * 1.6, 0.92]} />
          <meshStandardMaterial color="#DDEBFF" emissive="#BFD8FF" emissiveIntensity={0.5} roughness={0.2} />
        </mesh>
        {[-0.3, 0, 0.3].map((x) => (
          <mesh key={`v${x}`} position={[x, 0, 0.01]}>
            <boxGeometry args={[0.035, 0.92, 0.02]} />
            <meshStandardMaterial color={PALETTE.chalk} />
          </mesh>
        ))}
        {[-0.25, 0.25].map((y) => (
          <mesh key={`h${y}`} position={[0, y, 0.01]}>
            <boxGeometry args={[r * 1.6, 0.035, 0.02]} />
            <meshStandardMaterial color={PALETTE.chalk} />
          </mesh>
        ))}
        <mesh position={[0, 0, -0.01]}>
          <boxGeometry args={[r * 1.6 + 0.12, 1.04, 0.04]} />
          <meshStandardMaterial color={PALETTE.chalk} roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

/** Colored light pools on the floor — the sun through the qamariya. */
function LightPools() {
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.16 + Math.sin(t * 0.5 + i) * 0.04;
    });
  });
  const pools: { x: number; z: number; color: string; w: number; h: number }[] = [
    { x: -2.6, z: -2.0, color: PALETTE.ruby, w: 1.9, h: 1.1 },
    { x: 0.2, z: -1.7, color: PALETTE.cobalt, w: 2.2, h: 1.2 },
    { x: 2.9, z: -2.1, color: PALETTE.saffron, w: 1.9, h: 1.1 },
  ];
  return (
    <group>
      {pools.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) refs.current[i] = el;
          }}
          position={[p.x, 0.02, p.z]}
          rotation={[-Math.PI / 2, 0, 0.25]}
        >
          <circleGeometry args={[1, 32]} />
          <meshBasicMaterial color={p.color} transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
      {pools.map((p, i) => (
        <group key={`s${i}`} position={[p.x, 0.02, p.z]} scale={[p.w, 1, p.h]} />
      ))}
    </group>
  );
}

/* ── Gypsum frieze band with small arches ─────────────────────────────── */

function Frieze({ width, position, rotation = [0, 0, 0] }: { width: number; position: [number, number, number]; rotation?: [number, number, number] }) {
  const count = Math.floor(width / 0.42);
  return (
    <group position={position} rotation={rotation}>
      <mesh material={chalkDeep}>
        <boxGeometry args={[width, 0.26, 0.06]} />
      </mesh>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} position={[-width / 2 + 0.21 + i * 0.42, -0.02, 0.04]} material={chalk}>
          <circleGeometry args={[0.13, 16, 0, Math.PI]} />
        </mesh>
      ))}
      {/* Neon tech strip tucked above the frieze */}
      <mesh position={[0, 0.17, 0.03]}>
        <boxGeometry args={[width * 0.98, 0.03, 0.03]} />
        <meshStandardMaterial color={PALETTE.lime} emissive={PALETTE.lime} emissiveIntensity={1.6} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ── Cushions ──────────────────────────────────────────────────────────── */

function Mattress({ position, rotation = [0, 0, 0], length }: { position: [number, number, number]; rotation?: [number, number, number]; length: number }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh receiveShadow castShadow>
        <boxGeometry args={[length, 0.22, 1.25]} />
        <meshStandardMaterial color={PALETTE.rubyDeep} roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.115, 0]}>
        <boxGeometry args={[length, 0.012, 0.2]} />
        <meshStandardMaterial color={PALETTE.saffron} roughness={0.9} />
      </mesh>
    </group>
  );
}

/* ── Door + beams ──────────────────────────────────────────────── */

function Door({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      <mesh position={[0, 0, -0.02]} material={woodDark}>
        <boxGeometry args={[1.25, 2.5, 0.08]} />
      </mesh>
      <mesh position={[0, 1.25, -0.02]} material={woodDark}>
        <circleGeometry args={[0.62, 24, 0, Math.PI]} />
      </mesh>
      {[-0.3, 0.3].map((x) => (
        <mesh key={x} position={[x, 0.1, 0.04]} material={wood}>
          <boxGeometry args={[0.45, 2.0, 0.04]} />
        </mesh>
      ))}
      <mesh position={[0, 1.2, 0.04]} material={wood}>
        <circleGeometry args={[0.46, 20, 0, Math.PI]} />
      </mesh>
      <mesh position={[0.42, -0.05, 0.1]}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshStandardMaterial color={PALETTE.brass} metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Chalk arch surround */}
      <mesh position={[0, 1.25, -0.03]} material={chalkDeep}>
        <ringGeometry args={[0.62, 0.8, 24, 1, 0, Math.PI]} />
      </mesh>
    </group>
  );
}

/* ── Room root ─────────────────────────────────────────────────────────── */

export function Room() {
  const carpet = useMemo(() => carpetTexture(), []);
  const neon = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((state) => {
    if (neon.current) neon.current.emissiveIntensity = stage.live ? 1.2 + Math.sin(state.clock.elapsedTime * 3) * 0.3 : 0.2;
  });

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow material={chalkDeep}>
        <planeGeometry args={[14, 12]} />
      </mesh>
      {/* Carpet */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, -1.0]} receiveShadow>
        <planeGeometry args={[7.2, 5.2]} />
        <meshStandardMaterial map={carpet} roughness={1} />
      </mesh>
      <LightPools />

      {/* Walls */}
      <mesh position={[0, 2, -4]} receiveShadow material={chalk}>
        <planeGeometry args={[10, 4]} />
      </mesh>
      <mesh position={[-5, 2, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow material={chalk}>
        <planeGeometry args={[8, 4]} />
      </mesh>
      <mesh position={[5, 2, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow material={chalk}>
        <planeGeometry args={[8, 4]} />
      </mesh>
      {/* Baseboards */}
      <mesh position={[0, 0.08, -3.97]} material={ink}>
        <boxGeometry args={[10, 0.16, 0.05]} />
      </mesh>
      <mesh position={[-4.97, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} material={ink}>
        <boxGeometry args={[8, 0.16, 0.05]} />
      </mesh>
      <mesh position={[4.97, 0.08, 0]} rotation={[0, Math.PI / 2, 0]} material={ink}>
        <boxGeometry args={[8, 0.16, 0.05]} />
      </mesh>

      {/* Friezes with neon strips */}
      <Frieze width={10} position={[0, 3.35, -3.96]} />
      <Frieze width={8} position={[-4.96, 3.35, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Frieze width={8} position={[4.96, 3.35, 0]} rotation={[0, -Math.PI / 2, 0]} />

      {/* Ceiling beams */}
      {[-3.2, -1.6, 0, 1.6, 3.2].map((x) => (
        <mesh key={x} position={[x, 3.92, 0]} material={woodDark}>
          <boxGeometry args={[0.18, 0.16, 8]} />
        </mesh>
      ))}

      {/* Qamariya windows on the back wall */}
      <Qamariya position={[-2.9, 2.35, -3.97]} seed={0} />
      <Qamariya position={[0, 2.45, -3.97]} seed={2} />
      <Qamariya position={[2.9, 2.35, -3.97]} seed={4} />

      {/* Seating along the back wall */}
      <Mattress position={[0, 0.11, -3.25]} length={8.6} />
      {/* Real throw pillows as backrests along the back wall */}
      {[-3.2, -1.6, 0, 1.6, 3.2].map((x) => (
        <Model key={x} url={MODEL.pillows} position={[x, 0.2, -3.5]} scale={1.45} />
      ))}

      {/* Seating along the left wall */}
      <Mattress position={[-4.3, 0.11, -0.9]} rotation={[0, Math.PI / 2, 0]} length={3.6} />
      {[-2.2, -0.7].map((z) => (
        <Model key={z} url={MODEL.pillows} position={[-4.5, 0.2, z]} rotation={[0, Math.PI / 2, 0]} scale={1.45} />
      ))}

      <Model url={MODEL.plant} position={[4.2, 0, -3.1]} scale={1.35} rotation={[0, 0.6, 0]} />
      <Model url={MODEL.plant} position={[-4.2, 0, 1.7]} scale={1.2} rotation={[0, -1.2, 0]} />
      <Model url={MODEL.ottoman} position={[-3.3, 0, 1.5]} scale={1.05} rotation={[0, 0.6, 0]} />
      <Model url={MODEL.basket} position={[4.35, 0, -2.2]} scale={1.3} rotation={[0, 0.4, 0]} />
      <Door position={[4.97, 1.25, 2.1]} />

      {/* Hidden material ref so the neon flicker can be shared */}
      <mesh visible={false}>
        <boxGeometry args={[0.01, 0.01, 0.01]} />
        <meshStandardMaterial ref={neon} />
      </mesh>
    </group>
  );
}
