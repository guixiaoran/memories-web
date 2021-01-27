import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { AnimatedObject } from "helpers/index";
import { HeaderContext } from "contexts";
import * as navigatorBG from "assets/img/navigatorBG.png";
import * as archiveBG from "assets/img/archives.jpg";
import * as memoryWalksBG from "assets/img/memoryWalks.png";
import * as plazaBG from "assets/img/plaza.png";
import * as videoStoriesBG from "assets/img/videoStories.png";
import * as documentaryBG from "assets/img/documentary.png";
import * as outTeamBG from "assets/img/ourTeam.jpg";
import * as projectStoryBG from "assets/img/projectStory.jpg";

const useImage = false;

const useStyles = makeStyles(() => ({
  first: {
    borderRadius: '10px 0 0 0',
  },
  last: {
    borderRadius: '0 0 0 10px',
  },
  sidenav: {
    background: 'black',
    overflow: 'hidden',
    zIndex: 99,
    '& .MuiButton-label': {
      justifyContent: 'left'
    },
    '& a': {
      position: "absolute",
      left: window.innerWidth - 300,
      transition: "0.3s",
      height: "150px",
      width: "300px",
      textDecoration: "none",
      color: 'black',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
    },
    '& a:hover': {
      left: window.innerWidth - 340,
      height: "165px",
      width: "330",
      opacity: 1

    }
  },
  label: {
    float: 'right',
    justifyContent: "right",
    margin: "0 auto",
    paddingRight: '10px',
    paddingTop: '10px',
    color: 'white',
    background: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    textAlign: 'right',
  }
}));

const ButtonWithLink = (props) => {
  const { setDisplayBackButton } = useContext(HeaderContext);
  const classes = useStyles();

  let button = (
    <Link to={props.to} className={props.index === 0 ? classes.first : (props.index === props.size - 1 ? classes.last : '')
    } onClick={() => {
      setDisplayBackButton(true);
    }} style={{
      backgroundImage: `url(${props.image})`,
      backgroungSize: 'cover',
      top: ((window.innerHeight / 3) - (window.innerHeight / 4)) + props.index * 100,
    }} >
      <span style={props.index === 0 ? { borderRadius: '10px 0 0 0' } : props.index === props.size - 1 ? { borderRadius: '0 0 0 10px' } : {}} className={classes.label}>
        <Typography variant='h4'>{props.children}</Typography>
      </span>
    </Link>
  );
  return button;
};

const SideNav = () => {
  const classes = useStyles();
  const [buttons] = useState([
    {
      title: "Documentary",
      image: documentaryBG,
      to: "documentary"
    },
    {
      title: "Video Stories",
      image: videoStoriesBG,
      to: "videostories"
    },
    {
      title: "Memory Walks",
      image: memoryWalksBG,
      to: "memorywalks"
    },
    {
      title: "Archive",
      image: archiveBG,
      to: "archive"
    },
    {
      title: "Piazza",
      image: plazaBG,
      to: "plaza"
    },
    {
      title: "Team",
      image: outTeamBG,
      to: "team"
    },
    {
      title: "Story",
      image: projectStoryBG,
      to: "story"
    }
  ]);
  return (
    <div id="navigationSidebar" className={classes.sidenav}>
      {
        buttons.map((button, i) => <ButtonWithLink
          key={`button_${i}`}
          image={button.image} index={i}
          to={button.to}
          size={buttons.length}>
          {button.title}
        </ButtonWithLink>)
      }
    </div>
  );
};

export const Navigator = () => {
  const [videoLink2] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/memories/video/video/original/Video_GWOtNfZx1jV4.mp4");
  const [videoLink] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/memories/video/video/original/Video_9nGaapDWtdoj.mp4");
  const { setDisplayBackButton, navigatorVideoPlayedOnce, setNavigatorVideoPlayedOnce } = useContext(HeaderContext);
  useEffect(() => {
    setDisplayBackButton(false);
    document.getElementById('animationContainer').style = {
      transform: "none",
      opacity: 1,
      position: "unset"
    };
    return () => {
      setNavigatorVideoPlayedOnce(true);
    };
  }, [setDisplayBackButton, setNavigatorVideoPlayedOnce]);
  let router = (
    <AnimatedObject initial="fade" >
      <div style={{
        position: "relative",
        backgroundImage: useImage ? `url(${navigatorBG})` : '',
        backgroundSize: 'cover'
      }} >
        <section className="primary">
          <div className="parallax hero" style={{
            overflow: "hidden"
          }}>
            <video playsInline loop={navigatorVideoPlayedOnce} id="homeVideo" autoPlay style={{
              height: 'auto',
              minHeight: window.innerHeight + 110,
              maxWidth: window.innerWidth,
              objectFit: "cover"
            }}>
              <source src={navigatorVideoPlayedOnce ? videoLink : videoLink2} type="video/mp4" />
            Your browser does not support HTML5 video.
            </video>
            <SideNav />
          </div>
        </section>
      </div>
    </AnimatedObject>
  );
  return router;
};
