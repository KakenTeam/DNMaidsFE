import React, { Component } from 'react';

import {Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import cx from 'classnames';
import styles from './AuthForm.module.css';

class AuthForm extends Component {
  render() {
    return (
      <div className={styles['root-form']}>
        <section>
          <div className={styles.widget}>
            <h4 className={'mt-0'}>Login to DNMaids</h4>
            {/* <p className="fs-sm text-muted">
              User your username and password to sign in<br />
              Don&#39;t have an account? Sign up now!
            </p> */}
            <Form
              // onSubmit={this.doLogin}
            >
              {this.props.errorMessage && (
                <Alert size="sm" color="danger">
                  {this.props.errorMessage}
                </Alert>
              )}
              <FormGroup className={cx('form-group', styles['input-form'])}>
                <Input
                  // className={styles.}
                  // value={this.state.login}
                  // onChange={this.changeLogin}
                  type="text"
                  required
                  name="username"
                  placeholder="Username"
                />
              </FormGroup>
              <FormGroup className={cx('form-group', styles['input-form'])}>
                <Input
                  // className={'no-border'}
                  // value={this.state.password}
                  // onChange={this.changePassword}
                  type="password"
                  required
                  name="password"
                  placeholder="Password"
                />
              </FormGroup>
                <div className={styles['login-btn']}>
                  {/* <Button color="default" size="sm">
                    Create an account
                  </Button> */}
                  <Button color="success" size="sm" type="submit">
                    {/* {this.props.isFetching ? 'Loading...' : 'Login'} */}
                    Login
                  </Button>
                </div>
              {/* <div className="d-flex justify-content-between align-items-center">
                <a href="#" className="fs-sm">Trouble with account?</a> eslint-disable-line
              </div> */}
            </Form>
          </div>
   
          {/* <Footer className="text-center" /> */}
        </section>
      </div>
    );
  }
}

export default AuthForm;
