import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';


import styles from './styles';

const formCreate = props => {
  const { classes, email, name, password, confirmPassword, birthday, phone, address, gender, group, genderDefault, groupsDefault } = props;
  console.log('groups--', props.group);
  
  return (
    // <DialogContent>
    //   <DialogContentText>
    //     Add User
    //   </DialogContentText>
      <Paper>
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
            name="password_confirmation"
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
            defaultValue='0'
            value={gender}
            onChange={props.changeHandler}
            SelectProps={{
              native: false,
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            { genderDefault ? genderDefault.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            )) : null }
          </TextField>

          <TextField
            select
            label="Group"
            name="group"
            className={classes.textField}
            value={group}
            onChange={props.changeHandler}
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
          </TextField>

          <div>
            <Button 
              // onClick={this.handleClose}
              color="primary">
              Cancel
            </Button>
            <Button
              // disabled={!this.checkValidForm()}
              // onClick={this.handleCreateUser} 
              color="primary">
              Add
            </Button>
          </div>
        </form>
      </Paper>
    // </DialogContent>
  );
};

export default (withStyles(styles, { withTheme: true })(formCreate));
