import React, { useEffect } from 'react';
import { Animator } from "helpers";
import { makeStyles } from '@material-ui/core/styles';

import Plyr from 'plyr';
import { AnimatedObject } from 'helpers/index';
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const documentryStyles = makeStyles({
  documentary: {
    width: "100vw",
    borderRadius: "0px",
    '& .plyr': {
      width: "100%",
      borderRadius: 0,
      height: window.innerHeight,
      minHeight: window.innerHeight,
    }
  },
});
export const Documentary = () => {
  const classes = documentryStyles();
  useEffect(() => {
    Animator.init(true);
    const player = new Plyr(document.getElementById('documentryPlayer'), {
      autoplay: true,
      playsinline: true,
      clickToPlay: false,
      controls: ["play", "progress", "mute", "fullscreen", "settings"],
      fullscreen: {
        iosNative: true
      }
    });
    if (!iOS) player.play();
    return () => {
      Animator.destroy();
      if (player !== undefined)
        player.destroy();
    };
  }, []);

  return (
    <AnimatedObject initial="right" exit="out">
      <section className={classes.documentary} >
        <video id="documentryPlayer" style={{
          borderRadius: "0px",
          height: window.innerHeight,
          minHeight: window.innerHeight,
          minWidth: '100%',
          objectFit: "fill",
          width: "100%"
        }}>
          <source
            src="https://memories-s3-bucket.s3.ap-southeast-2.amazonaws.com/video/video/original/Video_aT29DkOTtUb5.mp4"
            type="video/mp4" />
        </video>
      </section>
    </AnimatedObject>
  );
};