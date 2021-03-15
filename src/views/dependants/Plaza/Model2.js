import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Model2 = () => {
  let fbx = useFBX('Model2.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Model2;