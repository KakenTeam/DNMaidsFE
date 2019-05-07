import React from 'react';

import { FormGroup, Input } from 'reactstrap';
import cx from 'classnames';
import styles from './Login.module.css';

const login = (props) => {
  return (
    <div>
      <FormGroup className={cx('form-group', styles['input-form'])}>
        <Input
          onChange={props.changed}
          type="text"
          required
          name="email"
          placeholder="Email"
        />
      </FormGroup>
      <FormGroup className={cx('form-group', styles['input-form'])}>
        <Input
          onChange={props.changed}
          type="password"
          required
          name="password"
          placeholder="Password"
        />
      </FormGroup>     
    </div>
  );
}

export default login;
