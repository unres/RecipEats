import React from 'react';
import { Menu, Modal } from 'semantic-ui-react'

import SignOutButton from '../SignOut';
import SignInForm from '../SignIn';

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
  <Menu style={ {background: "#aed9e0"}} borderless size='massive'>
    <Menu.Item header>RecipEats</Menu.Item>
    <SignOutButton />
  </Menu>
);

const NavigationNonAuth = () => (
  <Menu style={ {background: "#aed9e0"}} class='test' borderless size='massive'>
    <Menu.Item header>RecipEats</Menu.Item>
     <Modal trigger={ <Menu.Item position='right' name='Sign In' /> }>
        <Modal.Content>
          <SignInForm />
        </Modal.Content>
    </Modal>
</Menu>
);

export default Navigation;