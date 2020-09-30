import React, { useEffect, useState } from 'react';
import { Fab } from '@material-ui/core';
import PlayArrowOutlined from '@material-ui/icons/PlayArrowOutlined';
import { Link } from "react-router-dom";
import { Animator } from "helpers";

import useMediaQuery from '@material-ui/core/useMediaQuery';

export const Home = () => {

  const desktop = useMediaQuery('(min-width:1024px)');

  const [transationDone, setTransationDone] = useState(false);
  useEffect(() => {
    let body = document.querySelector("body");
    body.removeAttribute("class", "body-archive");
    (async () => {
      // await Animator.enter();
      setTransationDone(true);
      await Animator.init(true);

    })();
    return () => {
      document.querySelector("body").removeAttribute("class");
      Animator.destroy();
    };
  }, []);
  if (transationDone === false) return "";
  return (<>
    <section className="primary">
      <div className="parallax hero" style={{
        overflow: "hidden"
      }}>
        <video loop playsInline id="homeVideo" muted autoPlay style={{
          height: 'auto',
          minHeight: window.innerHeight + 110,
          maxWidth: '100%',
          objectFit: "cover"
        }}>
          <source src="https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/video/video/original/Video_DdF4JPKxC1rZ.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>
        <div className="content hero-title">
          <h2>MEMORIES THAT MAKE US</h2>
          <h3>Storying Italian Migration after the end of the Second World War.</h3>
        </div>
      </div>
    </section>
    <section className="landing-desc" style={{ position: "relative" }}>
      <div className="text-desc" parallax1={"parallax1"}>
        <h3 className="text-split">Memories That Make Us is a project created with the collaboration of Co.As.It., Deakin University and Deakin Launchpad</h3>
      </div>
      <Fab color="primary" variant="extended" aria-label="start" style={{ position: "absolute", left: desktop ? "90%" : "70%", bottom: "10%" }}>
        <Link to="start" style={{ color: "white", margin: "0 auto" }}>
          <span>Start <PlayArrowOutlined /></span>
        </Link>
      </Fab>
    </section>
  </>);
};
