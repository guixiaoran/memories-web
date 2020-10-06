import React, { useRef, useState, Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextHelper, API } from "helpers";
import { Canvas, useFrame } from "react-three-fiber";
import { MeshBasicMaterial, TextureLoader } from 'three';
import { PositionalAudio, softShadows, FlyControls } from "drei";
import { useSpring, a } from "react-spring/three";
import { LoadingScreen } from 'components/index';
import moment from "moment";
import { PlazaConfig } from "configurations";


const SpinningMesh = ({ position, args, media }) => {
  //ref to target the mesh
  const mesh = useRef();

  //useFrame allows us to re-render/update rotation on each frame
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.001));
  //

  //Basic expand state
  const [expand] = useState(false);


  // React spring expand animation
  const props = useSpring({
    scale: expand ? [4, 4, 4] : [1, 1, 1],
  });
  const loader = new TextureLoader();
  const material = new MeshBasicMaterial({
    map: loader.load(media),
  });
  return (
    <a.mesh
      position={position}
      ref={mesh}
      onClick={() => {

      }}
      scale={props.scale}
      material={material}
    >
      <boxBufferGeometry attach='geometry' args={args} />

    </a.mesh>
  );
};

SpinningMesh.propTypes = {
  position: PropTypes.any,
  scale: PropTypes.any,
  args: PropTypes.any,
  media: PropTypes.string.isRequired
};

export const Plaza = () => {
  const d = 20;
  const [cubes, setCubes] = useState();
  const [audioArgs] = useState([]);
  useEffect(() => {
    (() => {
      API.getArchieves(async (response) => {
        let tempCubes = [];
        await response.sort((a, b) => moment(a.date).diff(b.date)).forEach(item => {
          if (item.media.length > 0) {
            if (item.media[0].type === "image") {
              for (var i = 0; i < 20; i++)
                tempCubes.push({
                  speed: TextHelper.getRandomInteger(1, 3),
                  position: [
                    TextHelper.getRandomInteger(-d, d),
                    TextHelper.getRandomInteger(-d, d),
                    TextHelper.getRandomInteger(-d, d),
                  ],
                  color: 'pink',
                  media: PlazaConfig.useProxy ? PlazaConfig.mediaProxyUrlSuffix + item.media[0].link : item.media[0].link
                });
            }
          }
        });
        setCubes((tempCubes));
      });
    })();

    softShadows();
  }, []);
  if (audioArgs === undefined || cubes === undefined) return <LoadingScreen />;
  return (
    <div style={{ height: "100vh" }}>
      <Canvas
        colorManagement
        shadowMap
        camera={{ position: [-5, 2, 10], fov: 60 }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <Suspense fallback={null}>
          <group>
            {audioArgs.map(({ position, url }, index) => (
              <mesh key={"mesh" + index} position={position}>
                <boxBufferGeometry attach='geometry' args={[2, 2, 2]} />
                <meshBasicMaterial wireframe attach="material" color="hotpink" />
                <PositionalAudio url={url} distance={0.06} />
              </mesh>
            ))}
            {
              cubes.map((cube, index) => {
                return (
                  <SpinningMesh
                    key={"cube" + index}
                    position={cube.position}
                    color='lightblue'
                    args={[1, 1, 1]}
                    speed={cube.speed}
                    media={cube.media}
                  />
                );
              })
            }
          </group>
        </Suspense>
        <FlyControls
          movementSpeed={2}
          dragToLook={false}
          rollSpeed={Math.PI / 15} //6
        />
      </Canvas>
    </div>
  );
};