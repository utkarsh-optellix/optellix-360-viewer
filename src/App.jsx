import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { Loader, OrbitControls, Stats } from "@react-three/drei";
import { OBJLoader } from "three/addons/loaders/OBJLoader.js";

import {
  BufferGeometry,
  Float32BufferAttribute,
  MeshBasicMaterial,
  SphereGeometry,
  Mesh,
} from "three";
import { transforms } from "./transforms";

import CameraControl from "./CameraControls.jsx";
import Scene360Scaled from "./Scene360Scaled.jsx";

function App() {
  const [count, setCount] = useState(0);

  const nextImg = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: "10",
          height: "50px",
          width: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(0,0,0,0.7)",
          borderRadius: "10px",
          top: "10px",
          left: "10px",
          cursor: "pointer",
        }}
        onClick={nextImg}
      >
        {" "}
        Next
      </div>
      <Canvas style={{ height: "100vh", width: "100vw" }} camera={[0, 0, 0]}>
        <Stats />
        <ambientLight />
        <OrbitControls />
        <Scene360Scaled initialPosition={count} />
      </Canvas>
      <Loader
        containerStyles={{
          background: "transparent",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          pointerEvents: "none",
        }}
        barStyles={{ background: "gray" }}
        innerStyles={{ background: "white", margin: "30px" }}
      />
    </div>
  );
}

export default App;
