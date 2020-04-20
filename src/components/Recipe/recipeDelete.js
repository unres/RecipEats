import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';

class RecipeDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rid: this.props.rid
        };
    }

    removeRecipe() {
        this.props.firebase.recipe(this.state.rid).remove();
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.removeRecipe()}>Delete Recipe</Button>
            </div>
        );
    }
}
export default withFirebase(RecipeDelete);