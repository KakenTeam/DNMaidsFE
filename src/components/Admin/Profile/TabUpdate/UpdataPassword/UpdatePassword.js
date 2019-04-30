import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import styles from './Styles';

class UpdatePassword extends React.Component {

  render() {

    // const { classes, toggleEdit, user, genderDefault, groupsDefault, changeHandler, editToggle} = this.props;
    const { classes, adminInfo, change, genderDefault } = this.props;
    return (
      <Paper className={classes.root}>
        <ValidatorForm
          onSubmit={this.props.handleEdit}
          className={classes.container}
          autoComplete="off">
          <TextValidator
            required
            label="Old password"
            name="old_password"
            className={classes.textField}
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
            type="password"
            fullWidth
            // value={adminInfo.name}
            // onChange={change}
          />

          <TextValidator
            required
            label="New password"
            name="password"
            className={classes.textField}
            type="password"
            margin="normal"
            // value={adminInfo.birthday}
            // onChange={change}
          />

          <TextValidator
            required
            label="Confirm password"
            name="password_confirmation"
            className={classNames(classes.textField)}
            type="password"
            margin="normal"
            // value={adminInfo.address}
            // onChange={change}
          />

          <div className={classes.buttonWrapper}>
            <FormControl className={classes.buttons}>
              <Button 
                // onClick={editToggle}
                color="primary">
                Cancel
              </Button>
              <Button
                // onClick={this.props.handleEdit}
                // disabled={!disableAddButton}
                className={classes.submitBtn} variant="contained" type="submit" color="primary">
                Update
              </Button>
            </FormControl>
          </div>
        </ValidatorForm>
      </Paper>
    );
  }
};

export default connect(null, null)(withStyles(styles, { withTheme: true })(UpdatePassword));
