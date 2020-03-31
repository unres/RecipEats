import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import RecipeDelete from './recipeDelete.js';
import RecipeUpdate from './recipeUpdate.js';

class RecipeRead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipes: []
        };
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.recipes().on('value', snapshot => {
            const recipesObject = snapshot.val();

            const recipesList = Object.keys(recipesObject).map(key => ({
                ...recipesObject[key],
                uid: key,
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
            <div>
                <h1>Your Recipes</h1>

                {loading && <div>Loading...</div>}

                <RecipeList recipes={recipes} />
                <RecipeDelete />
                <RecipeUpdate />
            </div>
        );
    }
}

const RecipeList = ({ recipes }) => (
    <ul>
        {recipes.map(recipe => (
            <li key={recipe.uid}>
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
            </li>
        ))}
    </ul>
);

export default withFirebase(RecipeRead);