import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import Form from '../common/Form';
import * as userService from '../services/userService';
import auth from '../services/authService';

class RegisterForm extends Form {
  constructor() {
    super();
    this.state = {
      data: {
        username: '',
        password: '',
        name: ''
      },
      errors: {
        username: '',
        password: '',
        name: ''
      }
    };
  }

  schema = {
    username: Joi.string()
      .required()
      .email()
      .label('Username'),
    password: Joi.string()
      .required()
      .min(5)
      .label('Password'),
    name: Joi.string()
      .required()
      .label('Name')
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      window.location = '/';
    } catch (err) {
      if (err.response && err.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = err.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={e => this.handleSubmit(e)}>
          {this.renderInput('Username', 'username')}
          {this.renderInput('Password', 'password', 'password')}
          {this.renderInput('Name', 'name')}
          {this.renderButton('Register')}
        </form>
      </Fragment>
    );
  }
}

export default RegisterForm;
