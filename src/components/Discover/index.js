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

      const publicRecies = [];

      recipesList.map(recipe => {
        if ( recipe.share == true)
        publicRecies.push(recipe)
      });

      const showNewRecipes = publicRecies.sort(function(item1, item2) {
        return (item1.dateCreated < item2.dateCreated)
      })

      const showMostLikedRecipes = publicRecies.sort(function(item1, item2) {
        return (item1.likes < item2.likes)
      });
      const showNewCookbooks = [];
      const showMostLikedCookbooks = [];

      

      this.setState({
          newRecipes: showNewRecipes,
          mostLikedRecipes: showMostLikedRecipes,
          loading: false            
      });
   });
  }

componentWillUnmount() {
  this.props.firebase.recipes().off();
}
  render() {
    const {  loading, newRecipes, mostLikedRecipes } = this.state;
    return (
      <div className='discover'>
        
        <Header as='h1'>Discover Page</Header>
        <Header as='h2'>New Recipes</Header>
        {loading && <div>Loading...</div>}
        <RecipeList recipes = {newRecipes}></RecipeList>

        <Header as='h2'>Most Liked Recipes</Header>
        {loading && <div>Loading...</div>}
        <RecipeList recipes = {mostLikedRecipes}></RecipeList>

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
          <RecipeCard recipe={recipe} ></RecipeCard>
        ))}
  </Card.Group>

);

export default withFirebase( Discover );