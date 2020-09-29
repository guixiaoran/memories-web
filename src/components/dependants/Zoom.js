import React from 'react';
import InternalZoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export const Zoom = ({ children }) => {

  return (
    <InternalZoom overlayBgColorEnd={'rgba(0, 0, 0, .9)'} overlayBgColorStart={'rgba(0, 0, 0, .9)'}>
      {children}
    </InternalZoom>
  );
};