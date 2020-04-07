import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { Button, List } from 'semantic-ui-react';
import '../Cookbook/cookbook.css'


class CookbookRead extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cookbooks: []
        };
    }

    // componentDidMount() is invoked immediately after a component is mounted (inserted into the tree).
    componentDidMount() {
        this.props.firebase.cookbooks().on('value', snapshot => {
            const cookbooksObj = snapshot.val();

            const cookbooksList = Object.keys(cookbooksObj).map(key => ({
                ...cookbooksObj[key],
                uid: key
            }));

            this.setState({
                cookbooks: cookbooksList
            });
        });
    }

    componentWillUnmount() {
        this.props.firebase.cookbooks().off();
    }
    
    render() {
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
// TODO: Clicking cookbook buttons should open up the cookbook details
const CookbookList = ({ cookbooks }) => (
    <List>
        {cookbooks.map(cookbook => (
            //<List.Item key={cookbook.uid}><List><Button>{cookbook.title}</Button></List></List.Item>
            <List.Item key={cookbook.uid}>
                <List>Title: {cookbook.title}</List>
                <List>Description: {cookbook.description}</List>
                <List>Public: {cookbook.public.toString()}</List>
                <List>Recipes: {cookbook.recipes}</List>
            </List.Item>
        ))}
    </List>
)

export default withFirebase(CookbookRead)