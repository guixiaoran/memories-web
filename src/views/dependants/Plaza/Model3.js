import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Model3 = () => {
  let fbx = useFBX('Model3.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Model3;