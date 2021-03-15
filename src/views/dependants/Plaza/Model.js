import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Model = () => {
  let fbx = useFBX('Model.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Model;