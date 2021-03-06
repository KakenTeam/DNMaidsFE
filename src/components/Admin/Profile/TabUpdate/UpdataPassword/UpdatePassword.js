import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import styles from './Styles';

const updatePassword = props => {
  const { classes, passwordData, change, handlePassword } = props;

  return (
    <Paper className={classes.root}>
      <ValidatorForm
        className={classes.container}
        autoComplete="off">
        <TextValidator
          required
          label="Mật khẩu cũ"
          name="old_password"
          className={classes.textField}
          validators={['required']}
          errorMessages={['this field is required']}
          margin="normal"
          type="password"
          fullWidth
          value={passwordData.old_password}
          onChange={change}
        />

        <TextValidator
          required
          label="Mật khẩu mới"
          name="password"
          className={classes.textField}
          type="password"
          margin="normal"
          value={passwordData.password}
          onChange={change}
        />

        <TextValidator
          required
          label="Xác nhận mật khẩu mới"
          name="password_confirmation"
          className={classNames(classes.textField)}
          type="password"
          margin="normal"
          value={passwordData.password_confirmation}
          onChange={change}
        />

        <div className={classes.buttonWrapper}>
          <FormControl className={classes.buttons}>
            <Button
              onClick={handlePassword}
              // disabled={!disableAddButton}
              className={classes.submitBtn} variant="contained" type="submit" color="primary">
              Cập nhật
            </Button>
          </FormControl>
        </div>
      </ValidatorForm>
    </Paper>
  );
};

export default (withStyles(styles, { withTheme: true })(updatePassword));
