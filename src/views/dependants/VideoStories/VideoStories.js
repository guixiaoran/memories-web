import React, { useEffect, useState } from 'react';
import { Animator } from "helpers";
import { API } from 'helpers/index';


const VideoStory = (props) => {
    return (
        <section className="slide">
            <div className="hero-img">
                <video id={Math.random()} muted controls className="video-js vjs-default-skin">   {
                    props.videos.map((video) => <source src={video.link} size={`${video.width} p`} />)
                }  </video>
            </div>
        </section >
    );
}

export const VideoStories = () => {
    const [videoStories, setVideoStories] = useState([]);
    useEffect(() => {
        API.getVideoStories((data) => {
            setVideoStories(data);
        });
        Animator.init();
        return Animator.destroy();
    }, []);
    return <div className="main-videostories">
        {videoStories.map((video) => {
            return <section className="slide">
                <div className="hero-img">
                    <VideoStory videos={video.videos} />
                    <div className="reveal-img"></div>
                </div >
                <div className="hero-desc">
                    <div className="title">
                        <h2>${video.title}</h2>
                        <div className="title-swipe t-swipe1"></div>
                    </div>
                    <p> ${video.description} </p>
                    <div className="reveal-text"></div>
                </div>
            </section>
        })}
    </div>;
}