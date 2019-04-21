import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import DialogContentText from '@material-ui/core/DialogContentText';

import styles from './styles';

const formCreate = props => {
  const { classes, email, name, password, confirmPassword, birthday, phone, address, gender, group, genderDefault, groupsDefault } = props;
  console.log('groups--', props.group);
  
  return (
    <DialogContent>
      <DialogContentText>
        Add User
      </DialogContentText>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          label="Email"
          name="email"
          className={classes.textField}
          value={email}
          onChange={props.changeHandler}
          margin="normal"
        />
        <TextField
          label="Name"
          name="name"
          className={classes.textField}
          value={name}
          onChange={props.changeHandler}
          margin="normal"
          type="text"
          fullWidth
        />

        <TextField
          label="Password"
          name="password"
          value={password}
          onChange={props.changeHandler}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          label="Confirm password"
          name="comfirmPassword"
          value={confirmPassword}
          onChange={props.changeHandler}
          className={classes.textField}
          margin="normal"
        />

        <TextField
          label="Birthday"
          name="birthday"
          value={birthday}
          onChange={props.changeHandler}
          className={classes.textField}
          type="date"
          margin="normal"
        />

        <TextField
          label="Phone"
          name="phone"
          value={phone}
          onChange={props.changeHandler}
          className={classes.textField}
          type="number"
          margin="normal"
        />

        <TextField
          label="Address"
          name="address"
          value={address}
          onChange={props.changeHandler}
          className={classNames(classes.textField)}
          type="text"
          margin="normal"
        />

        <TextField
          select
          name="gender"
          label="Gender"
          className={classes.textField}
          value={gender}
          onChange={props.changeHandler}
          margin="normal"
        >
          {genderDefault.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Group"
          name="group"
          className={classes.textField}
          value={group}
          onChange={props.changeHandler}
          SelectProps={{
            native: true,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {groupsDefault.map(option => (
            <option key={option.value} value={option.id}>
              {option.groupName}
            </option>
          ))}
        </TextField>
      </form>
    </DialogContent>
  );
};

export default (withStyles(styles, { withTheme: true })(formCreate));
