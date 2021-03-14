import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const ModelY = () => {
  let fbx = useFBX('ModelY.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default ModelY;