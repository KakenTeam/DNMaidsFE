import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import * as actions from '../../../../store/actions/index';

import styles from './Styles';

class FormEdit extends React.Component {

  state = {
    editData: {
      name: this.props.user.name,
      password: null,
      birthday: this.props.user.birthday,
      phone: this.props.user.phone,
      address: this.props.user.address,
      gender: this.props.user.gender,
      group: null,
    },
    isEdit: false,
  }

  componentDidMount = () => {
    console.log('data edit dfaallkjj', this.props.user);

    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      const { formData } = this.state;
      if (value !== formData.password) {
        return false;
      }
      return true;
    });

  }
  
  changeEditHandle = event => {
    this.setState({
      editData: {
        ...this.state.editData,
        [event.target.name]: event.target.value,
      }
    }, () => {
      console.log('change edit data', this.state.editData);
    });
  }

  handleEditUser = () => {
    let open = this.props.toggleEdit;
    this.props.onEditUser(this.props.user.id, this.state.editData);
    this.props.onToggleEdit(!open);
    this.props.getUsers();
    this.props.onRemmoveSelected();
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 3000);
  }

  render() {

    const { classes, toggleEdit, user, genderDefault, groupsDefault, changeHandler, editToggle} = this.props;
    const { editData } = this.state;
    return (
      <Paper className={toggleEdit ? classes.editForm : ''}>
        <ValidatorForm
          onSubmit={this.props.handleEdit}
          className={classes.container}
          autoComplete="off">
          <TextValidator
            required
            label="Name"
            name="name"
            className={classes.textField}
            onChange={this.changeEditHandle}
            value={editData.name}
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
            onChange={this.changeEditHandle}
            name="password"
            type="password"
            value={editData.password}
            validators={['required']}
            errorMessages={['this field is required']}
          />

          <TextValidator
            required
            label="Birthday"
            name="birthday"
            value={editData.birthday}
            onChange={this.changeEditHandle}
            defaultValue={editData.birthday}
            className={classes.textField}
            type="date"
            margin="normal"
          />
          <div>
            <TextValidator
              required
              label="Phone"
              name="phone"
              value={editData.phone}
              onChange={this.changeEditHandle}
              defaultValue={editData.phone}
              className={classes.textField}
              type="number"
              margin="normal"
            />
          </div>

          <TextValidator
            required
            label="Address"
            name="address"
            value={editData.address}
            onChange={this.changeEditHandle}
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
            value={editData.gender}
            onChange={this.changeEditHandle}
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
            value={editData.group}
            onChange={this.changeEditHandle}
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

          <div className={classes.buttonWrapper}>
            <FormControl className={classes.buttons}>
              <Button onClick={editToggle} color="primary">
                Cancel
              </Button>
              <Button
                onClick={this.handleEditUser}
                // disabled={!disableAddButton}
                className={classes.submitBtn} variant="contained" type="submit" color="primary">
                Edit
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
  openEdit: state.admin.openEdit,
  toggleEdit: state.admin.toggleEdit,
  // showUser: state.admin.user,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actions.getUsers()),
  onEditUser: (id, data) => dispatch(actions.editUser(id, data)),
  onToggle: open => dispatch(actions.toggleCreate(open)),
  onToggleEdit: open => dispatch(actions.toggleEdit(open)),
  onRemmoveSelected: () => dispatch(actions.removeSelected()),
  onCloseAlert: () => dispatch(actions.closeAlert()),
  onShowUser: (id) => dispatch(actions.showUser(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(FormEdit));
