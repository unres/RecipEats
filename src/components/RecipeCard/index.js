import React from 'react';

import Likes from './likes.js'
import { Card, Modal, Header, Icon, Button } from 'semantic-ui-react';

const RecipeCard = props => (
  
      <Modal closeIcon key={props.recipe.rid} trigger={
                <Card >
                    <Card.Content>
                        <Card.Header>{props.recipe.title}</Card.Header>
                    </Card.Content>
                    <Card.Content>
                        {props.recipe.description}
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Icon name="heart" disabled />
                            {props.recipe.likes}
                        </div>
                    </Card.Content>
                </Card>
                }>
                <Modal.Header>{props.recipe.title}</Modal.Header>
                    
                <Modal.Content>

                        <Header as="h4">Portion Size:  {props.recipe.portionSize}</Header>
                        
                        <Header>Ingredients:</Header>
                        {props.recipe.ingredients.split("\n").map((item, index) => <div key={index}>{(index + 1) + ": " + item}</div>)}

                        <Header>Instructions:</Header>
                        {props.recipe.instructions.split("\n").map((item, index) => <div key={index}>{(index + 1) + ": " + item}</div>)}

                </Modal.Content>
                <Modal.Actions>
                    <Likes recipe={props.recipe}/>
                </Modal.Actions>
        </Modal>

);
export default RecipeCard;