import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button, Grid } from '@material-ui/core';
import { AnimatedObject } from "helpers/index";

const ButtonWithLink = (props) => {
  let button = (
    <Grid item xs={12}>
      <Button fullWidth variant="contained" component={Link} to={props.to}>
        {props.children}
      </Button>
    </Grid>
  );
  return button;
};

export const Navigator = () => {
  useEffect(() => {
  }, []);
  let router = (
    <AnimatedObject initial="fade">
      <Grid container spacing={1} style={{ paddingTop: "10vh", width: "100vw" }}>
        <ButtonWithLink to="documentary">
          Documentary
        </ButtonWithLink>
        <ButtonWithLink to="videostories">
          Video Stories
        </ButtonWithLink>
        <ButtonWithLink to="memorywalks">
          Memory Walks
        </ButtonWithLink>
        <ButtonWithLink to="archive">
          archive
        </ButtonWithLink>
        <ButtonWithLink to="plaza">
          Plaza
        </ButtonWithLink>
      </Grid>
    </AnimatedObject>
  );
  return router;
};
