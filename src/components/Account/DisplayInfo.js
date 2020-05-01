import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { withFirebase } from '../Firebase';

class DisplayInfo extends React.Component{

    constructor(props) {
        super(props);
        this.state={userInfo:[]}
      }


componentDidMount() {
    this.props.firebase.user(this.props.authUser.uid).on('value', snapshot => {
        const userObject=snapshot.val();
        this.setState({userInfo: userObject});
    })
    
  }

render(){

    return(
    <div>
      <h1>Account Page</h1>
      <h3>{this.state.userInfo.email}</h3>
      <h4>{this.state.userInfo.fName + " " + this.state.userInfo.lName}</h4>
      <h2>Change Password</h2>
      <PasswordChangeForm />
    </div>
    )}

}


export default withFirebase(DisplayInfo);