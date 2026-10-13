import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { stage } from "./stage";

/**
 * RealAvatar — a rigged humanoid GLB (Ready Player Me / Mixamo skeleton)
 * posed procedurally: cross-legged on the mattress, hands on the laptop,
 * head following the pointer, a small typing bob, and a wave after the
 * intro. No animation clips are required.
 *
 * Bone names follow the Mixamo convention used by Ready Player Me:
 * Hips, Spine, Spine1, Spine2, Neck, Head, LeftShoulder, LeftArm,
 * LeftForeArm, LeftHand, LeftUpLeg, LeftLeg, LeftFoot (and Right*).
 */

const deg = THREE.MathUtils.degToRad;

const SIT_POSE: Record<string, [number, number, number]> = {
  Hips: [0, 0, 0],
  Spine: [deg(8), 0, 0],
  Spine1: [deg(6), 0, 0],
  Spine2: [deg(4), 0, 0],
  LeftUpLeg: [deg(-95), deg(50), deg(10)],
  LeftLeg: [deg(120), 0, 0],
  LeftFoot: [deg(20), 0, 0],
  RightUpLeg: [deg(-95), deg(-50), deg(-10)],
  RightLeg: [deg(120), 0, 0],
  RightFoot: [deg(20), 0, 0],
  LeftArm: [deg(40), 0, deg(60)],
  LeftForeArm: [deg(-20), deg(-40), deg(40)],
  RightArm: [deg(40), 0, deg(-60)],
  RightForeArm: [deg(-20), deg(40), deg(-40)],
};

function Rigged({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const root = useMemo(() => scene, [scene]);
  const bones = useRef<Record<string, THREE.Bone>>({});
  const waveStart = useRef(-1);

  useEffect(() => {
    const map: Record<string, THREE.Bone> = {};
    root.traverse((o) => {
      if ((o as THREE.Bone).isBone) map[o.name] = o as THREE.Bone;
    });
    bones.current = map;
    for (const [name, rot] of Object.entries(SIT_POSE)) {
      const b = map[name];
      if (b) b.rotation.set(rot[0], rot[1], rot[2]);
    }
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
        m.frustumCulled = false;
      }
    });
  }, [root]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const b = bones.current;
    const head = b.Head;
    if (head) {
      const ty = THREE.MathUtils.clamp(-stage.pointer.x * 0.9, -0.6, 0.6);
      const tx = THREE.MathUtils.clamp(stage.pointer.y * 0.5 + 0.1, -0.3, 0.4);
      head.rotation.y = THREE.MathUtils.damp(head.rotation.y, ty, 4, delta);
      head.rotation.x = THREE.MathUtils.damp(head.rotation.x, tx, 4, delta);
    }
    if (stage.live && waveStart.current < 0) waveStart.current = t;
    const waving = stage.live && t - waveStart.current < 2.4;
    const l = b.LeftForeArm;
    const r = b.RightForeArm;
    const ra = b.RightArm;
    if (l) l.rotation.x = SIT_POSE.LeftForeArm[0] + Math.sin(t * 9) * 0.05;
    if (r && ra) {
      if (waving) {
        const w = t - waveStart.current;
        ra.rotation.z = THREE.MathUtils.damp(ra.rotation.z, deg(-150), 8, delta);
        r.rotation.x = THREE.MathUtils.damp(r.rotation.x, deg(-60) + Math.sin(w * 9) * 0.4, 10, delta);
      } else {
        ra.rotation.z = THREE.MathUtils.damp(ra.rotation.z, SIT_POSE.RightArm[2], 4, delta);
        r.rotation.x = THREE.MathUtils.damp(r.rotation.x, SIT_POSE.RightForeArm[0] + Math.cos(t * 9) * 0.05, 8, delta);
      }
    }
  });

  return <primitive object={root} />;
}

export function RealAvatar({ url, position, scale = 1 }: { url: string; position: [number, number, number]; scale?: number }) {
  return (
    <group position={[position[0], position[1] - 0.35, position[2]]} scale={scale}>
      <Suspense fallback={null}>
        <Rigged url={url} />
      </Suspense>
    </group>
  );
}
