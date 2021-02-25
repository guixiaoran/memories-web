import React, { useState, useEffect, useRef } from 'react';
import { TextHelper, API } from "helpers";
import { Canvas } from "react-three-fiber";
import { Sky, PointerLockControls, softShadows, PositionalAudio, } from "@react-three/drei";
import { Physics } from "use-cannon";
import Tent from './tent';
import Fountain from './Fountain';

// import { PositionalAudio, softShadows, FlyControls } from "drei";
import { LoadingScreen } from 'components/index';
import moment from "moment";
import { PlazaConfig } from "configurations";
import { Player, Ground, Cube } from 'components/dependants/Piazza';
import { MarketSound, ConcertSound } from 'assets/audio/index';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei/index';


const PlazaInner = () => {
  const [cubes, setCubes] = useState();
  const [audioArgs] = useState([]);
  const fountain = useRef();

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
                    media: PlazaConfig.useProxy ? PlazaConfig.mediaProxyUrlSuffix + item.media[0].link : item.media[0].link
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
                    media: PlazaConfig.useProxy ? PlazaConfig.mediaProxyUrlSuffix + item.media[0].link : item.media[0].link
                  });
                }

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
    <Suspense fallback={<Loader />}>
      <Canvas shadowMap gl={{ alpha: false }} camera={{ fov: 35 }}>
        <Sky sunPosition={[100, -4, 100]} />
        <ambientLight intensity={0.3} />
        <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
        <Physics gravity={[0, -30, 0]}>
          <Ground />
          <Player />
          <mesh scale={[0.0070, 0.0070, 0.0070]} position={[-14, 3.4, -28]}>
            <Tent />
            <PositionalAudio loop distance={1} url={MarketSound} />
          </mesh>
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
          <mesh ref={fountain} scale={[0.01, 0.01, 0.01]} position={[14, 0, -28]}>
            <Fountain />

            <PositionalAudio loop distance={1} url={ConcertSound} />
          </mesh>
        </Physics>
        <PointerLockControls />
      </Canvas>
    </Suspense>
  );
};

export const Plaza = () => {

  return (<div style={{ height: "100vh" }}>
    <PlazaInner />


  </div>
  );
};