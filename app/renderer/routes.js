import React from 'react';
import { Switch, Route } from 'react-router';

import LoginPage from './containers/LoginPage';
import LoggedInPage from './containers/LoggedInPage';
import HomePage from "./containers/HomePage";

export default (
  <Switch>
    <Route exact path="/" component={HomePage} />
  </Switch>
);
