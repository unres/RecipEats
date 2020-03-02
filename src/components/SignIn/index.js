import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form } from 'semantic-ui-react';

import { compose } from 'recompose';
import { PasswordForgetLink } from '../PasswordForget';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
    <PasswordForgetLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
    return (
      <Form onSubmit={this.onSubmit}>
          <Form.Input name='email' placeholder='Billy@yahoo.com' label='Email'  onChange={this.onChange} />
          <Form.Input name='password' placeholder='******' label='Password' type='password' onChange={this.onChange} />
        
          <button disabled={isInvalid} type="submit">
          Sign In
          </button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;
export { SignInForm };