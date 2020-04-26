import React from 'react';

import "../Account/account.css"
import { withFirebase } from '../Firebase';
import DisplayInfo from './DisplayInfo.js';

class AccountPage extends React.Component{

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
  <div className='account'>
    <DisplayInfo authUser={this.state.authUser} />
  </div>
  )}
}



}
export default withFirebase(AccountPage);
