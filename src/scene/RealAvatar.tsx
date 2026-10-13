import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SkeletonUtils } from "three/examples/jsm/Addons.js";
import { stage, PALETTE } from "./stage";

/**
 * RealAvatar — Quaternius's rigged "Man" (CC0, via poly.pizza) sitting on
 * the mattress with its built-in Sitting clip. The shirt is recolored to a
 * white thobe and the head follows the pointer on top of the animation.
 */

const DRACO = "/draco/";
const CLIP_SIT = "HumanArmature|Man_Sitting";

/** Runtime recolor — keeps the CC0 model but dresses it for the majlis. */
const MATERIAL_COLORS: Record<string, string> = {
  Shirt: "#F7F5F0",
  Pants: "#F7F5F0",
  Socks: "#F7F5F0",
  Hair: PALETTE.hair,
  Skin: "#D9A57F",
};

function Rigged({ url }: { url: string }) {
  const { scene, animations } = useGLTF(url, DRACO);
  const root = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const group = useRef<THREE.Group>(null);
  const { actions } = useAnimations(animations, group);
  const head = useRef<THREE.Object3D | null>(null);

  useEffect(() => {
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
        m.frustumCulled = false;
        const mats = Array.isArray(m.material) ? m.material : [m.material];
        const recolored = mats.map((mat) => {
          const c = MATERIAL_COLORS[mat.name];
          if (!c) return mat;
          const clone = (mat as THREE.MeshStandardMaterial).clone();
          clone.color.set(c);
          return clone;
        });
        m.material = Array.isArray(m.material) ? recolored : recolored[0];
      }
      if (o.name === "Head") head.current = o;
    });
  }, [root]);

  useEffect(() => {
    const sit = actions[CLIP_SIT];
    if (!sit) return;
    sit.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.3).play();
    return () => {
      sit.fadeOut(0.2);
    };
  }, [actions]);

  useFrame((_, delta) => {
    // Head tracking layered on top of the animation (runs after the mixer).
    const h = head.current;
    if (h) {
      const ty = THREE.MathUtils.clamp(-stage.pointer.x * 0.8, -0.55, 0.55);
      const tx = THREE.MathUtils.clamp(stage.pointer.y * 0.45, -0.25, 0.35);
      h.rotation.y += THREE.MathUtils.damp(0, ty, 6, delta);
      h.rotation.x += THREE.MathUtils.damp(0, tx, 6, delta);
    }
  });

  return (
    <group ref={group}>
      <primitive object={root} />
    </group>
  );
}

export function RealAvatar({ url, position, scale = 0.37, rotation = [0, 0, 0] }: { url: string; position: [number, number, number]; scale?: number; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Suspense fallback={null}>
        <Rigged url={url} />
      </Suspense>
    </group>
  );
}
