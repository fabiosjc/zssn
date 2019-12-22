import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, NewSurvivor, Location } from './components';
import { MainLayout } from './layouts/';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/add-for-resistance" />

      <RouteWithLayout
        component={NewSurvivor}
        layout={MainLayout}
        exact
        path="/add-for-resistance"
      />

      <RouteWithLayout
        component={Location}
        layout={MainLayout}
        exact
        path="/set-location"
      />
    </Switch>
  );
};

export default Routes;
