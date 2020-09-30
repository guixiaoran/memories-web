import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { AnimatedObject } from "helpers/index";

const ButtonWithLink = (props) => {
  let button = (
    <Button variant="contained" component={Link} to={props.to}>
      {props.children}
    </Button>
  );
  return button;
};

export const Navigator = () => {
  useEffect(() => {
  }, []);
  let router = (
    <AnimatedObject initial="fade">
      <div style={{ paddingTop: "10vh" }}>
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
      </div>
    </AnimatedObject>
  );
  return router;
};
