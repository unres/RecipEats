import React from 'react';
import { Header } from 'semantic-ui-react';
import { withFirebase } from '../Firebase';
import "../Discover/discover.css"

class Discover extends React.Component{
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
    return (
      <div className='discover'>
        <Header as='h1'>Discover Page</Header>
        <Header as='h2'>New Recipes</Header>
        <Header as='h2'>New Cookbooks</Header>
      </div>
    )
  }
}
export default withFirebase( Discover );