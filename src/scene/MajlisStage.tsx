import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { Room } from "./Room";
import { Avatar } from "./Avatar";
import { RealAvatar } from "./RealAvatar";
import { DeskCorner } from "./Props";
import { CoffeeTable, Frame, Phone, Shelf } from "./Props";
import { CameraRig } from "./CameraRig";
import { PALETTE } from "./stage";
import { AVATAR_URL, preloadModels } from "./Models";

preloadModels();

/**
 * Stage — the WebGL canvas with the whole majlis.
 * `quality` "high" enables shadows + higher DPR; "low" is for phones.
 */
export function Stage({ quality, label }: { quality: "high" | "low"; label: string }) {
  const high = quality === "high";
  return (
    <Canvas
      aria-label={label}
      role="img"
      dpr={high ? [1, 1.8] : [1, 1.3]}
      shadows={high}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0.3, 2.1, 6.6], fov: 44, near: 0.1, far: 60 }}
      onCreated={({ gl }) => {
        gl.setClearColor(PALETTE.chalk);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      style={{ position: "absolute", inset: 0 }}
    >
      {/* Daylight — warm key through the windows, cool fill from the room */}
      <hemisphereLight args={["#FFFFFF", "#E6DCCF", 0.85]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[2.5, 7, 4]}
        intensity={1.9}
        color="#FFF6E8"
        castShadow={high}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
      />
      {/* Colored spill from the qamariya */}
      <spotLight position={[-2.9, 2.4, -3.6]} target-position={[-2.6, 0, -1.8]} angle={0.5} penumbra={1} intensity={6} color={PALETTE.ruby} distance={8} />
      <spotLight position={[0, 2.5, -3.6]} angle={0.5} penumbra={1} intensity={6} color={PALETTE.cobalt} distance={8} />
      <spotLight position={[2.9, 2.4, -3.6]} angle={0.5} penumbra={1} intensity={6} color={PALETTE.saffron} distance={8} />

      <CameraRig interactive={high} />

      {AVATAR_URL ? (
        <RealAvatar url={AVATAR_URL} position={[3.62, 0.4, 0.4]} scale={0.4} rotation={[0, Math.PI / 2, 0]} />
      ) : (
        <Avatar position={[-0.6, 0.22, -2.75]} />
      )}
      <Phone position={[-0.42, 0.507, -0.42]} />
      {/* Walls, carpet and every GLB prop render immediately (each model streams behind its own Suspense) */}
      <Room />
      <CoffeeTable position={[0, 0, -0.9]} />
      <Shelf position={[-4.78, 1.95, -1.5]} />
      <DeskCorner position={[4.5, 0, 0.35]} />
      {/* Texture-backed props wait only for their own images */}
      <Suspense fallback={null}>
        <Frame position={[4.93, 1.85, -1.0]} />
      </Suspense>

      {high && <ContactShadows position={[0, 0.01, -1]} opacity={0.35} scale={14} blur={2.2} far={3} color={PALETTE.ink} />}
    </Canvas>
  );
}
