import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Model5 = () => {
  let fbx = useFBX('Model5.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Model5;