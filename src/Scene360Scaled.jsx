import { useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { KTX2Loader } from "three/addons/loaders/KTX2Loader.js";
import Sphere from "./Sphere.jsx"; // Assuming you have a Sphere component defined elsewhere
import { transforms } from "./transforms.js";

const Scene360Scaled = ({ initialPosition }) => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [prevVisibleImages, setPrevVisibleImages] = useState([]);
  //   const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const groupRef = useRef();
  const [grpPos, setGrpPos] = useState(new THREE.Vector3());
  const { gl } = useThree();

  // Load textures for the visible imagescl
  useEffect(() => {
    const getImages = async () => {
      const images = transforms.captureData;
      const startIndex = initialPosition - 2 < 0 ? 0 : initialPosition - 2;
      const endIndex =
        startIndex + 5 > images.length ? images.length : startIndex + 5;
      const visibleArray = images.slice(startIndex, endIndex);

      const ktx2Loader = new KTX2Loader();
      ktx2Loader.detectSupport(gl);
      const visibleImagesData = await Promise.all(
        visibleArray.map(async (image, index) => {
          const lowImagePath = `/assets/images_low/${
            image.capturePaths[1].split("/")[1]
          }`;
          const highImagePath = `/assets/images_high/${
            image.capturePaths[1].split("/")[1]
          }`;
          const loadTexture = async (url) => {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}`);
            }
            return await response.blob();
          };

          return {
            low: lowImagePath,
            high: highImagePath,
            position: [(startIndex + index) * 100, 0, 0], // Adjust positions as needed
          };
          // Return texture and position data
        })
      );
      setVisibleImages(visibleImagesData);
    };
    getImages();
    const pos = new THREE.Vector3(-initialPosition * 100, 0, 0);
    setGrpPos(pos);
  }, [initialPosition]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.lerp(grpPos, 0.1);
    }
  });

  return (
    <group ref={groupRef}>
      {visibleImages.map((imageData, index) => (
        <>
          <Suspense fallback={null}>
            <Sphere
              key={index}
              texture={imageData}
              position={imageData.position}
            />
          </Suspense>
        </>
      ))}
    </group>
  );
};

export default Scene360Scaled;
