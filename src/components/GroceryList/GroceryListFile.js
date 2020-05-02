import React from 'react';
import {Button, Modal, Form, Header, Icon, List} from 'semantic-ui-react';
import { withFirebase } from '../Firebase';


class GroceryListFile extends React.Component{

  constructor(props) {
    super(props);

    this.state = { ingredientList: [], addIngredient: "", showModal : false, loading : false, recipes : [], showModal2 : false,  userID: this.props.authUser.uid,
    email: this.props.authUser.email };
    this.handleClick = this.handleClick.bind(this);
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

handleClick (event){
var temp = []
this.state.ingredientList.map(ingredient=>{if(ingredient!==event.target.id){temp.push(ingredient)}})
this.setState({ingredientList : temp})
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
<List divided verticalAlign='middle'>{ingredientList.map(ingredient => (<List.Item>{ingredient}<List.Content floated='right'><Icon  id={ingredient} size='big' name="close" link onClick={this.handleClick}/></List.Content></List.Item>))}</List>
</div>)
}


}


const RecipeList = ({ recipes }) => (
  <div>
{recipes.map(recipe => (<Header key={recipe.rid}>{recipe.title}</Header>))}
  </div>
);

export default withFirebase(GroceryListFile);