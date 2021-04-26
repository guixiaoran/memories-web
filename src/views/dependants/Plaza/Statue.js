import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Statue = () => {
  let fbx = useFBX('/models/statue.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Statue;