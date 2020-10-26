import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { AnimatedObject } from "helpers/index";
import { HeaderContext } from "contexts";
import * as navigatorBG from "assets/img/navigatorBG.png";
import * as archiveBG from "assets/img/archives.jpg";
import * as memoryWalksBG from "assets/img/memoryWalks.png";
import * as plazaBG from "assets/img/plaza.png";
import * as videoStoriesBG from "assets/img/videoStories.png";
import * as documentaryBG from "assets/img/documentary.png";

const useStyles = makeStyles(() => ({
  first: {
    borderRadius: '10px 0 0 0',
  },
  last: {
    borderRadius: '0 0 0 10px',
  },
  sidenav: {
    zIndex: 99,
    '& .MuiButton-label': {
      justifyContent: 'left'
    },
    '& a': {
      position: "absolute",
      left: window.innerWidth - 200,
      transition: "0.3s",
      padding: "15px",
      height: "100px",
      width: "220px",
      textDecoration: "none",
      color: 'black',
      opacity: 0.5,
      backgroundSize: 'auto',
      backgroundPosition: 'center'
    },
    '& a:hover': {
      left: window.innerWidth - 220,
      opacity: 1

    },
    label: {

    }
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
      top: ((window.innerHeight / 2) - (window.innerHeight / 3)) + props.index * 100,
    }} >
      <span style={{
        float: 'right',
        justifyContent: "right",
        margin: "0 auto",
        paddingRight: '10px',
        color: 'white'
      }}>
        {props.children}
      </span>
    </Link >
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
      title: "Plaza",
      image: plazaBG,
      to: "plaza"
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
  const [videoLink] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/memories-prod/video/video/original/Video_zcgoScQXxDV0.mp4");
  const { setDisplayBackButton } = useContext(HeaderContext);
  useEffect(() => {
    setDisplayBackButton(false);
    document.getElementById('animationContainer').style = {
      transform: "none",
      opacity: 1,
      position: "unset"
    };
  }, [setDisplayBackButton]);
  let router = (
    <AnimatedObject initial="fade" >
      <div style={{
        position: "relative",
        backgroundImage: `url(${navigatorBG})`,
        backgroundSize: 'cover'
      }} >
        <section className="primary">
          <div className="parallax hero" style={{
            overflow: "hidden"
          }}>
            {/* <video playsInline loop id="homeVideo" muted autoPlay style={{
              height: 'auto',
              minHeight: window.innerHeight + 110,
              maxWidth: window.innerWidth,
              objectFit: "cover"
            }}>
              <source src={videoLink} type="video/mp4" />
          Your browser does not support HTML5 video.
            </video> */}
            <SideNav />
          </div>
        </section>
      </div>
    </AnimatedObject>
  );
  return router;
};
