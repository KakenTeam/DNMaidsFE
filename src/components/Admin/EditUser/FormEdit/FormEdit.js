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
import TextField from '@material-ui/core/TextField';
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

  // componentDidMount = () => {
  //   // custom rule will have name 'isPasswordMatch'
  //   ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
  //     const { formData } = this.state;
  //     if (value !== formData.password) {
  //       return false;
  //     }
  //     return true;
  //   });
  // }
  
  changeEditHandle = event => {
    this.setState({
      editData: {
        ...this.state.editData,
        [event.target.name]: event.target.value,
      }
    });
  }

  handleEditUser = () => {
    // let open = this.props.toggleEdit;
    let temp = this.state.editData;
    let tempGroup = this.state.editData;
    if (!temp.password) {
      delete temp.password;
    }
    if (!tempGroup.group) {
      delete tempGroup.group;
    }

    this.props.onEditUser(this.props.user.id, this.state.editData);
    if (this.props.isEdit) {
      this.props.editToggle();
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
    const role = localStorage.getItem('role');

    return (
      editData ?
        <Paper className={toggleEdit ? classes.editForm : ''}>
          <ValidatorForm
            // onSubmit={this.props.handleEdit}
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

            <TextField
              // required
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

            {role === '0' ?
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
              : null
            }

            {
              role === '1' ?
                (
                  editData.skill ?
                    <FormControl className={classes.formControl} 
                      >
                      <InputLabel htmlFor="select-multiple-chip">Kỹ năng</InputLabel>
                      <Select
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
                        { skillsDefault ? skillsDefault.map((skill, index) => (
                          <MenuItem key={skill.id} value={skill.id}>
                            <Chip key={skill.id} label={`${index}: ${skill.name}`} className={classes.chip} />
                          </MenuItem>
                        )) : null }
                      </Select>
                    </FormControl>
                  : null
                )
              : null
            }


            <div className={classes.buttonWrapper}>
              <FormControl className={classes.buttons}>
                <Button onClick={editToggle} color="primary">
                  Hủy
                </Button>
                <Button
                  onClick={this.handleEditUser}
                  className={classes.submitBtn} variant="contained" type="submit" color="primary">
                  Sửa
                </Button>
              </FormControl>
            </div>
          </ValidatorForm>
        </Paper>
      : null
    );
  }
};

const mapStateToProps = state => ({
  toggleCreate: state.admin.toggleCreate,
  openEdit: state.admin.openEdit,
  toggleEdit: state.admin.toggleEdit,
  isEdited: state.admin.isEdit,
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
