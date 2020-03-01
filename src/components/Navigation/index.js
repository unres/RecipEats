import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';

const Navigation = () => (
  <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <Menu>
    <Link to={ROUTES.LANDING}>
    <Menu.Item
      name='Landing'
    />
    </Link>
    <Link to={ROUTES.HOME}>
   <Menu.Item
      name='Home'
     />
     </Link>
     <Link to={ROUTES.ACCOUNT}>
   <Menu.Item
      name='Account'
     />
     </Link>
     <SignOutButton />
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu>
    <Link to={ROUTES.SIGN_IN}>
    <Menu.Item
      name='Sign In'
    />
    </Link>
    <Link to={ROUTES.SIGN_UP}>
    <Menu.Item
      name='Sign Up'
    />
    </Link>
</Menu>
);

export default Navigation;