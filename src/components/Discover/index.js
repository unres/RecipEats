import React from 'react';
import { Header, Card } from 'semantic-ui-react';
import  RecipeCard from '../RecipeCard';
import { withFirebase } from '../Firebase';
import "../Discover/discover.css"

class Discover extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      newRecipes: [],
      mostLikedRecipes: [],
  };
}
  componentDidMount() {
  this.setState({ loading: true });

  this.props.firebase.recipes().on('value', snapshot => {
      const recipesObject = snapshot.val();

      const recipesList = Object.keys(recipesObject).map(key => ({
          ...recipesObject[key],
          rid: key,
      }));

      this.setState({
          recipes: recipesList,
          loading: false            
      });
   });
  }

componentWillUnmount() {
  this.props.firebase.recipes().off();
}
  render() {
    const { recipes, loading } = this.state;
    return (
      <div className='discover'>
        
        <Header as='h1'>Discover Page</Header>
        <Header as='h2'>New Recipes</Header>
        {loading && <div>Loading...</div>}
        <RecipeList recipes = {recipes}></RecipeList>
        <Header as='h2'>New Cookbooks</Header>
        <Card >
          <Card.Content header='Bell Family Desserts'/>
          <Card.Content description='3 Generations of passed down desserts.'/>
        </Card>
      </div>
    )
  }
}

const RecipeList = ({ recipes }) => (
  <Card.Group>
   {recipes.map(recipe=>(
          <RecipeCard Title={recipe.title} description={recipe.description} ></RecipeCard>
        ))}
  </Card.Group>

);

export default withFirebase( Discover );