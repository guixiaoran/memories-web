import React, { useEffect, useState, useCallback } from 'react';
import { makeStyles, GridList, GridListTile, GridListTileBar, Typography } from "@material-ui/core"
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { API, ArchiveAnimations, Animator } from 'helpers/index';
import moment from "moment";
import { LoadingScreen, Zoom, Image, MediaPlayer } from 'components/index';

const galaryStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        width: 500,
        height: 450,
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        "@media screen and (max-width: 1024px)": {
            '& .plyr--video': {
                height: "170px !important",
                width: "50vw"
            },
            '& .plyr': {
                height: '170px !important',
                width: "50vw"
            },
            '& .plyr--audio': {
                transform: "translate(0px, 70px)"
            },
            '& audio': {
                width: "80%"
            },
        }
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}));




const MobileGallery = (props) => {
    const classes = galaryStyles();
    const [tileData, setTileData] = useState();
    useEffect(() => {
        if (props.items) {
            setTileData(props.items);
        }
    }, [props.items]);

    const renderItem = (item) => {
        switch (item.type) {
            case "audio": return (
                <GridListTile key={item.url} cols={1} rows={1} style={{
                    minHeight: "200px", background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                }}>
                    <MediaPlayer url={item.url} type="audio" id={Math.random()} title={item.title} />
                </GridListTile>
            );
            case "video": return (
                <GridListTile key={item.url} cols={1} rows={1} style={{
                    height: "200px", background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                }}>
                    <Typography style={{ height: "30px", color: "white", paddingLeft: "10px" }}>{item.title}</Typography>
                    <MediaPlayer url={item.url} type="video" id={Math.random()} title={item.title} />
                </GridListTile >
            );
            default: return (
                <GridListTile key={item.url} cols={1} rows={1} style={{
                    minHeight: "200px", background:
                        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
                }}>
                    <Zoom>
                        <GridListTileBar
                            title={item.title}
                            titlePosition="top"
                            actionPosition="left"
                            className={classes.titleBar}
                        />
                        <Image src={item.url} alt={item.title} />
                    </Zoom>
                </GridListTile>
            );
        }
    }

    if (tileData === undefined) return <LoadingScreen />
    return <div className={classes.root}>
        <GridList cellHeight={200} spacing={0} className={classes.gridList}>
            {tileData.map((tile) => (
                renderItem(tile)
            ))}
        </GridList>
    </div >
}

let currentYear = 0;

export const Archive = () => {
    const [archives, setArchives] = useState();
    const [filteredArchives, setFilteredArchives] = useState();
    const desktop = useMediaQuery('(min-width:1024px)');

    useEffect(() => {
        Animator.init();
        let data = [];
        if (desktop) document.querySelector("body").setAttribute("class", "body-archive");
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
            if (desktop) document.querySelector("body").removeAttribute("class");
            Animator.destroy();
        }

    }, [desktop]);

    useEffect(() => {
        let destroy;
        if (filteredArchives !== undefined) {
            if (desktop)
                (async () => {
                    try {
                        ArchiveAnimations.animate();
                        destroy = await ArchiveAnimations.performFilteration(destroy, filteredArchives, (currentIndex) => {
                            if (filteredArchives[currentIndex]?.date !== undefined && currentYear !== filteredArchives[currentIndex]?.date) {
                                currentYear = filteredArchives[currentIndex].date;
                                console.log(currentYear);
                            }
                        });
                        Animator.detailAnimation();
                        ArchiveAnimations.addEventHandlers();
                    } catch (e) {
                        console.log(e);
                    }
                })()
        } return () => {
            if (destroy instanceof Function)
                if (desktop) destroy();
        }
    }, [filteredArchives, desktop]);

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
        <div className="main-archive" style={desktop ? null : { paddingTop: "20vh" }}>
            {
                desktop ? <div id="container" /> : <MobileGallery items={filteredArchives} />
            }
        </div>
        {desktop && <div class="layer-super"></div>}
        <div className="open-tile">
            <div className="button-media">
                <button className="close-media-button">X</button>
            </div>
            <div className="media-container">
                <div className="media-content">
                    <div className="media-title">
                        <h1>TITLE</h1>
                    </div>
                    <div className="sub-card">
                        <div className="media-file" />
                    </div>
                </div>
                <div className="media-description-container">
                    <div className="media-date">12/03/2019</div>
                    <div className="media-origin">Ladispoli</div>
                </div>
            </div>
        </div>
        <div className="menu-container">
            <div id="menu">
                <button id="all" onClick={() => { filterArchives() }}>ALL</button>
                <button id="images" onClick={() => { filterArchives("image") }}>IMAGES</button>
                <button id="audeo" onClick={() => { filterArchives("audio") }}>AUDIO</button>
                <button id="video" onClick={() => { filterArchives("video") }}>VIDEO</button>
            </div>
        </div>
    </>;
}