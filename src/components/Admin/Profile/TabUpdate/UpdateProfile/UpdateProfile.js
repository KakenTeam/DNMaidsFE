import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import styles from './Styles';

const updateProfile = props => {

  const { classes, genderDefault, change, dataProfile, updateHandle } = props;
  console.log('data profile--', dataProfile);
  
  return (
    <Paper className={classes.root}>
      <ValidatorForm
        // onSubmit={this.props.handleEdit}
        className={classes.container}
        autoComplete="off">
        <TextValidator
          required
          label="Tên"
          name="name"
          className={classes.textField}
          validators={['required']}
          errorMessages={['this field is required']}
          margin="normal"
          type="text"
          fullWidth
          value={dataProfile.name}
          onChange={change}
        />

        <TextValidator
          required
          label="Ngày sinh"
          name="birthday"
          className={classes.textField}
          type="date"
          margin="normal"
          value={dataProfile.birthday}
          onChange={change}
        />

        <TextValidator
          required
          label="Địa chỉ"
          name="address"
          className={classNames(classes.textField)}
          type="text"
          margin="normal"
          value={dataProfile.address}
          onChange={change}
        />

        <TextValidator
          required
          label="Số điện thoại"
          name="phone"
          className={classes.textField}
          type="number"
          margin="normal"
          value={dataProfile.phone}
          onChange={change}
        />

        <TextValidator
          select
          required
          label="Giới tính"
          name="gender"
          className={classes.textField}
          SelectProps={{
            native: false,
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
          value={dataProfile.gender}
          onChange={change}
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

        {/* <div className={classes.uploadFile}>
          <input
            accept="image/*"
            className={classes.input}
            id="contained-button-file"
            multiple
            type="file"
            name="image"
            // value={dataProfile.image}
          />
          <label htmlFor="contained-button-file">
            <Button variant="contained" component="span" className={classes.button}>
              Choose avatar
            </Button>
          </label>
        </div> */}

        <div className={classes.buttonWrapper}>
          <FormControl className={classes.buttons}>
            <Button
              onClick={updateHandle}
              className={classes.submitBtn} variant="contained" type="submit" color="primary">
              Cập nhật
            </Button>
          </FormControl>
        </div>
      </ValidatorForm>
    </Paper>
  );
};

export default (withStyles(styles, { withTheme: true })(updateProfile));
