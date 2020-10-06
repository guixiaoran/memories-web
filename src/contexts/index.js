import React from 'react';
import PropTypes from 'prop-types';
import { LoginContext, LoginProvider } from './common/LoginContext';
import { LayoutContext, LayoutProvider } from './common/LayoutContext';
import { AnimationContext, AnimationProvider } from './dependants/AnimationContext';
import { HeaderContext, HeaderContextProvider } from "./dependants/HeaderContext";
export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  AnimationContext,
  AnimationProvider,
  HeaderContext,
  HeaderContextProvider
};

export const ContextManager = (props) => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        <AnimationProvider>
          <HeaderContextProvider >
            {children}
          </HeaderContextProvider>
        </AnimationProvider>
      </LoginProvider>
    </LayoutProvider>
  );

};

ContextManager.propTypes = {
  children: PropTypes.node
};
