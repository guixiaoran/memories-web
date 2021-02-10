import React, { useState, useEffect } from 'react';
import { LoadingScreen } from 'components/index';
import { Container, Grid, Typography, useMediaQuery, Card, CardHeader, CardMedia } from '@material-ui/core';
import { API, TextHelper } from 'helpers';
import { Link } from 'react-router-dom';


const StoryCard = (props) => {

  let content = (
    <Link to={`/story/${props.story._id}`}>
      <Card >
        <CardHeader title={TextHelper.titleCase(props.story.title)} />
        <CardMedia component="img" src={props.story.thumb} />
      </Card>
    </Link>
  );
  return content;
};

export const Stories = () => {
  const [stories, setStories] = useState();
  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  useEffect(() => {
    API.getProjectStory((response) => {
      console.log(response);
      setStories(response);
    });
  }, []);

  if (stories === undefined) return <LoadingScreen />;

  let content = (
    <Container style={{ marginTop: isItDesktop ? '7%' : '20%', marginBottom: isItDesktop ? '10%' : '20%' }}>
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ marginBottom: '20px' }}>
          <Typography variant='h4' style={{ color: 'white' }}>
            The stories of the project
          </Typography>
        </Grid>
        {
          stories.map((story, i) => <Grid item xs={12} sm={4} key={`story_${i}`}>
            <StoryCard story={story} />
          </Grid>)
        }
      </Grid>
    </Container>
  );

  return content;
};