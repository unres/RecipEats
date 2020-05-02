import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import RecipeDelete from './recipeDelete.js';
import RecipeUpdate from './recipeUpdate.js';
import Likes from '../RecipeCard/likes.js';
import { Card, Icon, Modal, Button, Header } from 'semantic-ui-react';

class RecipeRead extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipes: [],
            userID: this.props.uid,
            email: this.props.email,
            open: false,
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
        <Card.Group >
            {recipes.map(recipe => (
                <Modal closeIcon key={recipe.rid} trigger={
                <Card >
                    <Card.Content>
                        <Card.Header>{recipe.title}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {recipe.description}
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Icon name="heart" disabled />
                            {recipe.likes}
                        </div>
                    </Card.Content>
                </Card>
                }>
                <Modal.Header>{recipe.title}</Modal.Header>
                    
                <Modal.Content>

                        <Header as="h4">Portion Size:  {recipe.portionSize}</Header>
                        
                        <Header>Ingredients:</Header>
                        {recipe.ingredients.split("\n").map((item, index) => <div key={index}>{(index + 1) + ": " + item}</div>)}

                        <Header>Instructions:</Header>
                        {recipe.instructions.split("\n").map((item, index) => <div key={index}>{(index + 1) + ": " + item}</div>)}

                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <RecipeUpdate recipe={recipe}/>
                        <RecipeDelete rid={recipe.rid} />
                        <Likes recipe={recipe}/>
                    </Button.Group>
                </Modal.Actions>
                </Modal>
            ))}
        </Card.Group>
    </div>
);

export default withFirebase(RecipeRead);