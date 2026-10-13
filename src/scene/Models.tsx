import { Clone, useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { Suspense } from "react";

type GroupProps = ThreeElements["group"];

/**
 * Real scanned/modelled props (CC0, Poly Haven) — see public/models/LICENSE.txt.
 * Each GLB is Draco-compressed; the decoder is served from /draco/.
 */
export const MODEL = {
  pillows: "/models/throw_pillows_01.glb",
  table: "/models/round_wooden_table_01.glb",
  teaSet: "/models/tea_set_01.glb",
  brassPot: "/models/brass_pot_01.glb",
  diyaLantern: "/models/brass_diya_lantern.glb",
  lantern: "/models/Lantern_01.glb",
  plant: "/models/potted_plant_02.glb",
  laptop: "/models/classic_laptop.glb",
  frame: "/models/hanging_picture_frame_02.glb",
  shelf: "/models/wooden_display_shelves_01.glb",
  basket: "/models/wicker_basket_01.glb",
  ottoman: "/models/Ottoman_01.glb",
} as const;

const DRACO = "/draco/";

function Loaded({ url }: { url: string }) {
  const { scene } = useGLTF(url, DRACO);
  return <Clone object={scene} castShadow receiveShadow />;
}

/** A GLB prop that streams in on its own — the room never waits for it. */
export function Model({ url, ...props }: { url: string } & GroupProps) {
  return (
    <group {...props}>
      <Suspense fallback={null}>
        <Loaded url={url} />
      </Suspense>
    </group>
  );
}

export function preloadModels() {
  for (const url of Object.values(MODEL)) useGLTF.preload(url, DRACO);
}
