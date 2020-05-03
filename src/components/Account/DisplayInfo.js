import React from 'react';
import PasswordChangeForm from '../PasswordChange';
import { Modal, Button, Menu, Icon } from 'semantic-ui-react';
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
      <Menu>
      <Modal closeIcon trigger={<Menu.Item><Button icon labelPosition='left'><Icon name='lock' />Change Password</Button></Menu.Item>}>
          <Modal.Header>Change Password:</Modal.Header>
          <Modal.Content>
          <PasswordChangeForm />
          </Modal.Content>
      </Modal>
      </Menu>
      <h1>Account Page</h1>
      <h3>Email: {this.state.userInfo.email}</h3>
      <h3>Name: {this.state.userInfo.fName + " " + this.state.userInfo.lName}</h3>
    </div>
    )}

}


export default withFirebase(DisplayInfo);