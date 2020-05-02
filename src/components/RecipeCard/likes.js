import React, { Component } from 'react';
import { withFirebase } from '../Firebase';

import { Icon, Button } from 'semantic-ui-react';

class Likes extends Component {
    constructor(props){
        super(props);
        this.state = { ...this.props.recipe}

        this.writeToDB = this.writeToDB.bind(this);
    }

    writeToDB = () => {
        return this.props.firebase.recipe(this.props.recipe.rid)
        .set({
          ...this.state
        }).then(console.log(this.state.likes))
        .catch(error => {
          this.setState({ error });
        });
    }

    onClick = () => { 
        this.setState({ likes: this.props.recipe.likes + 1}, () => {this.writeToDB()});
    }

    render(){
       return(
        <div>
        <Button icon toggle={true} onClick={this.onClick}>
            <Icon name="heart" disabled />
            {this.props.recipe.likes}
        </Button>
        </div>
        ); 

        
    }

}

export default  withFirebase(Likes);