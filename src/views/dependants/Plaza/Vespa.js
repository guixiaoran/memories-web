import React from 'react';
import { useFBX } from '@react-three/drei/useFBX';

const Vespa = () => {
  let fbx = useFBX('vespa.fbx');
  // wrap fbx in primitive.
  return <primitive object={fbx} dispose={null} />;
};

export default Vespa;