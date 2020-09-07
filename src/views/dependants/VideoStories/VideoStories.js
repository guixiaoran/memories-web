import React, { useEffect, useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TrackVisibility from 'react-on-screen';

import { Animator } from "helpers";
import { API } from 'helpers/index';
import Plyr from 'plyr';


const VideoStory = (props) => {

    useEffect(() => {
        const player = new Plyr(document.getElementById(props.video._id));
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
        if (player !== undefined) {
            if (!props.isVisible) player.pause();
        }
        return () => {
            player.destroy();
        }
    }, [props]);
    return (
        <section className="slide">
            <div className="hero-img">
                <video id={props.video._id} />
            </div>
        </section >
    );
}

export const VideoStories = () => {
    const [videoStories, setVideoStories] = useState([]);
    const desktop = useMediaQuery('(min-width:1440px)');

    useEffect(() => {
        API.getVideoStories((data) => {
            setVideoStories(data);
        });

        Animator.enter();
        Animator.init();
        Animator.animateSlides({ playVideoAutomatically: true, videoPlayerClassName: "video" });

        return Animator.destroy();
    }, []);
    return <div style={{ width: "100%" }}>
        {videoStories.map((video, index) => {
            return <section style={index === videoStories.length - 1 && !desktop ? {
                paddingBottom: "20vh"
            } : {}} className="slide">
                <div className="hero-img">
                    <TrackVisibility>
                        <VideoStory video={video} />
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
            </section>
        })}
    </div>;
}