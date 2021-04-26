import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Icecream = () => {
  let fbx = useFBX('/models/icecream.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Icecream;