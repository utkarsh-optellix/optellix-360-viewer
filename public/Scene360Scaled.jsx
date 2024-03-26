import React, { useEffect, useRef, useState } from "react";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import Sphere from "./Sphere.jsx"; // Assuming you have a Sphere component defined elsewhere

const Scene360Scaled = ({ initialPosition }) => {
  const [visibleImages, setVisibleImages] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(initialPosition);
  const groupRef = useRef();

  console.log(visibleImages);
  // Load textures for the visible images
  useEffect(() => {
    // Assuming your images are stored in an array like this
    const images = [
      "4.jpg",
      "5.jpg",
      "6.jpg",
      "8.jpg",
      "9.jpg",
      // Add more images as needed
    ];

    const startIndex = currentPosition - 2 < 0 ? 0 : currentPosition - 2;
    const endIndex =
      startIndex + 5 > images.length ? images.length : startIndex + 5;
    const visibleArray = images.slice(startIndex, endIndex);
    console.log("wow", visibleArray);
    const visibleImagesData = images
      .slice(startIndex, endIndex)
      .map((image, index) => ({
        texture: new TextureLoader().load(image),
        position: [(startIndex + index) * 100, 0, 0], // Adjust positions as needed
      }));

    setVisibleImages(visibleImagesData);
  }, [currentPosition]);

  const handleMoveNext = () => {
    setCurrentPosition((prevPosition) => prevPosition + 1);
  };

  const handleMovePrevious = () => {
    setCurrentPosition((prevPosition) => prevPosition - 1);
  };

  return (
    <group ref={groupRef}>
      {visibleImages.map((imageData, index) => (
        <Sphere
          key={index}
          texture={imageData.texture}
          position={imageData.position}
        />
      ))}
      {/* <button onClick={handleMovePrevious}>Previous</button>
      <button onClick={handleMoveNext}>Next</button> */}
    </group>
  );
};

export default Scene360Scaled;
