import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'

import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const INITIAL_STATE = {
    fName: '',
    lName: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { fName, lName, email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            fName,
            lName,
            email,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.COOKBOOK);
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
    const {
        fName,
        lName,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      fName === '' ||
      lName === '';

    return (
      <Form onSubmit={this.onSubmit}>
          <Form.Input label="First Name" placeholder="Chad" name='fName' onChange={this.onChange} />
          <Form.Input label="Last Name" placeholder="Tastic" name='lName' onChange={this.onChange} />

        <Form.Input label="Email" placeholder="test@gmail.com" name='email' onChange={this.onChange} />

         <Form.Input label="Password" placeholder="******" name='passwordOne' type='password' onChange={this.onChange} />
         <Form.Input label="Re-enter  Password" placeholder="******" name='passwordTwo' type='password' onChange={this.onChange} />

        <Button disabled={isInvalid} type="submit">
            Sign Up
        </Button>
        {error && <p>{error.message}</p>}
      </Form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.LANDING}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };