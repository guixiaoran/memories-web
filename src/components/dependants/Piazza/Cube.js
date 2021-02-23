import * as THREE from "three";
import PropTypes from 'prop-types';
import React from "react";
import { useLoader } from "react-three-fiber";
import { useBox } from "use-cannon";
import create from "zustand";

const useCubeStore = create((set) => ({
  cubes: [],
  addCube: (x, y, z) => set((state) => ({ cubes: [...state.cubes, [x, y, z]] })),
}));

export const Cubes = () => {
  const cubes = useCubeStore((state) => state.cubes);
  return cubes.map((coords, index) => <Cube key={index} position={coords} />);
};

export const Cube = (props) => {
  const [ref] = useBox(() => ({ type: "Static", ...props }));
  const texture = useLoader(THREE.TextureLoader, props.imageUrl);


  return (
    <mesh ref={ref} receiveShadow castShadow>
      {[...Array(6)].map((_, index) => (
        <meshStandardMaterial attachArray="material" map={texture} key={index} />
      ))}
      <boxBufferGeometry />
    </mesh>
  );
};

Cube.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
