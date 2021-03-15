import React, { useState, useEffect, useRef } from 'react';
import { TextHelper, API } from "helpers";
import { Canvas } from "react-three-fiber";
import { Sky, PointerLockControls, softShadows, PositionalAudio, Stars } from "@react-three/drei";
import { Physics } from "use-cannon";
import Tent from './tent';
import Fountain from './Fountain';
import ModelX from './ModelX';
import { LoadingScreen } from 'components/index';
import moment from "moment";
import { PlazaConfig } from "configurations";
import { Player, Ground, Cube } from 'components/dependants/Piazza';
import { MarketSound, ConcertSound } from 'assets/audio/index';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei/index';
import ModelY from './ModelY';


const PlazaInner = () => {
  const [cubes, setCubes] = useState();
  const fountain = useRef();
  const marketSound = useRef();
  const crowdSound = useRef();

  useEffect(() => {
    (() => {
      API.getArchieves(async (response) => {
        let tempCubes = [];
        await response.sort((a, b) => moment(a.date).diff(b.date)).forEach((item, i) => {
          if (item.media.length > 0) {
            if (item.media[0].type === "image") {
              if (item.displayIn === 'PLAZA' || item.displayIn === 'BOTH')
                if (i % 2 === 0) {
                  const getZoneOneZ = () => {
                    const arr = [-28, -27, -26, -25, -24];
                    const rand = TextHelper.getRandomInteger(-30, -20);
                    if (!arr.includes(rand))
                      return rand;
                    else return getZoneOneZ();
                  };
                  const getZoneOneX = () => {
                    const arr = [-13, -14, -15, -16, -17, -18];
                    const rand = TextHelper.getRandomInteger(-10, -20);
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
                } else {
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
                }

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
      <Suspense dispose={null}>
        <Sky sunPosition={[100, -50, 100]} />
        <Stars
          radius={100} // Radius of the inner sphere (default=100)
          depth={50} // Depth of area where stars should fit (default=50)
          count={5000} // Amount of stars (default=5000)
          factor={4} // Size factor (default=4)
          saturation={0} // Saturation 0-1 (default=0)
          fade={true} // Faded dots (default=false)
        />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Player />
          <Suspense>
            <mesh scale={[0.15, 0.15, 0.15]} rotation={[-3.08, 1.30, 3.08]} position={[28, 0, -15]}>
              <ModelX />
            </mesh >
          </Suspense>
          <Suspense>
            <mesh scale={[0.15, 0.15, 0.15]} position={[-28, 0, -15]}>
              <ModelY />
            </mesh >
          </Suspense>
          <Suspense>
            <mesh scale={[0.0070, 0.0070, 0.0070]} position={[-14, 3.4, -28]}>
              <Tent />
              <PositionalAudio ref={marketSound} loop distance={1} url={MarketSound} />
            </mesh>
          </Suspense>
          <Suspense fallback={null} dispose={null}>
            <mesh>
              {
                cubes.map((cube, i) => {
                  if (i / 2 === 0)
                    return <Cube key={`${i}_cube`} imageUrl={cube.media} position={cube.position} />;
                  else return null;
                })
              }
            </mesh>
            <mesh>
              {
                cubes.map((cube, i) => {
                  if (i / 2 !== 0)
                    return <Cube key={`${i}_cube`} imageUrl={cube.media} position={cube.position} />;
                  else return null;
                })
              }
            </mesh>
          </Suspense>
          <Suspense>
            <mesh ref={fountain} scale={[0.01, 0.01, 0.01]} position={[2, 0, -5]}>
              <Fountain />
              <PositionalAudio ref={crowdSound} loop distance={1} url={ConcertSound} />
            </mesh>
          </Suspense>
        </Physics>
        <PointerLockControls />
      </Suspense>
    </Canvas>
  );
};

export const Plaza = () => {

  return (<div style={{ height: "100vh" }}>
    <PlazaInner />
    <Loader />

  </div>
  );
};