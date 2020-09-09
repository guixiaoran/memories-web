import React, { useEffect } from 'react';

import Plyr from 'plyr';

export const MediaPlayer = (props) => {
    useEffect(() => {
        let player;
        if (props.id) {
            player = new Plyr(document.getElementById(props.id),
                {
                    playsinline: true,
                    clickToPlay: false,
                    controls: ["play", "progress", "fullscreen", "settings"],
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
        }
    }, [props.id, props.url, props.title, props.type]);
    if (props.type === 'video')
        return (<video playsInline id={props.id} />
        );
    else return <audio style={{ bottom: 0, position: "absolute" }} playsInline id={props.id} />
}