import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { NewSurvivor, Location } from './components';
import { MainLayout } from './layouts/';
import RouteWithLayout from './route-with-layout';
import Account from './components/resistance/account/account';

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

      <RouteWithLayout
        component={Account}
        layout={MainLayout}
        exact
        path="/account"
      />
    </Switch>
  );
};

export default Routes;
