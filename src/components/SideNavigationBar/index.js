import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { Menu } from 'semantic-ui-react';

import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';

import "../SideNavigationBar/sideBar.css"
import { act } from '@testing-library/react';

var activeitem = 'Discover';

const SideNavigationBar = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <SideNavigationAuth /> : <SideNavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>
  );

  const SideNavigationAuth = () => {
    const [activeitem, setItem] = useState('Discover')

    const handleClick = (event, {name}) => setItem(name);
    return(
    <Menu style={ {background: "white"}} vertical tabular fixed='left' className='side-nav'>
        <Link to={ROUTES.DISCOVER}>
          <Menu.Item
            name='Discover'
            active={activeitem === 'Discover'}
            onClick={handleClick}
          />
        </Link>
        <Link to={ROUTES.COOKBOOK}>
          <Menu.Item
           name='Cookbooks'
           active={activeitem === 'Cookbooks'}
           onClick={handleClick}
          />
        </Link>
        <Link to={ROUTES.RECIPE}>
          <Menu.Item
            name='Recipes'
            active={activeitem === 'Recipes'}
            onClick={handleClick}
          />
        </Link>
        <Link to={ROUTES.GROCERY_LIST}>
          <Menu.Item
           name='Grocery List'
           active={activeitem === 'Grocery List'}
           onClick={handleClick}
          />
        </Link>
        <Link to={ROUTES.ACCOUNT}>
          <Menu.Item
            name='My Account'
            active={activeitem === 'My Account'}
            onClick={handleClick}
          />
        </Link>
    </Menu>
    );
    };

  const SideNavigationNonAuth = () => (
<div/>
  );

export default SideNavigationBar;