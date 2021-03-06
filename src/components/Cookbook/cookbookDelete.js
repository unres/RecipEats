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
        this.props.firebase.cookbook(this.state.cid).remove();
    }

    render() {
        return (
            <div>
                <Button color="red" onClick={() => this.removeCookbook()}>Delete Cookbook</Button>
            </div>
        );
    }
}
export default withFirebase(CookbookDelete);