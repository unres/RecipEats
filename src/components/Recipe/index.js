import React from 'react';
import RecipeCreate from './recipeCreate.js';
import RecipeRead from './recipeRead.js';
import { withFirebase } from '../Firebase';

import './recipe.css';

class Recipe extends React.Component{

  constructor(props) {
    super(props);

    this.state = { authUser: null, };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser})
          : this.setState({ authUser: null });
      },
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    if(this.state.authUser === null){
      return (
        <div className='recipe'>
          LOADING
        </div>
      )
    }
    else{
    return (
      <div className='recipe'>
        <RecipeCreate uid={ this.state.authUser.uid } />
        <RecipeRead uid={ this.state.authUser.uid } email={ this.state.authUser.email } />
      </div>
    )
  }
  }
}

export default withFirebase(Recipe);