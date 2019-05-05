import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
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
      skill: this.props.valueSkills,
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
    if (this.props.isEdit) {
      this.props.onToggleEdit(!open);
    }
    this.props.getUsers();
    this.props.onRemmoveSelected();
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 3000);
  }

  render() {

    const { classes, toggleEdit, genderDefault, groupsDefault, skillsDefault, editToggle} = this.props;
    const { editData } = this.state;

    console.log('user slikkfds', this.props.user);

    return (
      <Paper className={toggleEdit ? classes.editForm : ''}>
        <ValidatorForm
          onSubmit={this.props.handleEdit}
          className={classes.container}
          autoComplete="off">
          <TextValidator
            required
            label="Tên"
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
            label="Mật khẩu"
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
            label="Ngày sinh"
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
              label="Số điện thoại"
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
            label="Địa chỉ"
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
            label="Giới tính"
            name="gender"
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
            label="Nhóm"
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

          {
            editData.skill ?
              <FormControl className={classes.formControl} 
                // disabled={user.role === 0 || !user.role}
                >
                <InputLabel htmlFor="select-multiple-chip">Kỹ năng</InputLabel>
                <Select
                  // select
                  // label="Kỹ năng"
                  multiple
                  name="skill"
                  value={editData.skill ? editData.skill : null}
                  onChange={this.changeEditHandle}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                >
                  { skillsDefault ? skillsDefault.map(skill => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {/* {skill.name} */}
                      <Chip key={skill.id} label={skill.name} className={classes.chip} />
                    </MenuItem>
                  )) : null }
                </Select>
              </FormControl>
            : null
          }

          <div className={classes.buttonWrapper}>
            <FormControl className={classes.buttons}>
              <Button onClick={editToggle} color="primary">
                Hủy
              </Button>
              <Button
                onClick={this.handleEditUser}
                // disabled={!disableAddButton}
                className={classes.submitBtn} variant="contained" type="submit" color="primary">
                Sửa
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
  isEdit: state.admin.isEdit,
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
