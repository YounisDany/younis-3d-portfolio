import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
import { stage, type HotspotId, PALETTE } from "./stage";

/**
 * Hotspot — a clickable group in the room.
 *
 * Hover: the group lifts slightly, a label chip appears, the cursor turns
 * into a pointer and the floor ring brightens. Click: route navigation.
 */
export function Hotspot({
  id,
  to,
  label,
  children,
  position,
  ringRadius = 0.5,
  ringY = 0.012,
  labelOffset = [0, 1, 0],
}: {
  id: HotspotId;
  to: string;
  label: string;
  children: ReactNode;
  position: [number, number, number];
  ringRadius?: number;
  ringY?: number;
  labelOffset?: [number, number, number];
}) {
  const navigate = useNavigate();
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const [hover, setHover] = useState(false);

  useFrame((state, delta) => {
    if (group.current) {
      const lift = hover ? 0.06 : 0;
      group.current.position.y = THREE.MathUtils.damp(group.current.position.y, position[1] + lift, 8, delta);
    }
    if (ring.current) {
      const t = state.clock.elapsedTime;
      const pulse = 1 + Math.sin(t * 2.6) * 0.06;
      const s = (hover ? 1.18 : 1) * pulse;
      ring.current.scale.set(s, s, s);
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.damp(mat.opacity, hover ? 0.95 : 0.45, 8, delta);
    }
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHover(true);
        stage.hover = id;
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHover(false);
        if (stage.hover === id) stage.hover = null;
        document.body.style.cursor = "";
      }}
      onClick={(e) => {
        e.stopPropagation();
        document.body.style.cursor = "";
        navigate(to);
      }}
    >
      {children}
      {/* Floor marker ring */}
      <mesh ref={ring} rotation={[-Math.PI / 2, 0, 0]} position={[0, ringY - position[1], 0]}>
        <ringGeometry args={[ringRadius * 0.82, ringRadius, 48]} />
        <meshBasicMaterial color={PALETTE.cobalt} transparent opacity={0.45} toneMapped={false} />
      </mesh>
      <Html
        position={labelOffset}
        center
        distanceFactor={6}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none", transition: "opacity .25s, transform .25s", opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(6px)" }}
      >
        <div className="whitespace-nowrap rounded-full border-[1.5px] border-ink bg-paper px-3.5 py-1.5 font-sans text-[13px] font-semibold text-ink shadow-sharp-sm">
          {label}
        </div>
      </Html>
    </group>
  );
}
