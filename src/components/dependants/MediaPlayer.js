import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Plyr from 'plyr';

export const MediaPlayer = (props) => {
  useEffect(() => {
    let player;
    if (props.id) {
      player = new Plyr(document.getElementById(props.id),
        {
          playsinline: true,
          clickToPlay: false,
          controls: props.controls ? props.controls : ["play", "progress", "fullscreen", "settings"],
          fullscreen: {
            iosNative: true
          }
        });
      player.source = {
        type: props.type,
        title: props.title,
        sources: [{
          src: props.url,
        }]
      };
    }
    return () => {
      if (player !== undefined)
        player.destroy();
    };
  }, [props.id, props.url, props.title, props.type, props.controls]);
  if (props.type === 'video')
    return (<video id={props.id} />
    );
  else return <audio style={{ bottom: 0, position: "absolute" }} playsInline id={props.id} />;
};

MediaPlayer.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  controls: PropTypes.arrayOf([PropTypes.string])
};