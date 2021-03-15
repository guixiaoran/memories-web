import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Model6 = () => {
  let fbx = useFBX('Model6.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Model6;