import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class CookbookUpdate extends React.Component{
    constructor(props) {
      super(props);
      this.state = { ...this.props.cookbook};
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
        return this.props.firebase.cookbook(this.props.cookbook.cid)
          .set({
            ...this.state
          })
          .then(() => {
            this.setState({ ...this.props.cookbook });
            this.props.history.push(ROUTES.COOKBOOK);
          })
          .catch(error => {
            this.setState({ error });
          });
      };
    
  
    render() {
      return(
        <div>
          <Modal closeIcon trigger={<Button color="yellow">Update Cookbook</Button>}>
            <Modal.Header>Edit Cookbook</Modal.Header>
            <Modal.Content>
              <Form onSubmit={this.onSubmit}>
                <Form.Input name='title' label='Title' placeholder='Title' onChange={this.onChange} defaultValue={this.state.title}></Form.Input>
                <Form.Input name='description' label='Description' placeholder='Description' onChange={this.onChange} defaultValue={this.state.description}></Form.Input>
                <Form.Radio name='public' label='Allow Public Access' onChange={this.toggleOnChange} toggle/>
                <Button type='submit' color='green'>Submit</Button>
              </Form>
            </Modal.Content>
          </Modal>
        </div>
      );
    }
  }

  
  export default withFirebase(CookbookUpdate);