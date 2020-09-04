/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginContext } from 'contexts';
import { Documentary, Home, FourOFour, VideoStories, Archive } from 'views';
import { Layout } from '../layout';
import { LoadingScreen } from 'components';

export const AppRoutes = (props) => {
  const { loginStatus } = useContext(LoginContext);
  if (loginStatus === undefined) return <LoadingScreen />;
  return (
    <Switch>
      <Route exact path='/' render={() => <Layout><Home {...props} /></Layout>} />
      <Route exact path='/documentary' render={() => <Layout><Documentary {...props} /></Layout>} />
      <Route exact path='/videostories' render={() => <Layout><VideoStories {...props} /></Layout>} />
      <Route exact path='/archive' render={() => <Layout><Archive {...props} /></Layout>} />


      <Route render={() => <Layout><FourOFour  {...props} /></Layout>} />
    </Switch >
  );
};

/**
 * Changelog 26/09/2019 - Sanchit Dang
 * - use loginStatus variable instead of stateVariable
 * - <Layout/> has to be used alongside every inner view
 * - removed use of trigger404 function
 */
