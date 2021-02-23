import React, { useState, useEffect } from 'react';
import { TextHelper, API } from "helpers";
import { Canvas } from "react-three-fiber";
import { Sky, PointerLockControls, softShadows } from "@react-three/drei";
import { Physics } from "use-cannon";

// import { PositionalAudio, softShadows, FlyControls } from "drei";
import { LoadingScreen } from 'components/index';
import moment from "moment";
import { PlazaConfig } from "configurations";
import { Player, Ground, Cube } from 'components/dependants/Piazza';


const PlazaInner = () => {
  const [cubes, setCubes] = useState();
  const [audioArgs] = useState([]);
  useEffect(() => {
    (() => {
      API.getArchieves(async (response) => {
        let tempCubes = [];
        await response.sort((a, b) => moment(a.date).diff(b.date)).forEach(item => {
          if (item.media.length > 0) {
            if (item.media[0].type === "image") {
              if (item.displayIn === 'PLAZA' || item.displayIn === 'BOTH')
                tempCubes.push({
                  position: [
                    TextHelper.getRandomInteger(-response.length * 2, response.length),
                    0.6,
                    TextHelper.getRandomInteger(-response.length, 0),
                  ],
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
    <Canvas shadowMap gl={{ alpha: false }} camera={{ fov: 35 }}>
      <Sky sunPosition={[100, 10, 100]} />
      <ambientLight intensity={0.3} />
      <pointLight castShadow intensity={0.8} position={[100, 100, 100]} />
      <Physics gravity={[0, -30, 0]}>
        <Ground />
        <Player />
        {
          cubes.map((cube, i) => {
            return <Cube key={`${i}_cube`} imageUrl={cube.media} position={cube.position} />;
          })
        }
      </Physics>
      <PointerLockControls />
    </Canvas>);
};

export const Plaza = () => {
  const [ready, set] = useState(false);

  return (<div style={{ height: "100vh" }}>
    <PlazaInner />
    {
      !ready && (
        <div className="overlay">
          <div>
            ← Click the dot to start
            <br />
            <span style={{ marginLeft: 18 }}>Needs fullscreen to work!</span>
          </div>
        </div>
      )
    }
    <div className="dot" style={{ pointerEvents: ready ? "none" : "all" }} onClick={() => set(true)} >
      ++++
    </div>
  </div>
  );
};