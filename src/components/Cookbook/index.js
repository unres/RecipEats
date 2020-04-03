import React from 'react';
import { Button, ModalHeader, Modal, ModalDescription, Form } from 'semantic-ui-react'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import '../Cookbook/cookbook.css'

const INITIAL_STATE = {
  title: '',
  description: '',
  // Default public access to false
  public: false,
  userID: ''
}

class Cookbook extends React.Component{
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  render() {
    return(
      <div className='addCookBook'>
        <Modal trigger={<Button size='massive'>Add New Cookbook</Button>}>
          <ModalHeader>Create a Cookbook</ModalHeader>
          <ModalDescription>
            <Form onSubmit={console.log(this.state)}>
              <Form.Input name='title' label='Title' placeholder='Title'></Form.Input>
              <Form.Input name='description' label='Description' placeholder='Description'></Form.Input>
              <Form.Radio label='Allow Public Access' toggle/>
              <Button type='submit'>Submit</Button>
            </Form>
          </ModalDescription>
        </Modal>
      </div>
    );
  }
}

export default Cookbook;