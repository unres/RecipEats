import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';

class CookbookDelete extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cid: this.props.cid
        };
    }

    removeCookbook() {
        console.log(this.state);
        this.props.firebase.cookbook(this.state.cid).remove();
    }

    render() {
        return (
            <div>
                <Button onClick={() => this.removeCookbook()}>Delete Cookbook</Button>
            </div>
        );
    }
}
export default withFirebase(CookbookDelete);