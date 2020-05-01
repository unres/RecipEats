import React from 'react';
import { Card, Icon, Modal, Button, Header } from 'semantic-ui-react';

const RecipeCard = props => (
  <Card>
      <Modal closeIcon key={props.recipe.rid} trigger={
                <Card >
                    <Card.Content>
                        <Card.Header>{props.recipe.title}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {props.recipe.description}
                    </Card.Content>
                    <Card.Content extra>
                        <div>  </Card>
);
export default RecipeCard;