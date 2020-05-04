import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Card, Modal, Button } from 'semantic-ui-react';
import CookbookDelete from './cookbookDelete.js';
import CookbookUpdate from './cookbookUpdate.js';
import '../Cookbook/cookbook.css'
import ADDNewrecipe from './cookbookAddNewRecipe.js';
import LoopRecipes from './loopRecipes.js';


class CookbookRead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cookbooks: [],
            userID: this.props.uid,
            recipeInCookbook: [],
            email: this.props.email,
            showModal: false
        };

        this.setInitial = this.setInitial.bind(this);
        this.changeProp = this.changeProp.bind(this);
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
                if (cookbook.userID === this.state.userID || (cookbook.collaborators != null && cookbook.collaborators.indexOf(this.state.email) > -1) ) {
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

    
    
    // index of for specific cookbook ID, then add the rid to recipes of that specific one
    setInitial = ( cookbook ,RID) => {
        var temp = [];
        temp.push(RID);
        this.setState({recipeInCookbook: temp});
    }

    changeProp = (newArray)=>{     
        this.setState({recipeInCookbook: newArray});
    }
        

    render() {
        // this.state.recipes is an array but also an object????
        const {cookbooks} = this.state;
        return(
            <div>
                <h1>Your Cookbooks</h1>
                <CookbookList cookbooks = {cookbooks} uid={this.state.userID} setInitial={this.setInitial} recipeInCookbook={this.state.recipeInCookbook} changeProp={this.changeProp} />
            </div>
        );
    }
}

// Pass an object with cookbooks
// Renders buttons for each cookbook
const CookbookList = ({ cookbooks, uid, setInitial, recipeInCookbook, changeProp }) => (
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
                    <LoopRecipes recipes={cookbook.recipesIncluded}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <CookbookUpdate cookbook={cookbook}/>
                        <CookbookDelete cid={cookbook.cid} />
                        <ADDNewrecipe uid={uid} setInitial={setInitial} cookbook={cookbook} recipes={recipeInCookbook} recipess={cookbook.recipesIncluded} changeProp={changeProp}/>
                    </Button.Group>
                </Modal.Actions>
                </Modal>
            ))}
        </Card.Group>
    </div>
)

export default withFirebase(CookbookRead)