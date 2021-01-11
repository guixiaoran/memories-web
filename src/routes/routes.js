/***
 *  Created by Sanchit Dang
 ***/
import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginContext } from 'contexts';
import { Documentary, Home, FourOFour, VideoStories, Archive, MemoryWalks, MemoryWalkDetailed, Navigator, Plaza, Team } from 'views';
import { Layout } from '../layout';
import { LoadingScreen } from 'components';

export const AppRoutes = (props) => {
  const { loginStatus } = useContext(LoginContext);

  if (loginStatus === undefined) return <LoadingScreen />;
  return (
    <Switch>
      <Route exact path='/' render={() => <Layout><Home {...props} /></Layout>} />
      <Route exact path='/start' render={() => <Layout><Navigator {...props} /></Layout>} />
      <Route exact path='/documentary' render={() => <Layout><Documentary {...props} /></Layout>} />
      <Route exact path='/videostories' render={() => <Layout><VideoStories {...props} /></Layout>} />
      <Route exact path='/memorywalks' render={() => <Layout><MemoryWalks {...props} /></Layout>} />
      <Route exact path='/memorywalks/detailed' render={() => <Layout><MemoryWalkDetailed {...props} /></Layout>} />
      <Route exact path='/archive' render={() => <Layout><Archive {...props} /></Layout>} />
      <Route exact path='/plaza' render={() => <Layout><Plaza {...props} /></Layout>} />
      <Route exact path='/team' render={() => <Layout><Team {...props} /></Layout>} />
      <Route render={() => <Layout><FourOFour  {...props} /></Layout>} />
    </Switch >
  );
};
