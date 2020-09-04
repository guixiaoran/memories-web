import React from 'react';

export const Documentary = () => {
    // useEffect(() => {
    //     Animator.init();
    //     // window.removeEventListener("wheel", rotate, { passive: false })
    //     return Animator.destroy();
    // }, []);
    return (
        <section className="documentary">
            <video data-plyr-config='{ "title": "Example Title" }' id="player"
                className="video-documentary video-js vjs-theme-city" autoplay controls playsinline data-poster>
                <source
                    src="https://s3.au-syd.cloud-object-storage.appdomain.cloud/ipan-v2-bucket/video/video/original/Video_Cyv8Pc2LUqRF.mp4"
                    type="video/mp4" />
            </video>
        </section>
    );
}