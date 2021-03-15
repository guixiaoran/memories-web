import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Model4 = () => {
  let fbx = useFBX('Model4.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Model4;