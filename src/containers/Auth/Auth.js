import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form } from 'reactstrap';

import * as actions from '../../store/actions/index';
// import AuthForm from '../../components/AuthForm/AuthFrom';
import LoginForm from '../../components/AuthForm/Login/Login';
import SignUpForm from '../../components/AuthForm/SignUp/SignUp';
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
    }, () => console.log(this.state));
  }

  changeAuthButton = () => {
    this.setState({
      isSignUp: !this.state.isSignUp
    });
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.dataAuth, this.state.isSignUp);
  }

  render() {
    const authName = (this.state.isSignUp ? this.state.signUpName : this.state.loginName);

    const loginForm = (
      <LoginForm
        changed={(event) => this.dataAuthChangedHandler(event)}
      />
    );

    const signUpForm = (
      <SignUpForm
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
            <h4 className={'mt-0'}>{authName} to DNMaids</h4>
            <Form
              onSubmit={this.submitHandler}
            >
              {loginForm}
              {/* {
                this.state.isSignUp ? signUpForm : null
              } */}
              {authButton}
            </Form>
          </div>
        </section>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (data, isSignUp) => dispatch(actions.auth(data, isSignUp))
});

export default connect(null, mapDispatchToProps)(Auth);