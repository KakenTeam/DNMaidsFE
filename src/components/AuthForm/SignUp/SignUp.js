import React from 'react';

import { Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import cx from 'classnames';
import styles from './SignUp.module.css';

const signUp = props => {
  return (
    <div>
      <Row form>
        <Col md={6}>
          <FormGroup className={cx('form-group', styles['input-form'])}>
            <Label>Email</Label>
            <Input
              onChange={props.changed}
              type="text"
              required
              name="email"
              placeholder="Email"
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup className={cx('form-group', styles['input-form'])}>
            <Label>Name</Label>
            <Input
              onChange={props.changed}
              type="text"
              required
              name="name"
              placeholder="Name"
            />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup className={cx('form-group', styles['input-form'])}>
        <Label>Confirm password</Label>
        <Input
          onChange={props.changed}
          type="password"
          required
          name="confirmPassword"
          placeholder="Confirm password"
        />
      </FormGroup>
      <FormGroup className={cx('form-group', styles['input-form'])}>
        <Label>Birthday</Label>
        <Input
          onChange={props.changed}
          type="date"
          name="birthday"
        />
      </FormGroup>
      <FormGroup className={cx('form-group', styles['input-form'])}>
        <Label>Address</Label>
        <Input
          onChange={props.changed}
          type="text"
          name="address"
        />
      </FormGroup>
      <FormGroup className={cx('form-group', styles['input-form'])}>
        <Label>Phone number</Label>
        <Input
          onChange={props.changed}
          type="number"
          name="phone"
        />
      </FormGroup>
      <FormGroup className={cx('form-group', styles['input-form'])}>
        <Label>Gender</Label>
        <Input
          onChange={props.changed}
          type="select"
          name="gender">
          <option>0</option>
          <option>1</option>
        </Input>
      </FormGroup>
    </div>
  );
};

export default signUp;