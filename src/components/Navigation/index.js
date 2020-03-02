import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Modal } from 'semantic-ui-react'

import SignOutButton from '../SignOut';
import SignInForm from '../SignIn';
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
  <Menu borderless size='huge'>
    <Menu.Item header>RecipEats</Menu.Item>
     <Modal trigger={ <Menu.Item position='right' name='Sign In' /> }>
        <Modal.Content>
          <SignInForm />
        </Modal.Content>
    </Modal>
</Menu>
);

export default Navigation;