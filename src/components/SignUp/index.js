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
    const { email, passwordOne } = this.state;
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
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

         <Form.Input label="Password" placeholder="****" name='passwordOne' onChange={this.onChange} />
         <Form.Input label="Re-enter  Password" placeholder="****" name='passwordTwo' onChange={this.onChange} />


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
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

export default SignUpPage;
export { SignUpForm, SignUpLink };

/* 
  <form onSubmit={this.onSubmit}>
          <input
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
            Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
*/