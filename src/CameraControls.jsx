import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";

const CameraControl = ({ position }) => {
  const { camera } = useThree();
  const orbitRef = useRef();
  const [updateCam, setUpdateCam] = useState(true);
  const [pos, setPos] = useState(position);

  useEffect(() => {
    setPos(position);
  }, [position]);
  useFrame(() => {
    if (pos && updateCam) {
      camera.position.lerp(pos, 0.05);
    }
  });

  return (
    <OrbitControls
      makeDefault
      ref={orbitRef}
      onStart={() => {
        setUpdateCam(false);
      }}
      onEnd={() => {
        setUpdateCam(true);
        console.log(orbitRef.current.object.position);
        setPos(orbitRef.current.object.position);
      }}
    />
  );
};

export default CameraControl;
