import React from 'react';
import PropTypes from 'prop-types';
import { LoginContext, LoginProvider } from './common/LoginContext';
import { LayoutContext, LayoutProvider } from './common/LayoutContext';
import { AnimationContext, AnimationProvider } from './dependants/AnimationContext';

export {
  LoginContext,
  LoginProvider,
  LayoutContext,
  LayoutProvider,
  AnimationContext,
  AnimationProvider
};

export const ContextManager = (props) => {
  const { children } = props;
  return (
    <LayoutProvider>
      <LoginProvider>
        <AnimationProvider>
          {children}
        </AnimationProvider>
      </LoginProvider>
    </LayoutProvider>
  );

};

ContextManager.propTypes = {
  children: PropTypes.node
};
