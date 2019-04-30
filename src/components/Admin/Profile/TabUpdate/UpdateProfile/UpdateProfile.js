import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import styles from './Styles';

class UpdateProfile extends React.Component {

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
            label="Name"
            name="name"
            className={classes.textField}
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
            type="text"
            fullWidth
            // value={adminInfo.name}
            // onChange={change}
          />

          <TextValidator
            required
            label="Birthday"
            name="birthday"
            className={classes.textField}
            type="date"
            margin="normal"
            // value={adminInfo.birthday}
            // onChange={change}
          />

          <TextValidator
            required
            label="Address"
            name="address"
            className={classNames(classes.textField)}
            type="text"
            margin="normal"
            // value={adminInfo.address}
            // onChange={change}
          />

          <TextValidator
            required
            label="Phone"
            name="phone"
            className={classes.textField}
            type="number"
            margin="normal"
            // value={adminInfo.phone}
            // onChange={change}
          />

          <TextValidator
            select
            required
            name="gender"
            label="Gender"
            className={classes.textField}
            SelectProps={{
              native: false,
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
            // value={adminInfo.gender}
            // onChange={change}
            >
            { 
              genderDefault ? 
              genderDefault.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                  </option>
                )) : null 
              }
          </TextValidator>

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

export default connect(null, null)(withStyles(styles, { withTheme: true })(UpdateProfile));
