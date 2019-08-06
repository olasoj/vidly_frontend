import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import auth from '../services/authService';
import Form from '../common/Form';
import { Redirect } from 'react-router-dom';

//const username = React.createRef();

class LoginForm extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        username: '',
        password: ''
      },
      errors: { username: '', password: '' }
    };
  }

  //defining joi schema
  schema = {
    username: Joi.string()
      .required()
      .email()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;
    try {
      await auth.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (err) {
      if (err.response) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to='/' />;
    return (
      <Fragment>
        <form onSubmit={e => this.handleSubmit(e)}>
          {this.renderInput('Username', 'username')}
          {this.renderInput('Password', 'password', 'password')}
          {this.renderButton('Login')}
        </form>
      </Fragment>
    );
  }
}

export default LoginForm;
