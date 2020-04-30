import React from 'react';
import { Button, Modal, Image, Checkbox, Form } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

var RID = "01";
const min = 1000;

const INITIAL_STATE = {
  title: '',
  description: '',
  portionSize: 1,
  ingredients: [''],
  instructions: [''],
  public: false,
  share: false,
  collaborators: [],
  dateCreated: '',
  likes: 0,
  showModal: false,
  showCollaborators: false
}

class RecipeCreate extends React.Component{
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE, userID: this.props.uid };
    this.writeToDB = this.writeToDB.bind(this);
  }

  writeToDB() {
    return this.props.firebase.recipe(RID)
      .set({
        ...this.state
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.RECIPE);
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onSubmit = event => {
    generateRID();
    this.writeToDB();
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
        <Modal trigger={<Button onClick={() => this.setState({ showModal: true })}>Create a Recipe</Button>} closeIcon onClose={this.closeModal} open={showModal}>
          <Modal.Header>Create a Recipe</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src='https://cdn.pixabay.com/photo/2014/12/21/23/28/recipe-575434_960_720.png' />
            <Modal.Description>
              <Form onSubmit={this.onSubmit}>
                <Form.Input name='title' onChange={this.onChange} label='Title' placeholder='Title' />
                <Form.Input name='description' onChange={this.onChange} label='Description' placeholder='Description' />
                <Form.Input name='portionSize' onChange={this.onChange} label='Portion Size' placeholder='Portion Size' />
                <Form.TextArea label='Ingredients (separate ingredients by a new line)' placeholder='Ingredients' name='ingredients' onChange={this.onChange} />
                <Form.TextArea label='Instructions (separate instructions by a new line)' placeholder='Instructions' name='instructions' onChange={this.onChange} />
                <Form.Input name='public' onChange={this.onChange}>
                  <Checkbox label='Public recipe' onClick={() => { this.setState((prevState) => ({ public: !prevState.public }))}} checked={this.state.public} />
                </Form.Input>
                <Form.Input name='share' onChange={this.onChange}>
                  <Checkbox label='Share recipe' onClick={() => { this.setState({ showCollaborators: !this.state.showCollaborators }); this.setState((prevState) => ({ share: !prevState.share }))}} checked={this.state.share} />
                </Form.Input>
                { showCollaborators 
                  ? <div>
                      <Form.TextArea label='Collaborators (separate users by a new line)' placeholder='Collaborators' name='collaborators' onChange={this.onChange}  />
                    </div>
                  : null
                } 
                <Button type='submit' onClick={() => this.setState({ dateCreated: Date.now() })}>Submit</Button>
              </Form>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}

const generateRID = () => {
    RID = Date.now() + String( Math.floor(Math.random() * min));
}

export default withFirebase(RecipeCreate);