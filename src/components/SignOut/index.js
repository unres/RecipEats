import React from 'react';
import {Link} from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';
import { Menu } from 'semantic-ui-react';

const SignOutButton = ({ firebase }) => (
  <Menu.Item position="right" as={Link} to={ROUTES.LANDING} onClick={firebase.doSignOut}>
    Sign Out
  </Menu.Item>

);

export default withFirebase(SignOutButton);