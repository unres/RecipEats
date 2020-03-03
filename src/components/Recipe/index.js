import React from 'react';
import { Button, Modal, Image, Checkbox, Form } from 'semantic-ui-react';

const INITIAL_STATE = {
  title: '',
  description: '',
  portionSize: 1,
  ingredients: [''],
  instructions: [''],
  public: false,
  userID: 1,
  collaborators: [1]
}

class Recipe extends React.Component{
  render() {
    return (
      <Modal trigger={<Button>Create a Recipe</Button>}>
        <Modal.Header>Create a Recipe</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png' />
          <Modal.Description>
            <Form>
              <Form.Field>
                <label>Title</label>
                <input placeholder='Title' />
              </Form.Field>
              <Form.Field>
                <label>Description</label>
                <input placeholder='Description' />
              </Form.Field>
              <Form.Field>
                <label>Portion Size</label>
                <input placeholder='Portion Size' />
              </Form.Field>
              <Form.TextArea label='Ingredients' placeholder='Ingredients' />
              <Form.TextArea label='Instructions' placeholder='Instructions' />
              <Form.Field>
                <Checkbox label='Public recipe' />
              </Form.Field>
              <Button type='submit'>Submit</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}

export default Recipe;