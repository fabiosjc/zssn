import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { NewSurvivor, Location } from './components';
import { MainLayout } from './layouts/';
import RouteWithLayout from './route-with-layout';
import Account from './components/resistance/account/account';
import About from './components/about';
import Dashboard from './components/reports';

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

      <RouteWithLayout
        component={Dashboard}
        layout={MainLayout}
        exact
        path="/dashboard"
      />

      <RouteWithLayout
        component={About}
        layout={MainLayout}
        exact
        path="/about"
      />
    </Switch>
  );
};

export default Routes;
