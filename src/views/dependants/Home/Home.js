import React, { useEffect, useState, useContext } from "react";
import { Fab } from "@material-ui/core";
import PlayArrowOutlined from "@material-ui/icons/PlayArrowOutlined";
import { Link } from "react-router-dom";
import { Animator } from "helpers";
import { HeaderContext } from "contexts";
import * as title from "assets/img/title.png";
import * as logo from "assets/img/deakin-logo.png";

export const Home = () => {
  const displayStartButtonType = "ALWAYS"; //ALWAYS, INTERVAL, AFTER_VIDEO
  const startButtonTIme = 3; // in seconds
  const { setDisplayBackButton } = useContext(HeaderContext);
  const [transationDone, setTransationDone] = useState(false);
  const [displayStartButton, setDisplayStartButton] = useState(false);
  const [videoLink] = useState(
    "https://memories-s3-bucket.s3.ap-southeast-2.amazonaws.com/video/video/original/Video_wl01Qrcyo94b.mp4"
  );
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
      case "AFTER_VIDEO":
        videoPlayer.onended = function () {
          setDisplayStartButton(true);
        };
        break;
      case "INTERVAL":
        setTimeout(() => {
          setDisplayStartButton(true);
        }, startButtonTIme * 1000);
        break;
      default:
        setDisplayStartButton(true);
    }
  }, [transationDone]);
  if (transationDone === false) return "";
  return (
    <>
      <section className="primary">
        <div
          className="parallax hero"
          style={{
            overflow: "hidden",
          }}
        >
          <video
            loop
            playsInline
            id="homeVideo"
            muted
            autoPlay
            style={{
              height: "auto",
              minHeight: window.innerHeight + 110,
              maxWidth: "100%",
              objectFit: "cover",
            }}
          >
            <source src={videoLink} type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
          <div
            className="content hero-title"
            style={{
              height: "100vh",
              textAlign: "center",
              paddingTop: "20%",
              fontFamily: "IBM Plex Sans",
            }}
          >
            <img
              src={title}
              style={{
                width: "100%",
              }}
            />
            {/*<h2>{"Le memorie che ci creano".toUpperCase()}</h2>*/}
            <h3>
              Storying Italian Migration after the end of the Second World War.
            </h3>
            <Fab
              color="primary"
              variant="extended"
              aria-label="start"
              style={{
                opacity: displayStartButton ? 1 : 0,
                display: displayStartButton ? "" : "none",
                transition: "0.3s",
                marginTop: "10px",
                backgroundColor: "#3B0072",
              }}
            >
              <Link
                to="start"
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p>Comincia Qui / Start Here</p>
                <PlayArrowOutlined />
              </Link>
            </Fab>
            <div>
              <img
                src={logo}
                style={{
                  marginTop: "40px",
                  width: "80px",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
