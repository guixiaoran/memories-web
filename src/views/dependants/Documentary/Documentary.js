import React, { useEffect } from 'react';
import { Animator } from "helpers";
import { makeStyles } from '@material-ui/core/styles';

import Plyr from 'plyr';
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const documentryStyles = makeStyles({
    documentary: {
        width: "100%",
        borderRadius: "0px",
        '& .plyr': {
            width: "100%",
            borderRadius: 0,
            height: window.innerHeight,
            minHeight: window.innerHeight,
        }
    },
});
export const Documentary = () => {
    const classes = documentryStyles();
    useEffect(() => {
        Animator.init();
        const player = new Plyr(document.getElementById('documentryPlayer'), {
            autoplay: true,
            playsinline: true,
            clickToPlay: false,
            controls: ["play", "progress", "mute", "fullscreen","settings"],
            debug: true,
            loop: { active: true }
        });
        if (!iOS) player.play();
        return () => {
            Animator.destroy();
            if (player !== undefined)
                player.destroy();
        }
    }, []);

    return (
        <section className={classes.documentary} >
            <video playsinline id="documentryPlayer" style={{
                borderRadius: "0px",
                height: window.innerHeight,
                minHeight: window.innerHeight,
                minWidth: '100%',
                objectFit: "fill",
                width: "100%"
            }}>
                <source
                    src="https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/video/video/original/Video_Cyv8Pc2LUqRF.mp4"
                    type="video/mp4" />
            </video>
        </section>
    );
}