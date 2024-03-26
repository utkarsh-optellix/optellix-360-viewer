import { useFrame, useLoader, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import image1 from "./assets/4.jpg";
import image2 from "./assets/5.jpg";
import image3 from "./assets/6.jpg";
import image4 from "./assets/8.jpg";
import Sphere from "./Sphere.jsx";

import image5 from "./assets/9.jpg";

const Scene360 = ({ count }) => {
  const [grpPos, setGrpPos] = useState(new THREE.Vector3());
  const texture1 = useLoader(TextureLoader, image1);
  const texture2 = useLoader(TextureLoader, image2);
  const texture3 = useLoader(TextureLoader, image3);
  const texture4 = useLoader(TextureLoader, image4);
  const texture5 = useLoader(TextureLoader, image5);
  const groupRef = useRef();

  useEffect(() => {
    const pos = new THREE.Vector3(-count * 100, 0, 0);
    setGrpPos(pos);
  }, [count]);

  const data = [
    {
      texture: texture1,
      position: [0, 0, 0],
    },
    {
      texture: texture2,
      position: [100, 0, 0],
    },
    {
      texture: texture3,
      position: [200, 0, 0],
    },
    {
      texture: texture4,
      position: [300, 0, 0],
    },
    {
      texture: texture5,
      position: [400, 0, 0],
    },
  ];
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerp(grpPos, 0.1);
    }
  });
  return (
    <group ref={groupRef}>
      {data.map((mesh) => (
        <Sphere texture={mesh.texture} position={mesh.position} />
      ))}
    </group>
  );
};

export default Scene360;
