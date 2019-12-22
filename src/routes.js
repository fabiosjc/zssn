import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout, NewSurvivor } from './components';
import { MainLayout } from './layouts/';

const Routes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/add-for-resistence" />

      <RouteWithLayout
        component={NewSurvivor}
        layout={MainLayout}
        exact
        path="/add-for-resistence"
      />
    </Switch>
  );
};

export default Routes;
