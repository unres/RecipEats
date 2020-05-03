import React from 'react';
import { Button, Modal, Form, Card, Icon, List, Checkbox, Menu } from 'semantic-ui-react';
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
      this.setState({tempArray: tempList})
  }

  handleSubmit = () =>{
    var tempList = this.state.ingredientList;
    this.state.tempArray.map(item => {if(this.state.ingredientList.indexOf(item) <= -1 ){tempList.push(item)}})
    this.setState({ingredientList : tempList, showModal2: false})
  }

render(){
  const { showModal,ingredientList,recipes, showModal2} = this.state;
  return(  <div>
    <Menu>
    <Modal trigger={<Menu.Item><Button icon labelPosition='left' onClick={() => this.setState({ showModal: true })}><Icon name="add" />Add Item</Button></Menu.Item>} closeIcon open={showModal} onClose={() => this.setState({showModal: false})}>
      <Modal.Header>Enter the Item:</Modal.Header>
      <Modal.Content>
        <Form onSubmit={this.onSubmit}>
          <Form.Input name="addIngredient" onChange={this.onChange} label="Ingredient" placeholder="Ingredient" /> 
          <Button type='submit' onClick={this.onSubmit} color='green'>Submit</Button>
        </Form>
      </Modal.Content> 
    </Modal>

    <Modal trigger={<Menu.Item><Button icon labelPosition='left' onClick={() => this.setState({ showModal2: true })}><Icon name="add" />Add From Recipe</Button></Menu.Item>} closeIcon open={showModal2} onClose={() => this.setState({showModal2: false})} >
      <Modal.Header>Select Recipe:</Modal.Header>
      <Modal.Content>
        <RecipeList recipes={recipes} testAdd={this.testAdd} handleSubmit={this.handleSubmit}></RecipeList> 
      </Modal.Content> 
    </Modal>
    </Menu>

  <h1>Grocery List</h1>
<List divided verticalAlign='middle'>{ingredientList.map(ingredient => (<List.Item>{ingredient}<List.Content floated='right'><Icon  id={ingredient} color='red' size='big' name="close" link onClick={this.handleClick}/></List.Content></List.Item>))}</List>
</div>)
}


}


const RecipeList = ({ recipes, handleSubmit, testAdd }) => (
  <div>
{recipes.map(recipe => (
       <Modal key={recipe.rid} closeIcon trigger={
                <Card >
                    <Card.Content>
                        <Card.Header>{recipe.title}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {recipe.description}
                    </Card.Content>
                </Card>
                }>
        <Modal.Header>Select Ingredients to Add</Modal.Header>
        <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <List key={recipe.rid}>
          {recipe.ingredients.split("\n").map((item, index) =><List.Item><Checkbox key={index} label={item} id={item} value={item} onChange={testAdd}/> </List.Item>)}
          </List>
          <Button type='submit' color='green'>Add</Button>
        </Form>
        </Modal.Content>
        </Modal>
      ))}
  </div>
);

export default withFirebase(GroceryListFile);