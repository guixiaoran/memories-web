import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TrackVisibility from 'react-on-screen';
import { Animator, AnimatedObject, API, ElementHelper } from "helpers";
import Plyr from 'plyr';
import { Parallax } from 'react-parallax';
import * as plazaBG from "assets/img/plaza.png";
import { MenuItem, FormControl, InputLabel, Select, makeStyles } from '@material-ui/core';

const ParallaxHelper = (props) => {
  if (ElementHelper.isItDesktop()) return <Parallax {...props} >{props.children}</Parallax>;
  return props.children;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    "& .MuiOutlinedInput-input": {
      color: "white"
    },
    "& .MuiInputLabel-root": {
      color: "white"
    },
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white"
    },
    "&:hover .MuiInputLabel-root": {
      color: "white"
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white"
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "white"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white"
    }
  },
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },

  },
  icon: {
    fill: 'white',
  },
}));

const VideoStory = (props) => {
  const [player, setPlayer] = useState();
  useEffect(() => {
    if (player === undefined) setPlayer(new Plyr(document.getElementById(props.video._id),
      {
        playsinline: true,
        clickToPlay: false,
        controls: ["play", "progress", "fullscreen", "settings"],
        fullscreen: {
          iosNative: true
        }
      }));
    else {
      let sources = [];
      props.video.videos.forEach((video) => {
        sources.push({
          src: video.link,
          type: 'video/mp4',
          size: video.width,
        });
      });
      player.source = {
        type: "video",
        title: props.video.title,
        sources,
        poster: props.video.thumbnail
      };

    }
    return () => {
      if (player !== undefined)
        player.destroy();
    };
  }, [props.video, player]);
  useEffect(() => {
    if (player !== undefined)
      if (props.isVisible === false)
        player.pause();

  }, [props.isVisible, player]);
  return (<video id={props.video._id} />);
};

VideoStory.propTypes = {
  video: PropTypes.object,
  isVisible: PropTypes.bool
};

export const VideoStories = () => {
  const classes = useStyles();
  const [videoStories, setVideoStories] = useState([]);
  const desktop = useMediaQuery('(min-width:1024px)');
  const [parallaxBG] = useState(plazaBG);
  const [select, setSelect] = useState('STORIES');
  useEffect(() => {
    API.getVideoStories((data) => {
      setVideoStories(data);
      window.scrollTo(0, 2);
      Animator.init();
    });
    return () => {
      Animator.destroy();
    };
  }, []);
  return <div style={{ width: "100%" }}>
    <AnimatedObject initial="right">
      <ParallaxHelper blur={1}
        bgImage={parallaxBG}
        strength={900}>
        <div style={{ width: '100vw' }}>
          <FormControl variant="outlined" className={classes.formControl} style={{
            color: 'white',
            zIndex: 9999,
            top: '100px',
            position: "fixed",
            right: '7%'
          }} >
            <InputLabel style={{ color: 'white ' }} id="select-label">Type</InputLabel>
            <Select
              labelId="select-label"
              id="select"
              className={classes.select}
              style={{ color: 'white ' }}
              value={select}
              onChange={(e) => {
                setSelect(e.target.value);
              }}
              label="Type"
              inputProps={{
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <MenuItem value={'STORIES'}>Storie / Stories</MenuItem>
              <MenuItem value={'ARIVALS'}>Arrivi /Arrivals</MenuItem>
              <MenuItem value={'STORYTELLER'}>Cantastorie / Story Tellers</MenuItem>
            </Select>
          </FormControl>
          {videoStories.filter(story => story.type.toUpperCase() === select).map((video, index) => {
            return <section key={`videoStory${index}`} style={index === videoStories.length - 1 && !desktop ? {
              paddingBottom: "20vh"
            } : {}} className="slide">
              <div className="hero-img" style={{
                minWidth: (window.screen.width / 10) * 5
              }}>
                <TrackVisibility partialVisibility >
                  {
                    ({ isVisible }) => <VideoStory isVisible={isVisible} video={video} className="videoPlayer" />
                  }
                </TrackVisibility>
                <div className="reveal-img"></div>
              </div >
              <div className="hero-desc">
                <div className="title">
                  <h2>{video.title}</h2>
                  <div className="title-swipe t-swipe1"></div>
                </div>
                <p>{video.description} </p>
                <div className="reveal-text"></div>
              </div>
            </section>;
          })}
        </div>
      </ParallaxHelper>
    </AnimatedObject>
  </div>;
};