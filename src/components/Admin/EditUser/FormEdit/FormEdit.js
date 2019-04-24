import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import styles from './Styles';

const formEdit = props => {
  const { classes } = props;

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        label="Name"
        name="name"
        className={classes.textField}
        // value={name}
        onChange={props.changeHandler}
        margin="normal"
        type="text"
        fullWidth
      />

      <TextField
        label="Password"
        name="password"
        // value={password}
        onChange={props.changeHandler}
        className={classes.textField}
        margin="normal"
      />

      <TextField
        label="Birthday"
        name="birthday"
        // value={birthday}
        onChange={props.changeHandler}
        className={classes.textField}
        type="date"
        margin="normal"
      />

      <TextField
        label="Phone"
        name="phone"
        // value={phone}
        onChange={props.changeHandler}
        className={classes.textField}
        type="number"
        margin="normal"
      />

      <TextField
        label="Address"
        name="address"
        // value={address}
        // onChange={props.changeHandler}
        className={classes.textField}
        type="text"
        margin="normal"
      />

      <TextField
        select
        name="gender"
        label="Gender"
        className={classes.textField}
        defaultValue='0'
        // value={gender}
        onChange={props.changeHandler}
        SelectProps={{
          native: false,
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {/* { genderDefault ? genderDefault.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        )) : null } */}
      </TextField>

      <TextField
        select
        label="Group"
        name="group"
        className={classes.textField}
        // value={group}
        onChange={props.changeHandler}
        SelectProps={{
          native: false,
          MenuProps: {
            className: classes.menu,
          },
        }}
        margin="normal"
      >
        {/* { groupsDefault ? groupsDefault.map((option, index) => (
          <option key={index} value={option.id}>
            {option.groupName}
          </option>
        )) : null } */}
      </TextField>
    </form>
  );
};

export default withStyles(styles)(formEdit);