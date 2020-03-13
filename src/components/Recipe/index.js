import React from 'react';
import { Button, Modal, Image, Checkbox, Form } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import '../Recipe/recipe.css';

const test = '01';

const INITIAL_STATE = {
  title: '',
  description: '',
  portionSize: 1,
  ingredients: [''],
  instructions: [''],
  share: false,
  userID: "",
  collaborators: [''],
  showModal: false,
  showCollaborators: false
}

class Recipe extends React.Component{
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  /*
  fetchUID(){
    this.setState({userID: this.props.firebase.auth.currentUser.uid});
    console.log(this.state);
  }
  */

  componentDidMount() {
    this.authSubscription = this.props.firebase.auth.onAuthStateChanged((userID) => {
      this.setState({
        userID
      });
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    const { title, description, portionSize, ingredients, instructions, share, userID, collaborators } = this.state;
    return this.props.firebase.recipe(test)
      .set({
        title, 
        description, 
        portionSize, 
        ingredients, 
        instructions, 
        share, 
        collaborators
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
      <div className='recipe'>
        <Modal trigger={<Button onClick={() => this.setState({ showModal: true })}>Create a Recipe</Button>} closeIcon onClose={this.closeModal} open={showModal}>
          <Modal.Header>Create a Recipe</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png' />
            <Modal.Description>
              <Form onSubmit={this.onSubmit}>
                <Form.Input name='title' onChange={this.onChange}>
                  <label>Title</label>
                  <input placeholder='Title' />
                </Form.Input>
                <Form.Input name='description' onChange={this.onChange}>
                  <label>Description</label>
                  <input placeholder='Description' />
                </Form.Input>
                <Form.Input name='portionSize' onChange={this.onChange}>
                  <label>Portion Size</label>
                  <input placeholder='Portion Size' />
                </Form.Input>
                <Form.TextArea label='Ingredients' placeholder='Ingredients' name='ingredients' onChange={this.onChange} />
                <Form.TextArea label='Instructions' placeholder='Instructions' name='instructions' onChange={this.onChange} />
                <Form.Input name='share' onChange={this.onChange}>
                  <Checkbox label='Share recipe' onClick={() => { this.setState({ showCollaborators: !this.state.showCollaborators }); this.setState((prevState) => ({ share: !prevState.share }))}} checked={this.state.share} />
                </Form.Input>
                { showCollaborators 
                  ? <div>
                      <Form.TextArea label='Collaborators' placeholder='Collaborators' name='collaborators' onChange={this.onChange}  />
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

export default withFirebase(Recipe);