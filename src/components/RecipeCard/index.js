import React from 'react';
import {Card} from 'semantic-ui-react';

const RecipeCard = props => (
  <Card>
      <Card.Content header={props.Title}/>
      <Card.Content description={props.description}/>
  </Card>
);
export default RecipeCard;