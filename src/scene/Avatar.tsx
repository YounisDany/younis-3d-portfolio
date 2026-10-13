import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { PALETTE, stage } from "./stage";
import { checkTexture } from "./textures";

/**
 * Low-poly Younis — sitting cross-legged on the mattress in a white
 * thobe with a cobalt-check mashedda over the shoulder, typing on the
 * laptop. The head follows the pointer, the hands bob while "typing",
 * and once the intro ends he waves.
 */
export function Avatar({ position }: { position: [number, number, number] }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const torso = useRef<THREE.Group>(null);
  const waveT = useRef(-1);
  const check = useMemo(() => checkTexture(), []);

  const skin = useMemo(() => new THREE.MeshStandardMaterial({ color: PALETTE.skin, roughness: 0.8 }), []);
  const thobe = useMemo(() => new THREE.MeshStandardMaterial({ color: "#FFFFFF", roughness: 0.9 }), []);
  const hair = useMemo(() => new THREE.MeshStandardMaterial({ color: PALETTE.hair, roughness: 0.9 }), []);
  const dark = useMemo(() => new THREE.MeshStandardMaterial({ color: PALETTE.ink, roughness: 0.6 }), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    // Breathing
    if (torso.current) torso.current.scale.y = 1 + Math.sin(t * 1.6) * 0.012;
    // Head follows the pointer, clamped
    if (head.current) {
      const ty = THREE.MathUtils.clamp(-stage.pointer.x * 0.9, -0.6, 0.6);
      const tx = THREE.MathUtils.clamp(stage.pointer.y * 0.5 + 0.12, -0.3, 0.4);
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, ty, 4, delta);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, tx, 4, delta);
    }
    // Typing bob, or a wave when the intro finishes
    if (stage.live && waveT.current < 0) waveT.current = t;
    const waving = stage.live && t - waveT.current < 2.4;
    if (armL.current) {
      armL.current.rotation.x = -1.05 + Math.sin(t * 9) * 0.06;
    }
    if (armR.current) {
      if (waving) {
        const w = t - waveT.current;
        armR.current.rotation.z = THREE.MathUtils.damp(armR.current.rotation.z, -2.3 + Math.sin(w * 9) * 0.35, 10, delta);
        armR.current.rotation.x = THREE.MathUtils.damp(armR.current.rotation.x, -0.2, 8, delta);
      } else {
        armR.current.rotation.z = THREE.MathUtils.damp(armR.current.rotation.z, 0, 4, delta);
        armR.current.rotation.x = THREE.MathUtils.damp(armR.current.rotation.x, -1.05 + Math.cos(t * 9) * 0.06, 8, delta);
      }
    }
  });

  return (
    <group ref={root} position={position}>
      {/* Folded thobe over crossed legs */}
      <mesh position={[0, 0.1, 0.08]} material={thobe} castShadow>
        <cylinderGeometry args={[0.46, 0.5, 0.2, 20]} />
      </mesh>
      <mesh position={[0.2, 0.17, 0.2]} rotation={[0, 0.5, Math.PI / 2]} material={thobe} castShadow>
        <capsuleGeometry args={[0.1, 0.36, 6, 12]} />
      </mesh>
      <mesh position={[-0.2, 0.17, 0.22]} rotation={[0, -0.5, Math.PI / 2]} material={thobe} castShadow>
        <capsuleGeometry args={[0.1, 0.36, 6, 12]} />
      </mesh>
      {/* Feet peeking */}
      <mesh position={[0.36, 0.1, 0.36]} material={skin}>
        <sphereGeometry args={[0.065, 10, 10]} />
      </mesh>
      <mesh position={[-0.36, 0.1, 0.38]} material={skin}>
        <sphereGeometry args={[0.065, 10, 10]} />
      </mesh>

      {/* Torso */}
      <group ref={torso} position={[0, 0.3, 0]}>
        <mesh position={[0, 0.32, 0]} material={thobe} castShadow>
          <capsuleGeometry args={[0.3, 0.42, 8, 16]} />
        </mesh>
        {/* Mashedda over the right shoulder */}
        <mesh position={[0.17, 0.48, 0.1]} rotation={[0.3, 0, -0.5]} castShadow>
          <boxGeometry args={[0.22, 0.62, 0.05]} />
          <meshStandardMaterial map={check} roughness={0.9} />
        </mesh>
        {/* Collar buttons */}
        {[0.55, 0.47].map((y) => (
          <mesh key={y} position={[0, y, 0.3]} material={dark}>
            <sphereGeometry args={[0.012, 8, 8]} />
          </mesh>
        ))}

        {/* Arms */}
        <group ref={armL} position={[-0.3, 0.5, 0.05]} rotation={[-1.05, 0, 0]}>
          <mesh position={[0, -0.22, 0]} material={thobe} castShadow>
            <capsuleGeometry args={[0.075, 0.34, 6, 12]} />
          </mesh>
          <mesh position={[0, -0.46, 0]} material={skin}>
            <sphereGeometry args={[0.07, 10, 10]} />
          </mesh>
        </group>
        <group ref={armR} position={[0.3, 0.5, 0.05]} rotation={[-1.05, 0, 0]}>
          <mesh position={[0, -0.22, 0]} material={thobe} castShadow>
            <capsuleGeometry args={[0.075, 0.34, 6, 12]} />
          </mesh>
          <mesh position={[0, -0.46, 0]} material={skin}>
            <sphereGeometry args={[0.07, 10, 10]} />
          </mesh>
        </group>

        {/* Head */}
        <group ref={head} position={[0, 0.98, 0]}>
          <mesh material={skin} castShadow>
            <sphereGeometry args={[0.24, 24, 24]} />
          </mesh>
          {/* Hair cap */}
          <mesh position={[0, 0.08, -0.02]} material={hair}>
            <sphereGeometry args={[0.245, 24, 24, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
          </mesh>
          {/* Beard line */}
          <mesh position={[0, -0.14, 0.1]} rotation={[0.5, 0, 0]} material={hair}>
            <torusGeometry args={[0.16, 0.035, 8, 20, Math.PI]} />
          </mesh>
          {/* Eyes */}
          {[-0.085, 0.085].map((x) => (
            <mesh key={x} position={[x, 0.03, 0.215]} material={dark}>
              <sphereGeometry args={[0.025, 10, 10]} />
            </mesh>
          ))}
          {/* Brows */}
          {[-0.085, 0.085].map((x) => (
            <mesh key={`b${x}`} position={[x, 0.09, 0.21]} rotation={[0, 0, x > 0 ? -0.15 : 0.15]} material={hair}>
              <boxGeometry args={[0.07, 0.014, 0.02]} />
            </mesh>
          ))}
          {/* Smile */}
          <mesh position={[0, -0.06, 0.215]} rotation={[0, 0, Math.PI]} material={dark}>
            <torusGeometry args={[0.05, 0.009, 6, 16, Math.PI]} />
          </mesh>
          {/* Ear */}
          {[-0.24, 0.24].map((x) => (
            <mesh key={`e${x}`} position={[x, 0, 0]} material={skin}>
              <sphereGeometry args={[0.045, 8, 8]} />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}
