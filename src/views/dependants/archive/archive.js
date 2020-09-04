import React, { useEffect, useState, useCallback } from 'react';
import { Animator } from "helpers";
import { API, ArchiveAnimations } from 'helpers/index';
// import { launchArchive } from '../../../helpers/animations/archive_old';
import moment from "moment";

export const Archive = () => {
    const [archives, setArchives] = useState();
    const [filteredArchives, setFilteredArchives] = useState();
    useEffect(() => {
        Animator.init();
        let data = [];
        document.querySelector("body").setAttribute("class", "body-archive");
        (() => {
            API.getArchieves((response) => {
                response.sort((a, b) => moment(a.date).diff(b.date)).forEach(item => {
                    if (item.media.length > 0) {
                        data.push({
                            title: item.title,
                            content: item.content,
                            url: item.media[0].link,
                            type: item.media[0].type,
                            category: item.category,
                            poster: item.media[0].thumbnail,
                            date: moment(item.date).get("year")
                        });
                    }
                });
                setArchives(data);
                setFilteredArchives(data);
            });
        })()
        return () => {
            document.querySelector("body").removeAttribute("class");
            Animator.destroy();
        }

    }, []);

    useEffect(() => {
        let destroy;
        if (filteredArchives !== undefined) {
            (async () => {
                try {
                    await ArchiveAnimations.animate();
                    destroy = await ArchiveAnimations.performFilteration(destroy, filteredArchives);
                    Animator.detailAnimation();
                    ArchiveAnimations.addEventHandlers();
                } catch (e) {
                    console.log(e);
                }
            })()
        } return () => {
            if (destroy instanceof Function)
                destroy();
        }
    }, [filteredArchives]);

    const filterArchives = useCallback((variant) => {
        switch (variant) {
            case 'audio': {
                setFilteredArchives(archives.filter(item => item.type === 'audio'));
                break;
            }
            case 'video': {
                setFilteredArchives(archives.filter(item => item.type === 'video'));
                break;
            }
            case 'image': {
                setFilteredArchives(archives.filter(item => item.type === 'image'));
                break;
            }
            default: setFilteredArchives(archives);
        }

    }, [archives]);


    return <>
        <div className="main-archive">
            <div id="container" />
        </div>
        <div class="layer-super"></div>
        <div class="open-tile">
            <div class="button-media">
                <button class="close-media-button">X</button>
            </div>
            <div class="media-container">
                <div class="media-content">
                    <div class="media-title">
                        <h1>TITLE</h1>
                    </div>
                    <div class="sub-card">
                        <div class="media-file">

                        </div>

                    </div>
                </div>
                <div class="media-description-container">
                    <div class="media-date">12/03/2019</div>
                    <div class="media-origin">Ladispoli</div>
                </div>
            </div>
        </div>
        <div class="menu-container">
            <div id="menu">
                <button id="all" onClick={() => { filterArchives() }}>ALL</button>
                <button id="images" onClick={() => { filterArchives("image") }}>IMAGES</button>
                <button id="audeo" onClick={() => { filterArchives("audio") }}>AUDIO</button>
                <button id="video" onClick={() => { filterArchives("video") }}>VIDEO</button>
            </div>
        </div>
    </>;
}