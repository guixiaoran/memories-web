import React, { useState, useEffect } from 'react';
import { LoadingScreen } from 'components/index';
import { Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
import { API } from 'helpers';
import { withRouter } from 'react-router-dom';

export const ProjectStory = withRouter((props) => {
  const [projectStory, setProjectStory] = useState();
  let isItDesktop = useMediaQuery('(min-width:600px) and (min-height:600px)');
  useEffect(() => {
    API.getProjectStoryUsingId(props.match.params.id, (response) => {
      setProjectStory(response);
    });
  }, [props.match.params.id]);

  if (projectStory === undefined) return <LoadingScreen />;

  let content = (
    <Container style={{ marginTop: isItDesktop ? '7%' : '20%', marginBottom: isItDesktop ? '10%' : '20%' }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3' style={{ color: 'white' }}>
            {projectStory.title}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div style={{ color: 'white', paddingTop: '20px' }} dangerouslySetInnerHTML={{ __html: projectStory.story }} />
        </Grid>
      </Grid>
    </Container>
  );

  return content;
});