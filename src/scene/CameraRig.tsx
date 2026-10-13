import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { stage, smoothstep } from "./stage";

/**
 * Camera rig — five framed "stops" around the majlis, keyed to scroll.
 * Pointer adds a little parallax; dragging adds yaw/pitch that decays.
 */
const STOPS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [0.3, 2.1, 6.6], look: [0, 1.0, -1.6] }, // entrance — wide
  { pos: [-1.5, 1.75, 1.1], look: [-0.6, 0.8, -2.3] }, // laptop
  { pos: [2.2, 1.85, 0.6], look: [4.9, 1.85, -1.0] }, // frame
  { pos: [-2.0, 1.95, 0.5], look: [-4.9, 1.9, -1.5] }, // shelf
  { pos: [0.7, 1.35, 0.6], look: [1.35, 0.5, -0.8] }, // phone
];

const _p = new THREE.Vector3();
const _l = new THREE.Vector3();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _axisY = new THREE.Vector3(0, 1, 0);
const _right = new THREE.Vector3();

export function CameraRig({ interactive }: { interactive: boolean }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 1, -1.6));

  useFrame((_, delta) => {
    stage.smooth += (stage.progress - stage.smooth) * (1 - Math.exp(-delta * 4.5));
    const p = stage.smooth;
    const seg = STOPS.length - 1;
    const scaled = p * seg;
    const i = Math.min(seg - 1, Math.floor(scaled));
    const t = smoothstep(scaled - i);

    _a.set(...STOPS[i].pos);
    _b.set(...STOPS[i + 1].pos);
    _p.lerpVectors(_a, _b, t);
    _a.set(...STOPS[i].look);
    _b.set(...STOPS[i + 1].look);
    _l.lerpVectors(_a, _b, t);

    // Drag orbit around the look target; decays when released.
    if (!stage.drag.active) {
      stage.drag.yaw *= Math.exp(-delta * 2.2);
      stage.drag.pitch *= Math.exp(-delta * 2.2);
    }
    if (interactive) {
      _dir.subVectors(_p, _l);
      _dir.applyAxisAngle(_axisY, stage.drag.yaw + stage.pointer.x * -0.12);
      _right.crossVectors(_axisY, _dir).normalize();
      _dir.applyAxisAngle(_right, stage.drag.pitch + stage.pointer.y * 0.08);
      _p.addVectors(_l, _dir);
    }

    camera.position.lerp(_p, 1 - Math.exp(-delta * 5.5));
    look.current.lerp(_l, 1 - Math.exp(-delta * 5.5));
    camera.lookAt(look.current);
  });

  return null;
}
