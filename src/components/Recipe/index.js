import React from 'react';
import RecipeCreate from '../RecipeCreate';
import RecipeRead from '../RecipeRead';

class Recipe extends React.Component{
  render() {
    return (
      <div>
        <RecipeCreate />
        <RecipeRead />
      </div>
    )
  }
}

export default Recipe;