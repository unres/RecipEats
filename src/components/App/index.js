import React from 'react';
import { 
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import RecipePage from '../Recipe';
import CookbookPage from '../Cookbook';

import * as ROUTES from '../../constants/routes';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.RECIPE} component={RecipePage} />
      <Route path={ROUTES.COOKBOOK} component={CookbookPage} />
    </div>
  </Router>
);
export default App;