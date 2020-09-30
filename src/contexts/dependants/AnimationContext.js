import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const AnimationContext = createContext();

export const AnimationProvider = (props) => {
  const [pageVariants, setPageVariants] = useState({
    left: {
      opacity: 1,
      x: "-100vh",
      scale: 1,
    },
    fade: {
      opacity: 0,
      x: 0,
      scale: 1,
    },
    top: {
      opacity: 1,
      y: "-100vw",
      scale: 1,
    },
    bottom: {
      opacity: 1,
      y: "100vw",
      scale: 1,
    },
    right: {
      opacity: 1,
      x: "100vh",
      scale: 1,
    },
    in: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1
    },
    out: {
      opacity: 0,
      x: "100vw",
      scale: 1.2
    }
  });
  const [pageTransition, setPageTransition] = useState({
    type: "tween",
    ease: "anticipate",
    duration: 2
  });
  const [pageStyle, setPageStyle] = useState({ position: "absolute" });
  return <AnimationContext.Provider value={{ pageVariants, setPageVariants, pageTransition, setPageTransition, pageStyle, setPageStyle }}>{props.children}</AnimationContext.Provider>;
};

AnimationProvider.propTypes = {
  children: PropTypes.node
};

