import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
export const HeaderContext = createContext();

export const HeaderContextProvider = (props) => {
  const [displayBackButton, setDisplayBackButton] = useState(false);
  return (<HeaderContext.Provider value={{ displayBackButton, setDisplayBackButton }}>
    {props.children}
  </HeaderContext.Provider>);
};

HeaderContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
