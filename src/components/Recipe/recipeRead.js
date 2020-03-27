import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

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
                <h1>Recipes</h1>

                {loading && <div>Loading...</div>}

                <RecipeList recipes={recipes} />
            </div>
        );
    }
}

const RecipeList = ({ recipes }) => (
    <ul>
        {recipes.map(recipe => (
            <li key={recipe.uid}>
                <span>
                    <strong>ID:</strong> {recipe.uid}
                </span>
            </li>
        ))}
    </ul>
);

export default withFirebase(RecipeRead);