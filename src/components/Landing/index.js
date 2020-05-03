import React, { Component } from 'react';
import { Grid, Image, GridColumn, } from 'semantic-ui-react';

import SignUpPage from '../SignUp';

class Landing extends Component {
  
  render() {
    return (
      <div>
        <Grid padded  columns={2}>
          <Grid.Row>

            <Grid.Column textAlign='center' verticalAlign='middle'>
              <div>
              <h1>Join the RecipEats Family</h1>
              <h3>Discover new recipes</h3>
              <h3>Collaborate on cookbooks and recipes</h3>
              <h3>Stock pile all your favorite recipes in one place</h3>
              <h3>Plan out your next grocery list</h3>
              </div>
            </Grid.Column>

            <Grid.Column>
              <SignUpPage />
            </Grid.Column>

          </Grid.Row>
          <Grid.Row columns={2}>
            <GridColumn>
              <Image src='/recipe.PNG'/>
            </GridColumn>
            <GridColumn>
              <Image src='/recipe.PNG'/>
            </GridColumn>
          </Grid.Row>
       </Grid>
      </div>
   )
  }
}

export default Landing;