import React from 'react';
import { Button, ModalHeader, Modal, ModalDescription, Form } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import '../Cookbook/cookbook.css'

var CID = "01";
const min = 1000;

// Initial state for new cookbooks
const INITIAL_STATE = {
  title: '',
  description: '',
  // Default public access to false
  public: false,
  recipes: []
}

class CookbookCreate extends React.Component{
  constructor(props) {
    super(props);
    // Assigns initial state to state variable for form to change and submit
    // Affected by setState method
    this.state = { ...INITIAL_STATE, userID: this.props.uid };
    this.writeToDB = this.writeToDB.bind(this);
  }

  writeToDB() {
    return this.props.firebase.cookbook(CID)
      .set({
        ...this.state
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.COOKBOOK);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  // Function for form changes to change the values of the object's state in real time
  // event.target.name must be the same name as the variable in the state
  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  }

  // Handles state change for "Allow Public Access" radio button
  toggleOnChange = event => {
    if (this.state.public === false) {
      this.setState({public: true});
    }
    else {
      this.setState({public: false})
    }
  }

  onSubmit = event => {
    generateCID();
    this.writeToDB();
  }

  render() {
    return(
      <div className='cookbook'>
        <Modal closeIcon trigger={<Button size='massive'>Add New Cookbook</Button>}>
          <ModalHeader>Create a Cookbook</ModalHeader>
          <ModalDescription>
            <Form onSubmit={this.onSubmit}>
              <Form.Input name='title' label='Title' placeholder='Title' onChange={this.onChange}></Form.Input>
              <Form.Input name='description' label='Description' placeholder='Description' onChange={this.onChange}></Form.Input>
              <Form.Radio name='public' label='Allow Public Access' onChange={this.toggleOnChange} toggle/>
              <Button type='submit'>Submit</Button>
            </Form>
          </ModalDescription>
        </Modal>
      </div>
    );
  }
}

const generateCID = () => {
  CID = Date.now() + String( Math.floor(Math.random() * min));
}

export default withFirebase(CookbookCreate);