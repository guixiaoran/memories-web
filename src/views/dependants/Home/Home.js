import React, { useEffect, useState, useContext } from 'react';
import { Fab } from '@material-ui/core';
import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import { Link } from "react-router-dom";
import { Animator } from "helpers";
import { HeaderContext } from 'contexts';


export const Home = () => {
  const displayStartButtonType = "INTERVAL"; //ALWAYS, INTERVAL, AFTER_VIDEO
  const startButtonTIme = 3; // in seconds
  const { setDisplayBackButton } = useContext(HeaderContext);
  const [transationDone, setTransationDone] = useState(false);
  const [displayStartButton, setDisplayStartButton] = useState(false);
  const [videoLink] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/memories/video/video/original/Video_HC4h5GbAke3c.mp4");
  useEffect(() => {
    let body = document.querySelector("body");
    body.removeAttribute("class", "body-archive");
    (async () => {
      setDisplayBackButton(false);
      setTransationDone(true);
      await Animator.init(true);
    })();
    return () => {
      document.querySelector("body").removeAttribute("class");
      Animator.destroy();
    };
  }, [setDisplayBackButton]);
  useEffect(() => {
    const videoPlayer = document.getElementById("homeVideo");
    switch (displayStartButtonType) {
    case 'AFTER_VIDEO': videoPlayer.onended = function () {
      setDisplayStartButton(true);
    };
      break;
    case 'INTERVAL': setTimeout(() => {
      setDisplayStartButton(true);
    }, startButtonTIme * 1000);
      break;
    default: setDisplayStartButton(true);
    }
  }, [transationDone]);
  if (transationDone === false) return "";
  return (<>
    <section className="primary">
      <div className="parallax hero" style={{
        overflow: "hidden"
      }}>
        <video playsInline id="homeVideo" muted autoPlay style={{
          height: 'auto',
          minHeight: window.innerHeight + 110,
          maxWidth: '100%',
          objectFit: "cover"
        }}>
          <source src={videoLink} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="content hero-title" style={{
          height: '100%',
          textAlign: "center",
          paddingTop: "20%",
          fontFamily: "IBM Plex Sans"
        }}>
          <h2>MEMORIES THAT MAKE US</h2>
          <h3>Storying Italian Migration after the end of the Second World War.</h3>
          <Fab color="primary" variant="extended" aria-label="start" style={{
            opacity: displayStartButton ? 1 : 0,
            display: displayStartButton ? '' : 'none',
            transition: "0.3s",
            marginTop: '10px',
            backgroundColor: '#3B0072'
          }}>
            <Link to="start" style={{
              color: "white", display: 'flex',
              alignItems: 'center'
            }}>
              <p>Start</p>
              <PlayArrowOutlined />
            </Link>
          </Fab>
        </div>

      </div>
    </section>
  </>);
};
