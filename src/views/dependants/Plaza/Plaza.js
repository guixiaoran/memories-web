import React, { useState, useEffect, useRef } from 'react';
import { TextHelper, API } from "helpers";
import { Canvas } from "react-three-fiber";
import { Sky, PointerLockControls, softShadows } from "@react-three/drei";
// import { Stars } from "@react-three/drei";
import { Physics } from "use-cannon";
// import Tent from './tent';
import Fountain from './Fountain';
import ModelX from './ModelX';
import { LoadingScreen } from 'components/index';
import moment from "moment";
import { PlazaConfig } from "configurations";
import { Player, Ground, Cube } from 'components/dependants/Piazza';
import { AllegroSound } from 'assets/audio/index';

// import { MarketSound } from 'assets/audio/index';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei/index';
import ModelY from './ModelY';
// import Model from './Model';
import Model2 from './Model2';
// import Model3 from './Model3';
import Model4 from './Model4';
import Model5 from './Model5';
import Vespa from './Vespa';
import Icecream from './Icecream';
// import Model6 from './Model6';


const cubeSize = 50;
const PlazaInner = () => {
  const [cubes, setCubes] = useState();
  const fountain = useRef();
  let backgroundMusic = useRef();
  useEffect(() => {
    (() => {
      API.getArchieves(async (response) => {
        let tempCubes = [];
        await response.sort((a, b) => moment(a.date).diff(b.date)).forEach((item) => {
          if (item.media.length > 0) {
            if (item.media[0].type === "image") {
              if (item.displayIn === 'PLAZA' || item.displayIn === 'BOTH') {
                const getZoneOneZ = () => {
                  const arr = [-28, -27, -26, -25, -24];
                  const rand = TextHelper.getRandomInteger(-20, 20);
                  if (!arr.includes(rand))
                    return rand;
                  else return getZoneOneZ();
                };
                const getZoneOneX = () => {
                  const arr = [-13, -14, -15, -16, -17, -18];
                  const rand = TextHelper.getRandomInteger(-20, 20);
                  if (!arr.includes(rand))
                    return rand;
                  else return getZoneOneX();
                };
                tempCubes.push({
                  position: [
                    getZoneOneX(),
                    0.4,
                    getZoneOneZ(),
                  ],
                  media: PlazaConfig.useProxy ? `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_CORS_PORT}/${item.media[0].link}` : item.media[0].link
                });
              }
            }
          }
        });
        setCubes((tempCubes));
        backgroundMusic.current = new Audio(AllegroSound);
        backgroundMusic.current.play();
      });
    })();
    softShadows();
    return () => {
      backgroundMusic.current.pause();
      backgroundMusic.current = null;
    };
  }, []);

  if (cubes === undefined) return <LoadingScreen />;

  return (
    <Canvas shadowMap gl={{ alpha: false }} camera={{ fov: 35 }}>
      <Sky sunPosition={[100, 5, 50]} />
      <ambientLight intensity={1} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Suspense>
          <Ground />
        </Suspense>
        <Suspense>
          <Player />
        </Suspense>
        <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} rotation={[-3.08, 1.30, 3.08]} position={[30, 0, 4]}>
            <ModelX />
          </mesh >
        </Suspense>
        <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} position={[-33, 0, 9]}>
            <ModelY />
          </mesh >
        </Suspense>
        <Suspense>
          <mesh scale={[0.07, 0.07, 0.07]} rotation={[0, -0.64, 0]} position={[-26, 0, -35]}>
            <Model2 />
          </mesh >
        </Suspense>
        <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} rotation={[0, 2.72, 0]} position={[57, 0.01, -15]}>
            <Model4 />
          </mesh >
        </Suspense>
        <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} position={[5, 0, 18]}>
            <Model5 />
          </mesh >
        </Suspense>
        <Suspense fallback={null} dispose={null}>
          <mesh>
            {
              cubes.map((cube, i) => {
                if (i / 2 === 0)
                  return <Cube key={`${i}_cube`} imageUrl={cube.media} position={cube.position} scale={[cubeSize, 100, cubeSize]} />;
                else return null;
              })
            }
          </mesh>
          <mesh>
            {
              cubes.map((cube, i) => {
                if (i / 2 !== 0)
                  return <Cube key={`${i}_cube`} imageUrl={cube.media} position={cube.position} scale={[100, cubeSize, cubeSize]} />;
                else return null;
              })
            }
          </mesh>
        </Suspense>
        <Suspense>
          <mesh ref={fountain} scale={[0.01, 0.01, 0.01]} position={[2, 0, -5]}>
            <Fountain />
          </mesh>
        </Suspense>

        <Suspense>
          <mesh scale={[0.10, 0.10, 0.10]} position={[2, 0, -15]}>
            <Vespa />
          </mesh >
        </Suspense>
        <Suspense>
          <mesh scale={[0.008, 0.008, 0.008]} position={[-3, 0, -10]} rotation={[-1.6, 0, 0]}>
            <Icecream />
          </mesh >
        </Suspense>
        <Suspense>
          <mesh ref={fountain} scale={[0.01, 0.01, 0.01]} position={[0, -5, -5]} >
            <Fountain />
          </mesh>
        </Suspense>

      </Physics>
      <PointerLockControls />
    </Canvas >
  );
};

export const Plaza = () => {

  return (<div style={{ height: "100vh" }}>
    <PlazaInner />
    <Loader />

  </div>
  );
};
