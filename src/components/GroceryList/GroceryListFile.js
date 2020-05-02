import React from 'react';
import { Button, Modal, Form, Card, Icon, List, Checkbox } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';


class GroceryListFile extends React.Component{

  constructor(props) {
    super(props);

    this.state = { ingredientList: [], addIngredient: "", showModal : false, loading : false, recipes : [], showModal2 : false,  userID: this.props.authUser.uid,
    email: this.props.authUser.email, tempArray: []};
    this.handleClick = this.handleClick.bind(this);
    this.testAdd = this.testAdd.bind(this);
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

testAdd(event){
      var tempList = this.state.ingredientList;
      tempList.push(event.target.id);
      this.setState({ingredientList: tempList, checked: !this.state.checked})
  }

  handleSubmit = () =>{
    console.log("here");
    var tempList = this.state.ingredientList;
    this.state.tempArray.map(ingredient =>{
      if(tempList.indexOf(ingredient) > -1){

      }
      else{
        tempList.push(ingredient)
      }
    })
    this.setState({ingredientList: tempList })
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
        <RecipeList recipes={recipes} testAdd={this.testAdd} handleSubmit={this.handleSubmit}></RecipeList> 
      </Modal.Content> 
    </Modal>

  <h1>Grocery List</h1>
<List divided verticalAlign='middle'>{ingredientList.map(ingredient => (<List.Item>{ingredient}<List.Content floated='right'><Icon  id={ingredient} size='big' name="close" link onClick={this.handleClick}/></List.Content></List.Item>))}</List>
</div>)
}


}


const RecipeList = ({ recipes, testAdd, handleSubmit }) => (
  <div>
{recipes.map(recipe => (
       <Modal closeIcon key={recipe.rid} trigger={
                <Card >
                    <Card.Content>
                        <Card.Header>{recipe.title}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {recipe.description}
                    </Card.Content>
                </Card>
                }>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
          {recipe.ingredients.split("\n").map((item, index) => <Checkbox key={index} label={item} onChange={testAdd} id={item} />)}
          </Form>
        </Modal.Content>
        <Modal.Content extra>
          <Button type='submit'>Add</Button>
        </Modal.Content>
        </Modal>
      ))}
  </div>
);

export default withFirebase(GroceryListFile);