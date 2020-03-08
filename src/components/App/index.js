import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SideNavigationBar from '../SideNavigationBar';
import LandingPage from '../Landing';
import HomePage from '../Home';
import AccountPage from '../Account';
import RecipePage from '../Recipe';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
  <Router>
    <div>
      <Navigation />

      <SideNavigationBar />

      <Route exact path={ROUTES.LANDING} component={LandingPage} />

      <Route path={ROUTES.DISCOVER} component={HomePage} />
      <Route path={ROUTES.RECIPE} component={RecipePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />

    </div>
  </Router>
);

export default withAuthentication(App);