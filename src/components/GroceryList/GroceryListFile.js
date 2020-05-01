import React from 'react';
import {Button, Modal, Form, Header} from 'semantic-ui-react';
import { withFirebase } from '../Firebase';


class GroceryListFile extends React.Component{

  constructor(props) {
    super(props);

    this.state = { ingredientList: [], addIngredient: "", showModal : false, loading : false, recipes : [], showModal2 : false,  userID: this.props.authUser.uid,
    email: this.props.authUser.email };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = event => {
    this.setState({ showModal: false })
      var temp = this.state.ingredientList.concat(this.state.addIngredient) 
      this.setState({ ingredientList : temp})
  };

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.recipes().on('value', snapshot => {
        const recipesObject = snapshot.val();

        const recipesList = Object.keys(recipesObject).map(key => ({
            ...recipesObject[key],
            rid: key,
        }));

        const userRecipes = [];

        recipesList.map(recipe => {
            if (recipe.userID === this.state.userID || (recipe.collaborators != null && recipe.collaborators.indexOf(this.state.email) > -1))
                userRecipes.push(recipe)
        });

        this.setState({
            recipes: userRecipes,
            loading: false            
        });
    });
}

componentWillUnmount() {
    this.props.firebase.recipes().off();
}



render(){
  const { showModal,ingredientList,recipes, showModal2} = this.state;
  return(  <div>
    <Modal trigger={<Button onClick={() => this.setState({ showModal: true })}>Add Item</Button>} closeIcon open={showModal}>
      <Modal.Content>
        <Form onSubmit={this.onSubmit}>
          <Form.Input name="addIngredient" onChange={this.onChange} label="Ingredient" placeholder="Ingredient" /> 
          <Button type='submit' onClick={this.onSubmit}>Submit</Button>
        </Form>
      </Modal.Content> 
    </Modal>

    <Modal trigger={<Button onClick={() => this.setState({ showModal2: true })}>Add From Recipe</Button>} closeIcon open={showModal2}>
      <Modal.Content>
        <RecipeList recipes={recipes}></RecipeList> 
      </Modal.Content> 
    </Modal>

  <h1>Grocery List</h1>
{ingredientList.map(ingredient => (<Header>{ingredient}</Header>))}
</div>)
}


}


const RecipeList = ({ recipes }) => (
  <div>
{recipes.map(recipe => (<Header key={recipe.rid}>{recipe.title}</Header>))}
  </div>
);

export default withFirebase(GroceryListFile);