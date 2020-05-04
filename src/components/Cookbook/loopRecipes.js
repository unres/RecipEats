import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Card, Modal, Header, Button } from 'semantic-ui-react';

import RecipeDelete from '../Recipe/recipeDelete.js';
import RecipeUpdate from '../Recipe/recipeUpdate.js';


class LoopRecipes extends Component{

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            recipes: [],
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
                if(typeof this.props.recipes === 'undefined'){}
                else{
                this.props.recipes.map(verify => {
                    if (recipe.rid === verify)
                    userRecipes.push(recipe)
                })}
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

    render(){
        const { recipes, loading } = this.state;

        return (
            <div>
                <h1>Your Recipes</h1>

                {loading && <div>Loading...</div>}

                <Card.Group>
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
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
                ))}

                </Card.Group>
            </div>
        );
    }
}


export default withFirebase(LoopRecipes)