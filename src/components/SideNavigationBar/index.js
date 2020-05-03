import React from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import "../SideNavigationBar/sideBar.css"

const SideNavigationBar = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <SideNavigationAuth /> : <SideNavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>
  );

  const SideNavigationAuth = () => (
    <Menu vertical fixed='left' className='side-nav'>
        <Link to={ROUTES.DISCOVER}>
          <Menu.Item
            name='Discover'
          />
        </Link>
        <Link to={ROUTES.COOKBOOK}>
          <Menu.Item
           name='Cookbooks'
          />
        </Link>
        <Link to={ROUTES.RECIPE}>
          <Menu.Item
            name='Recipes'
          />
        </Link>
        <Link to={ROUTES.GROCERY_LIST}>
          <Menu.Item
           name='Grocery List'
          />
        </Link>
        <Link to={ROUTES.ACCOUNT}>
          <Menu.Item
            name='My Account'
          />
        </Link>
    </Menu>
  );

  const SideNavigationNonAuth = () => (
<div/>
  );


export default SideNavigationBar;