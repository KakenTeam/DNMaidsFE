import React from 'react';

import { Button } from 'reactstrap';
import styles from './AuthButton.module.css';

const authButton = props => {
  return (
    <div className={styles['login-btn']}>
      {/* <Button
        onClick={props.changedAuth}
        className={styles['change-auth-btn']}
        color="primary" size="sm"
        >
        Switch to {props.isSignUp ? props.loginName : props.signUpName}
      </Button> */}
      <Button
        className={styles['submit-btn']}
        color="success" size="sm" type="submit">
        {props.loginName}
      </Button>
    </div>
  );
};

export default authButton;