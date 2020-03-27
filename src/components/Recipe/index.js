import React from 'react';
import RecipeCreate from './recipeCreate.js';
import RecipeRead from './recipeRead.js';
import './recipe.css';

class Recipe extends React.Component{
  render() {
    return (
      <div className='recipe'>
        <RecipeCreate />
        <RecipeRead />
      </div>
    )
  }
}

export default Recipe;