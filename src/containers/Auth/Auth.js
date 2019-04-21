import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form } from 'reactstrap';

import * as actions from '../../store/actions/index';
import LoginForm from '../../components/AuthForm/Login/Login';
import AuthButton from '../../components/AuthForm/AuthButton/AuthButton';

import styles from './Auth.module.css';

class Auth extends Component {

  state = {
    dataAuth: {
      email: null,
      password: null,
      confirmPassword: null,
      birthday: null,
      address: null,
      phone: null,
      gender: null,
    },
    isSignUp: true,
    signUpName: 'Sign up',
    loginName: 'Login'
  }

  dataAuthChangedHandler = event => {
    const nameEvent = event.target.name;
    this.setState({
      dataAuth: {
        ...this.state.dataAuth,
        [nameEvent]: event.target.value
      }
    });
  }

  changeAuthButton = () => {
    this.setState({
      isSignUp: !this.state.isSignUp
    });
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.dataAuth);
  }

  render() {
    const loginForm = (
      <LoginForm
        changed={(event) => this.dataAuthChangedHandler(event)}
      />
    );

    const authButton = (
      <AuthButton
        changedAuth={this.changeAuthButton}
        isSignUp={this.state.isSignUp}
        loginName={this.state.loginName}
        signUpName={this.state.signUpName}
      />
    );

    return (

      <div className={styles['root-form']}>
        <section>
          <div className={styles.widget}>
            <h4 className={'mt-0'}>Login to DNMaids</h4>
            <Form
              onSubmit={this.submitHandler}
            >
              {loginForm}
              {authButton}
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: data => dispatch(actions.auth(data)),
  getUsers: () => dispatch(actions.getUsers()),
});

export default withRouter(connect(null, mapDispatchToProps)(Auth));