import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';

import SignUpPage from '../SignUp';
class Landing extends Component {
  
  render() {
    return (
      <div>
        <Grid columns={2}>
          <Grid.Row>

            <Grid.Column>
              <h1>Landing</h1>
            </Grid.Column>

            <Grid.Column>
              <SignUpPage />
            </Grid.Column>

          </Grid.Row>
       </Grid>
      </div>
   )
  }
}

export default Landing;