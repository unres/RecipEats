import React from 'react';
import { Button, Modal, Image, Checkbox, Form } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

class RecipeUpdate extends React.Component{
  constructor(props) {
    super(props);

    this.state = { ...this.props.recipe, showModal:false };
  }

  onSubmit = event => {
    return this.props.firebase.recipe(this.props.recipe.rid)
      .set({
        ...this.state
      })
      .then(() => {
        this.setState({ ...this.props.recipe, showModal:false });
        this.props.history.push(ROUTES.RECIPE);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    const { showModal, showCollaborators } = this.state;
    return (
      <div>
        <Modal trigger={<Button onClick={() => this.setState({ showModal: true })}>Update Recipe</Button>} closeIcon onClose={this.closeModal} open={showModal}>
          <Modal.Header>Edit Recipe</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png' />
            <Modal.Description>
              <Form onSubmit={this.onSubmit}>
                <Form.Input name='title' onChange={this.onChange} label='Title' defaultValue={this.state.title} />
                <Form.Input name='description' onChange={this.onChange} label='Description' defaultValue={this.state.description} />
                <Form.Input name='portionSize' onChange={this.onChange} label='Portion Size' defaultValue={this.state.portionSize} />
                <Form.TextArea label='Ingredients (separate ingredients by a new line)' defaultValue={this.state.ingredients} name='ingredients' onChange={this.onChange} />
                <Form.TextArea label='Instructions (separate instructions by a new line)' defaultValue={this.state.instructions} name='instructions' onChange={this.onChange} />
                <Form.Input name='share' onChange={this.onChange}>
                  <Checkbox label='Share recipe' onClick={() => { this.setState({ showCollaborators: !this.state.showCollaborators }); this.setState((prevState) => ({ share: !prevState.share }))}} checked={this.state.share} />
                </Form.Input>
                { showCollaborators 
                  ? <div>
                      <Form.TextArea label='Collaborators (separate users by a new line)' defaultValue={this.state.collaborators} name='collaborators' onChange={this.onChange}  />
                    </div>
                  : null
                } 
                <Button type='submit'>Submit</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

export default withFirebase(RecipeUpdate);