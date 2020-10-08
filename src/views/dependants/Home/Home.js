import React, { useEffect, useState, useContext } from 'react';
import { Fab } from '@material-ui/core';
import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import { Link } from "react-router-dom";
import { Animator } from "helpers";
import { HeaderContext } from 'contexts';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const Home = () => {
  const desktop = useMediaQuery('(min-width:1024px)');
  const { setDisplayBackButton } = useContext(HeaderContext);
  const [transationDone, setTransationDone] = useState(false);
  const [displayStartButton, setDisplayStartButton] = useState(false);
  const [videoLink] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/memories-prod/video/video/original/Video_elPleecMCJAY.mp4");
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
    if (videoPlayer)
      videoPlayer.onended = function () {
        setDisplayStartButton(true);
      };
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
        <div className="content hero-title">
          <h2>MEMORIES THAT MAKE US</h2>
          <h3>Storying Italian Migration after the end of the Second World War.</h3>
        </div>
        <Fab color="primary" variant="extended" aria-label="start" style={{
          position: "absolute",
          left: desktop ? "50%" : "70%", bottom: "10%",
          opacity: displayStartButton ? 1 : 0,
          transition:"0.3s"
        }}>
          <Link to="start" style={{ color: "white", margin: "0 auto" }}>
            <span>Start <PlayArrowOutlined /></span>
          </Link>
        </Fab>
      </div>
    </section>
  </>);
};
