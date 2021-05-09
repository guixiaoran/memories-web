import React, { useEffect, useState, useContext } from "react";
import { Link, withRouter } from 'react-router-dom';
import { makeStyles, Typography, useMediaQuery } from '@material-ui/core';
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
import { ConfirmationDailog } from 'components';

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
      height: "90px",
      width: "300px",
      textDecoration: "none",
      color: 'black',
      backgroundSize: 'auto',
      backgroundPosition: 'center',
      cursor: 'pointer'
    },
    '& a:hover': {
      height: "200px",
      width: "330",
      opacity: 1,
    },
    '& .tooltiptext': {
      visibility: 'hidden',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.80)',
      color: 'white',
      textAlign: 'center',
      padding: '5px',
      position: 'absolute',
      zIndex: 105,
    },
    '& a:hover .tooltiptext': {
      visibility: 'visible',
    },
    '& a:hover .makeStyles-label-6': {
      visibility: 'hidden',
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
    visibility: 'visible',
  },
}));

const ButtonWithLink = (props) => {
  const { setDisplayBackButton } = useContext(HeaderContext);
  const classes = useStyles();
  let button = (<>

    <Link to={props.to} className={props.index === 0 ? classes.first : (props.index === props.size - 1 ? classes.last : '')
    } onClick={() => {
      setDisplayBackButton(true);
    }} style={{
      backgroundImage: `url(${props.image})`,
      backgroungSize: 'cover',
      top: ((window.innerHeight / 2.9) - (window.innerHeight / 4)) + props.index * 90,
    }} >
      <span style={props.index === 0 ? {
        borderRadius: '10px 0 0 0',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      } : props.index === props.size - 1 ? {
        borderRadius: '0 0 0 10px',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      } : {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }} className='tooltiptext'>{props.helpText}</span>
      <span style={props.index === 0 ? { borderRadius: '10px 0 0 0' } : props.index === props.size - 1 ? { borderRadius: '0 0 0 10px' } : {}} className={classes.label}>
        <Typography variant='h4'>{props.children}</Typography>
      </span>
    </Link></>
  );
  return button;
};

const ButtonWithoutSafari = withRouter((props) => {
  const { setDisplayBackButton } = useContext(HeaderContext);
  const [isOpen, setIsOpen] = useState(false);
  const classes = useStyles();
  let button = (<>
    <Link className={props.index === 0 ? classes.first : (props.index === props.size - 1 ? classes.last : '')
    } onClick={() => {
      var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
      if (isSafari) {
        alert("Your Browser is not Supported");
      }
      else {
        setIsOpen(true);
      }
    }} style={{
      backgroundImage: `url(${props.image})`,
      backgroungSize: 'cover',
      top: ((window.innerHeight / 2.9) - (window.innerHeight / 4)) + props.index * 90,
    }} >
      <span style={props.index === 0 ? {
        borderRadius: '10px 0 0 0',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      } : props.index === props.size - 1 ? {
        borderRadius: '0 0 0 10px',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      } : {
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center'
      }} className='tooltiptext'>{props.helpText}</span>
      <span style={props.index === 0 ? { borderRadius: '10px 0 0 0' } : props.index === props.size - 1 ? { borderRadius: '0 0 0 10px' } : {}} className={classes.label}>
        <Typography variant='h4'>{props.children}</Typography>
      </span>
    </Link>
    <ConfirmationDailog isOpen={isOpen} title="Piazza" message="Use W,S,A,D to control and space to jump" onSubmit={() => {
      setDisplayBackButton(true);
      props.history.push(props.to);
      setIsOpen(false);
    }} onCancel={() => {
      setIsOpen(false);
    }}
    />
  </>
  );
  return button;
});

const SideNav = () => {
  const classes = useStyles();
  const [buttons] = useState([
    {
      title: "Documentary",
      image: documentaryBG,
      to: "documentary",
      helpText: 'This is a history of post-World War Two Italian migration stories to Victoria from 1945–1960 told by the people who lived it.'
    },
    {
      title: "Video Stories",
      image: videoStoriesBG,
      to: "videostories",
      helpText: 'Short videos of the first-hand accounts and intimate recollections of Italian migrants to Australia post-World War Two.'
    },
    {
      title: "Memory Walks",
      image: memoryWalksBG,
      to: "memorywalks",
      helpText: 'Short memory walks have people returning to either a key location, a space or environment to tell the story of that space as connected to their own migrant biography.'
    },
    {
      title: "Archive",
      image: archiveBG,
      to: "archive",
      helpText: 'A new archive of Italian migrant stories in visual images and photographs.'
    },
    {
      title: "Piazza",
      image: plazaBG,
      to: "plaza",
      helpText: 'Sharing stories through reconnection.',
      disableOnMobile: true,
      disableSafari: true,
    },
    {
      title: "The stories of the project",
      image: projectStoryBG,
      to: "story",
      helpText: 'Stories about Italian migration largely reflect the dual values of hardship and success, but rarely do they capture their affective and temporal entanglement. This project has digitally compiled its findings in documentary film, short video stories, and interactive archives of memories to be shared.'
    },
    {
      title: "Team",
      image: outTeamBG,
      to: "team",
      helpText: 'The team set out to create a reservoir of knowledge and understanding about what it was like to be an Italian migrant in Australia post-World War Two. '
    }
  ]);
  let isItDesktop = useMediaQuery('(min-width:786px) and (min-height:600px)');
  return (
    <div id="navigationSidebar" className={classes.sidenav}>
      {
        buttons.filter((item) => {
          if (isItDesktop) return true;
          else if (item.disableOnMobile !== true) return true;
          else return false;
        }).map((button, i) => button.disableSafari === true ? <ButtonWithoutSafari
          key={`button_${i}`}
          image={button.image} index={i}
          to={button.to}
          helpText={button.helpText}
          size={buttons.length}>
          {button.title}
        </ButtonWithoutSafari> : <ButtonWithLink
          key={`button_${i}`}
          image={button.image} index={i}
          to={button.to}
          helpText={button.helpText}
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
          <div className="content hero-title" style={{
            textAlign: "left",
            paddingRight: "20%",
            bottom: 0,
            background: "linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1))"
          }}>
            <h2 style={{
              fontFamily: "'Dancing Script', cursive",
            }}>Memories that make us</h2>
          </div>
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
