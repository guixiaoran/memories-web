import React, { useState, useEffect } from 'react';
import { LoadingScreen, Image } from 'components/index';
import { Container, Grid, CardContent, Typography, useMediaQuery, Card, CardHeader } from '@material-ui/core';
import { API, TextHelper } from 'helpers';

const StoryCard = (props) => {
  let content = (
    <Card style={{ height: '100%', borderRadius: '0' }} >
      <CardHeader title={TextHelper.titleCase(props.story.title)} />
      <CardContent style={{ margin: '0 auto' }}>

        <Image src={props.story.thumb} />
      </CardContent>
    </Card>
  );
  return content;
};

const Story = (props) => {
  let content = (
    <Card style={{
      height: '100%', borderRadius: '0',
      background: "rgba(255,255,255,0.5)"
    }}>
      <CardContent>
        <CardHeader title={TextHelper.titleCase(props.story.title)} />
        <div style={{ padding: '10px' }} dangerouslySetInnerHTML={{ __html: props.story.story }} />
      </CardContent>
    </Card>
  );
  return content;
};

export const Stories = () => {
  const [stories, setStories] = useState();
  const [videoLink] = useState("https://s3.au-syd.cloud-object-storage.appdomain.cloud/memories/video/video/original/Video_OfSmDJNpZSnZ.mp4");

  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  useEffect(() => {
    API.getProjectStory((response) => {
      console.log(response);
      setStories(response);
    });
  }, []);

  if (stories === undefined) return <LoadingScreen />;

  let content = (
    <div>
      <video loop playsInline id="homeVideo" muted autoPlay style={{
        height: 'auto',
        minHeight: '100vh',
        maxWidth: '100vw',
        objectFit: "cover",
        position: 'fixed',
        top: 0,
        left: 0
      }}>
        <source src={videoLink} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <Container style={{
        position: 'relative',
        marginTop: isItDesktop ? '7%' : '20%', marginBottom: isItDesktop ? '10%' : '20%'
      }}>
        <Grid container spacing={0}>
          <Grid item xs={12} style={{ marginBottom: '20px' }}>
            <Typography variant='h4' style={{ color: 'white' }}>
              The stories of the project
            </Typography>
          </Grid>
          {
            stories.map((story, i) => {
              if (i % 2 === 0) {
                return <>
                  <Grid item xs={12} sm={6} key={`story_${i}`}>
                    <Story story={story} />
                  </Grid>
                  <Grid item xs={12} sm={6} key={`story_${i}`}>
                    <StoryCard story={story} />
                  </Grid>
                </>;
              }
              return <>
                <Grid item xs={12} sm={6} key={`story_${i}`}>
                  <StoryCard story={story} />
                </Grid>
                <Grid item xs={12} sm={6} key={`story_${i}`}>
                  <Story story={story} />
                </Grid>
              </>;
            })
          }
        </Grid>
      </Container>
    </div >
  );

  return content;
};