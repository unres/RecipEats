import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

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
      <Grid.Row>
        <Grid.Column>
          <SideNavigationBar />
        </Grid.Column>
        <Grid.Column>
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.DISCOVER} component={HomePage} />
          <Route path={ROUTES.RECIPE} component={RecipePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
       </Grid.Column>
      </Grid.Row>
    </div>
  </Router>
);

export default withAuthentication(App);