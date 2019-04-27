import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


import styles from './styles';

class FormCreate extends React.Component {

  componentDidMount = () => {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      const { formData } = this.state;
      if (value !== formData.password) {
        return false;
      }
      return true;
    });
  }

  render() {

    const { classes, toggleCreate, user, genderDefault, groupsDefault, disableAddButton } = this.props;
    console.log('check--', disableAddButton);
    return (
      <Paper className={toggleCreate ? classes.editForm : ''}>
        <ValidatorForm
          className={classes.container}
          autoComplete="off">
          <TextValidator
            required
            label="Email"
            name="email"
            className={classes.textField}
            onChange={this.props.changeHandler}
            value={user.email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            margin="normal"
          />
          <TextValidator
            required
            label="Name"
            name="name"
            className={classes.textField}
            onChange={this.props.changeHandler}
            value={user.name}
            validators={['required']}
            errorMessages={['this field is required']}
            margin="normal"
            type="text"
            fullWidth
          />

          <TextValidator
            required
            label="Password"
            className={classes.textField}
            margin="normal"
            onChange={this.props.changeHandler}
            name="password"
            type="password"
            value={user.password}
            validators={['required']}
            errorMessages={['this field is required']}
          />

          <TextValidator
            required
            label="Confirm password"
            margin="normal"
            className={classes.textField}
            onChange={this.props.changeHandler}
            value={user.confirmPassword}
            name="password_confirmation"
            type="password"
            validators={['isPasswordMatch', 'required']}
            errorMessages={['password mismatch', 'this field is required']}
          />

          <TextValidator
            required
            label="Birthday"
            name="birthday"
            value={user.birthday}
            onChange={this.props.changeHandler}
            className={classes.textField}
            type="date"
            margin="normal"
          />
          <div>
            <TextValidator
              required
              label="Phone"
              name="phone"
              value={user.phone}
              onChange={this.props.changeHandler}
              className={classes.textField}
              type="number"
              margin="normal"
            />
          </div>

          <TextValidator
            required
            label="Address"
            name="address"
            value={user.address}
            onChange={this.props.changeHandler}
            className={classNames(classes.textField)}
            type="text"
            margin="normal"
          />

          <TextValidator
            select
            required
            name="gender"
            label="Gender"
            className={classes.textField}
            defaultValue=''
            value={user.gender}
            onChange={this.props.changeHandler}
            SelectProps={{
              native: false,
              MenuProps: {
                  className: classes.menu,
              },
            }}
            margin="normal"
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

          <TextValidator
            required
            select
            label="Group"
            name="group"
            className={classes.textField}
            defaultValue=''
            value={user.group}
            onChange={this.props.changeHandler}
            SelectProps={{
              native: false,
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            { groupsDefault ? groupsDefault.map((option, index) => (
              <option key={index} value={option.id}>
                {option.groupName}
              </option>
            )) : null }
          </TextValidator>
            
          <Divider />

          <div className={classes.buttonWrapper}>
            <FormControl className={classes.buttons}>
              <Button onClick={this.props.toggle} color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.props.handleCreateUser}
                disabled={!disableAddButton}
                className={classes.submitBtn} variant="contained" type="submit" color="primary">
                Add
              </Button>
            </FormControl>
          </div>
        </ValidatorForm>
      </Paper>
    );
  }
};

const mapStateToProps = state => ({
  toggleCreate: state.admin.toggleCreate,
});


export default connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(FormCreate));
