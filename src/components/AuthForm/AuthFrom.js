import React, { Component } from 'react';

import styles from './AuthForm.module.css';
import cx from 'classnames';
import globalStyles from '../../assets/global-styles/bootstrap.min.module.css';
import authPageImg from '../../assets/images/sign-in-boulder.png';


const authForm = (props) => {
  return (
    <div className={styles.content}>
      <img
        className={styles.img}
        src={authPageImg}
        alt="authPageImage" />
      <div
        className={styles.container}>
        <div
          className={styles.loginPart}>
          {/* {
            (props.responseMessage) && (
              <div className={cx(globalStyles.alert, globalStyles[props.colorAler], styles.alert) }>
                {props.responseMessage}
              </div>
            )
          } */}
          <div
            className={cx(globalStyles.clearfix)}>
            <div
              className={styles.header}>Sign in</div>
            <div
              className={styles.registerSwitch}>
              <button
                className={cx(globalStyles.btn,
                              globalStyles['btn-link'],
                              styles.switchButton)}
                >
                {/* // onClick={props.switchedAuth}
                // { props.isSignup ? 'Sign in' : 'create an account' } */}
              </button>
            </div>
          </div>
          <div>
            <div
              className={styles.LoginForm}>
              <form 
              // onSubmit={props.submitted}
              >
                <div
                  className={globalStyles['form-group']} >
                  <input
                    type="email"
                    className={globalStyles['form-control']}
                    aria-describedby="emailHelp"
                    placeholder="Email"
                    name="email"
                    // onChange={props.changed}
                  />
                </div>
                <div
                  className={globalStyles['form-group']}
                >
                  <input
                    type="password"
                    className={globalStyles['form-control']}
                    placeholder="Password"
                    name="password"
                    // onChange={props.changed}
                  />
                </div>
                <div
                  className={cx(globalStyles['form-group'],
                                globalStyles['form-check'],
                                globalStyles['float-left'],
                                styles.checkBox)}
                >
                  <input
                    type="checkbox"
                    className={globalStyles['form-check-input']}
                  />
                  <label
                    className={globalStyles['form-check-label']}
                    for="exampleCheck1"
                  >
                    Check me out
                  </label>
                </div>
                <button
                  type="submit"
                  className={cx(globalStyles.btn,
                                globalStyles['btn-primary'],
                                globalStyles['float-right'],
                                styles.buttonSubmit)}
                >
                Sign in
                {/* {props.authTitle} */}
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className={styles.RegisterPart}>

        </div>
      </div>
    </div>
  );
}

export default authForm;
