import React from 'react';
import { Card, Icon, Modal, Button, Header } from 'semantic-ui-react';

const RecipeCard = props => (
  <Card>
      <Card.Content header={props.Title}/>
      <Card.Content description={props.description}/>
  </Card>
);
export default RecipeCard;