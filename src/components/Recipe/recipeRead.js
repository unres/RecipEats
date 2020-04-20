import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import RecipeDelete from './recipeDelete.js';
import RecipeUpdate from './recipeUpdate.js';

class RecipeRead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipes: [],
            userID: this.props.uid,
            email: this.props.email
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

    render() {
        const { recipes, loading } = this.state;

        return (
            <div>
                <h1>Your Recipes</h1>

                {loading && <div>Loading...</div>}

                <RecipeList recipes={recipes} />
            </div>
        );
    }
}

const RecipeList = ({ recipes }) => (
    <div>
        <ul>
            {recipes.map(recipe => (
                <li key={recipe.rid}>
                    <ul>
                        <strong>Title:</strong> {recipe.title}
                    </ul>
                    <ul>
                        <strong>Description:</strong> {recipe.description}
                    </ul>
                    <ul>
                        <strong>Portion Size:</strong> {recipe.portionSize}
                    </ul>
                    <ul>
                        <strong>Ingredients:</strong> {recipe.ingredients}
                    </ul>
                    <ul>
                        <strong>Instructions:</strong> {recipe.instructions}
                    </ul>
                    <ul>
                        <strong>Other Collaborators:</strong> {recipe.collaborators}
                    </ul>
                    <RecipeDelete rid={recipe.rid} />
                    <RecipeUpdate recipe={recipe} />
                </li>
            ))}
        </ul>
    </div>
);

export default withFirebase(RecipeRead);