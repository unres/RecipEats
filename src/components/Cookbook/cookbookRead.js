import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Card, Modal, Button, Header } from 'semantic-ui-react';
import CookbookDelete from './cookbookDelete.js';
import CookbookUpdate from './cookbookUpdate.js';
import '../Cookbook/cookbook.css'
import CookbookAddNewRecipe from './cookbookAddNewRecipe';


class CookbookRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookbooks: [],
            userID: this.props.uid,
        };
    }

    // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
    componentDidMount() {
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
            });
        });

        this.props.firebase.cookbooks().on('value', snapshot => {
            const cookbooksObj = snapshot.val();

            const cookbooksList = Object.keys(cookbooksObj).map(key => ({
                ...cookbooksObj[key],
                cid: key
            }));

            const userCookbooks = [];

            cookbooksList.map(cookbook => {
                if (cookbook.userID === this.state.userID) {
                    userCookbooks.push(cookbook)
                }
            });


            this.setState({
                cookbooks: userCookbooks,
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.cookbooks().off();
    }
    
    render() {
        // this.state.recipes is an array but also an object????
        const {cookbooks} = this.state;
        
        return(
            <div>
                <CookbookList cookbooks = {cookbooks} />
            </div>
        );
    }
}

// Pass an object with cookbooks
// Renders buttons for each cookbook
const CookbookList = ({ cookbooks }) => (
    <div>
        <Card.Group >
            {cookbooks.map(cookbook => (
                <Modal closeIcon key={cookbook.cid} trigger={
                <Card >
                    <Card.Content>
                        <Card.Header>{cookbook.title}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {cookbook.description}
                    </Card.Content>
                </Card>
                }>
                    
                <Modal.Header>{cookbook.title}</Modal.Header>

                <Modal.Content>
                    {/*Create card for each recipe in cookbook*/}
                    <Header>{cookbook.recipes}</Header>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <CookbookUpdate cookbook={cookbook}/>
                        <CookbookDelete cid={cookbook.cid} />
                        <CookbookAddNewRecipe obj={cookbook} />
                    </Button.Group>
                </Modal.Actions>
                </Modal>
            ))}
        </Card.Group>
    </div>
)

export default withFirebase(CookbookRead)