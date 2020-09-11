import React, { useEffect, useState } from 'react';
import { Animator } from "helpers";
import moment from "moment";
import TrackVisibility from 'react-on-screen';

import Plyr from 'plyr';
import { Redirect } from 'react-router-dom';

const VideoPlayer = (props) => {
    const [player, setPlayer] = useState();
    useEffect(() => {
        if (props.id)
            if (player === undefined)
                setPlayer(new Plyr(document.getElementById(props.id), {
                    autoplay: false,
                    playsinline: true,
                    clickToPlay: false,
                    controls: ["play", "progress", "mute", "fullscreen", "settings"],
                }));
            else {
                player.source = {
                    type: "video",
                    title: "test",
                    sources: [{
                        src: props.url,
                        type: 'video/mp4',
                    }]
                };
            }
        return () => {
            if (player !== undefined)
                player.destroy();
        }
    }, [props.id, props.url, player]);
    useEffect(() => {
        if (player !== undefined)
            if (props.isVisible === false)
                player.pause()

    }, [props.isVisible, player]);
    return <video id={props.id} className="memory-video-single">
        Your browser does not support the video tag.
        </video >
}

export const MemoryWalkDetailed = (props) => {
    useEffect(() => {
        Animator.init();

        // Animator.memoryAnimation();
        return () => {
            Animator.destroy();
        }
    }, [props]);
    if (props.location.params === undefined) return <Redirect to="/memorywalks" />;
    return (<div style={{ width: "100%" }}>
        <section className={`memory-section`}>
            <div className="memory-container">
                <div className="memory-img" style={{
                    margin: "0 auto"
                }}>
                    <TrackVisibility partialVisibility style={{
                        height: '500px',
                        maxWidth: '70%',
                        margin: "0 auto"
                    }} >
                        {
                            ({ isVisible }) => <VideoPlayer isVisible={isVisible} id="video1" url={props.location.params.memory.url} className="videoPlayer" />
                        }
                    </TrackVisibility>
                </div>
                <div className="text-memory-title">{props.location.params.memory.title}</div>
                <div className="memory-text-container">
                    <div class="memory-text">
                        <p className="text-class-description">
                            {props.location.params.memory.description}
                        </p>
                    </div>
                </div>
                <div className="memory-nr"><span>{moment(props.location.params.memory.date).format("YYYY")}</span></div>
            </div>
        </section>
        <section className={`memory-section memory-${props.location.params.memory.tile} fashion${props.location.params.memory.tile + 1} detail-slide`}>
            <div className="memory-container">
                <div className="memory-img" style={{
                    margin: "0 auto"
                }}>
                    <TrackVisibility partialVisibility style={{
                        height: '500px',
                        maxWidth: '70%',
                        margin: "0 auto"
                    }} >
                        {
                            ({ isVisible }) => <VideoPlayer isVisible={isVisible} id="video2" url={props.location.params.memory.secondUrl} className="videoPlayer" />
                        }
                    </TrackVisibility>
                </div>
                <div className="text-memory-2-title">{props.location.params.memory.secondTitle}</div>
                <div className="memory-text-container">
                    <div className="memory-text">
                        <p className="text-class-description">
                            {props.location.params.memory.secondDescription}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
    );
}