import React, { Suspense, useEffect, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";

import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import LoadHighTexture from "./LoadHighTexture";

const Sphere = ({ texture, position, delay }) => {
  const [state, setState] = useState(false);
  const lowTexture = useTexture(texture.low);

  return (
    <>
      <mesh position={position}>
        <sphereGeometry args={[50, 60, 60]} />
        <Suspense
          fallback={
            <>
              <meshBasicMaterial map={lowTexture} side={THREE.DoubleSide} />
            </>
          }
        >
          <LoadHighTexture texture={texture} />
        </Suspense>
        {/* <meshBasicMaterial map={lowTexture} side={THREE.DoubleSide} /> */}
        {/* <LoadHighTexture texture={texture} /> */}
      </mesh>
    </>
  );
};

export default Sphere;
