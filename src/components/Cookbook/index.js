import React from 'react';
import CookbookCreate from './cookbookCreate.js';
import CookbookRead from './cookbookRead.js'
import { withFirebase } from '../Firebase';
import './cookbook.css';

import { Menu } from 'semantic-ui-react';

class Cookbook extends React.Component{
  constructor(props) {
    super(props);
    this.state = {authUser: null}
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
        ? this.setState({ authUser })
        : this.setState({ authUser:null });
      }
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    if (this.state.authUser === null) {
      return (
        <div className='cookbook'>
          LOADING
        </div>
      )
    }
    else {
      return (
        <div className='cookbook'>
          <Menu><Menu.Item>
          <CookbookCreate uid = { this.state.authUser.uid } />
          </Menu.Item></Menu>
          <CookbookRead uid = { this.state.authUser.uid } />
        </div>
        )
      }
    }
  }

export default withFirebase(Cookbook);