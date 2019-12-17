import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import NewSurvivor from './components/new-survivor';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/add-for-resistence" />

      <Route exact path="/add-for-resistence" component={NewSurvivor} />
    </Switch>
  );
};

export default Routes;
