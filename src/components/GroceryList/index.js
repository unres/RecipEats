import React from 'react';

import "../GroceryList/grocery.css"
import { withFirebase } from '../Firebase';
import GroceryListFile from './GroceryListFile.js';

class GroceryList extends React.Component{

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


render(){
  console.log(this.state.authUser)
  if(this.state.authUser === null){
    return (
      <div className='recipe'>
        LOADING
      </div>
    )
  }
  else{
    
  return(
  <div className='grocery'>
    <GroceryListFile authUser={this.state.authUser} />
  </div>
  )}
}



}
export default withFirebase(GroceryList);
