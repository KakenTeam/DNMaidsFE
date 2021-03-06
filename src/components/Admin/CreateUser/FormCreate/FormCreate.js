import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import styles from './styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

    const { classes, toggleCreate, user, genderDefault, groupsDefault, skillsDefault, changeHandler } = this.props;
    const role = localStorage.getItem('role');
    return (
      <Paper className={toggleCreate ? classes.createForm : ''}>
        <ValidatorForm
          onSubmit={this.props.handleCreateUser}
          className={classes.container}
          autoComplete="off">
          <TextValidator
            required
            label="Email"
            name="email"
            className={classes.textField}
            onChange={changeHandler}
            value={user.email}
            validators={['required', 'isEmail']}
            errorMessages={['this field is required', 'email is not valid']}
            margin="normal"
          />
          <TextValidator
            required
            label="Tên"
            name="name"
            className={classes.textField}
            onChange={changeHandler}
            value={user.name}
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
            onChange={changeHandler}
            name="password"
            type="password"
            value={user.password}
            validators={['required']}
            errorMessages={['this field is required']}
          />

          <TextValidator
            required
            label="Xác nhận mật khẩu"
            margin="normal"
            className={classes.textField}
            onChange={changeHandler}
            value={user.confirmPassword}
            name="password_confirmation"
            type="password"
            validators={['isPasswordMatch', 'required']}
            errorMessages={['password mismatch', 'this field is required']}
          />

          <TextValidator
            required
            label="Ngày sinh"
            name="birthday"
            value={user.birthday}
            onChange={changeHandler}
            className={classes.textField}
            type="date"
            margin="normal"
          />
          <div>
            <TextValidator
              required
              label="Số điện thoại"
              name="phone"
              value={user.phone}
              onChange={changeHandler}
              className={classes.textField}
              type="number"
              margin="normal"
            />
          </div>

          <TextValidator
            required
            label="Địa chỉ"
            name="address"
            value={user.address}
            onChange={changeHandler}
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
            defaultValue=''
            value={user.gender}
            onChange={changeHandler}
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
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              )) : null 
            }
          </TextValidator>

          { role === '0' ? 
            <TextValidator
              required
              select
              disabled={user.role === 1}
              label="Nhóm"
              name="group"
              className={classes.textField}
              value={user.group}
              onChange={changeHandler}
              SelectProps={{
                native: false,
                MenuProps: {
                  className: classes.menu,
                },
              }}
              margin="normal"
            >
              { groupsDefault ? groupsDefault.map((option, index) => (
                <MenuItem key={index} value={option.id}>
                  {option.groupName}
                </MenuItem>
              )) : null }
            </TextValidator>
            : null
          }
          
          {
            role === '1' ? 
              <FormControl className={classes.formControl} disabled={user.role === 0}>
                <InputLabel htmlFor="select-multiple-chip">Kỹ năng</InputLabel>
                <Select
                  label="Kỹ năng"
                  multiple
                  name="skill"
                  value={user.skill}
                  onChange={changeHandler}
                  input={<Input id="select-multiple-chip" />}
                  renderValue={selected => (
                    <div className={classes.chips}>
                      {selected.map(value => (
                        <Chip key={value} label={value} className={classes.chip} />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
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
          <Divider />

          <div className={classes.buttonWrapper}>
            <FormControl className={classes.buttons}>
              <Button onClick={this.props.toggle} color="primary">
                Hủy
              </Button>
              <Button
                onClick={this.props.handleCreateUser}
                // disabled={!disableAddButton}
                className={classes.submitBtn} variant="contained" type="submit" color="primary">
                Thêm
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
