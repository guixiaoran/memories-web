import React, { useState, useEffect, useRef } from 'react';
import { TextHelper, API } from "helpers";
import { Canvas } from "react-three-fiber";
import { Sky, PointerLockControls, softShadows, PositionalAudio } from "@react-three/drei";
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
// import Model6 from './Model6';



const PlazaInner = () => {
  const [cubes, setCubes] = useState();
  const fountain = useRef();
  // const marketSound = useRef();
  const allegroSound = useRef();

  useEffect(() => {
    (() => {
      API.getArchieves(async (response) => {
        let tempCubes = [];
        await response.sort((a, b) => moment(a.date).diff(b.date)).forEach((item, i) => {
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
                })
              }

              if (i % 2 === 0) {
                /* const getZoneOneZ = () => {
                   const arr = [-28, -27, -26, -25, -24];
                   const rand = TextHelper.getRandomInteger(-40, -20);
                   if (!arr.includes(rand))
                     return rand;
                   else return getZoneOneZ();
                 };
                 const getZoneOneX = () => {
                   const arr = [-13, -14, -15, -16, -17, -18];
                   const rand = TextHelper.getRandomInteger(-10, -30);
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
                 });*/
              } else {/*
                  const getZoneTwoZ = () => {
                    const rand = TextHelper.getRandomInteger(-20, -30);
                    if (rand !== -28 && rand !== -27 && rand !== -26)
                      return rand;
                    else return getZoneTwoZ();
                  };
                  const getZoneTwoX = () => {
                    const arr = [13, 14, 15, 16, 17];
                    const rand = TextHelper.getRandomInteger(10, 20);
                    if (!arr.includes(rand))
                      return rand;
                    else return getZoneTwoX();
                  };
                  tempCubes.push({
                    position: [
                      getZoneTwoX(),
                      0.4,
                      getZoneTwoZ(),
                    ],
                    media: PlazaConfig.useProxy ? `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_CORS_PORT}/${item.media[0].link}` : item.media[0].link
                  });
                */}

            }
          }
        });
        setCubes((tempCubes));
      });
    })();
    softShadows();
    return () => {
      window.location.reload();
    };
  }, []);

  if (cubes === undefined) return <LoadingScreen />;

  return (
    <Canvas shadowMap gl={{ alpha: false }} camera={{ fov: 35 }}>
      <Sky sunPosition={[0, 5, 50]} >

      </Sky>



      <ambientLight intensity={0.7} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
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

        {/* <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} rotation={[0, 0.50, 0]} position={[0, 0, -115]}>
            <Model />
          </mesh >
        </Suspense> */}

        <Suspense>
          <mesh scale={[0.07, 0.07, 0.07]} rotation={[0, -0.64, 0]} position={[-26, 0, -35]}>
            <Model2 />
          </mesh >
        </Suspense>

        {/* <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} rotation={[0, -0.75, 0]} position={[-55, 0, -95]}>
            <Model3 />
          </mesh >
        </Suspense> */}

        <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} rotation={[0, 2.72 , 0]} position={[57, 0, -20]}>
            <Model4 />
          </mesh >
        </Suspense>


        <Suspense>
          <mesh scale={[0.15, 0.15, 0.15]} position={[5, 0, 25]}>
            <Model5 />
          </mesh >
        </Suspense>

        {/* <Suspense>
          <mesh scale={[0.0070, 0.0070, 0.0070]} position={[-14, 3.4, -28]}>
            <Tent />
            <PositionalAudio ref={marketSound} loop distance={1} url={MarketSound} />
          </mesh>
        </Suspense> */}
        <Suspense fallback={null} dispose={null}>
          <mesh>
            {
              cubes.map((cube, i) => {
                if (i / 2 === 0)
                  return <Cube key={`${i}_cube`} imageUrl={cube.media} position={cube.position} scale={[20, 20, 20]} />;
                else return null;
              })
            }
          </mesh>
          <mesh>
            {
              cubes.map((cube, i) => {
                if (i / 2 !== 0)
                  return <Cube key={`${i}_cube`} imageUrl={cube.media} position={cube.position} scale={[20, 20, 20]} />;
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
          <mesh ref={fountain} scale={[0.01, 0.01, 0.01]} position={[0, -5, -5]}>
            <PositionalAudio ref={allegroSound} loop distance={50} url={AllegroSound} />

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
