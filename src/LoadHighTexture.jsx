import { useTexture } from "@react-three/drei";
import React, { useState } from "react";
import * as THREE from "three";
const LoadHighTexture = ({ texture }) => {
  // console.log("texture");
  const highTexture = useTexture(texture.high);
  return (
    <>
      <meshBasicMaterial map={highTexture} side={THREE.DoubleSide} />
    </>
  );
};

export default LoadHighTexture;
