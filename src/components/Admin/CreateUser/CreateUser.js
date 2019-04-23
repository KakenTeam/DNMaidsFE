import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';

import cssStyles from './CreateUser.module.css';
import styles from './Styles';
import FormCreate from './FormCreate/FormCreate';

import * as actions from '../../../store/actions/index';

class CreateUser extends React.Component {
  state = {
    open: false,
    user: {
      email: null,
      name: null,
      password: null,
      password_confirmation: null,
      birthday: null,
      phone: null,
      address: null,
      gender: '',
      group: '',
    },
    genderDefault: [
      {
        label: 'men',
        value: '0',
      },
      {
        label: 'women',
        value: '1',
      },
    ],
    groupsDefault: [
      {
        id: null,
        groupName: null,
      }
    ]
  };

  componentDidMount = () => {
  }

  changeUserHandleCreate = event => {
    if (event.target.value) {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value,
        }
      });
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleCreateUser = () => {
    this.setState({ open: false });
    this.props.onCreateUser(this.state.user);
  };

  checkValidForm = () => {
    const valueUser = Object.values(this.state.user);

    let checkUser = valueUser.filter(value => {
      return !value;
    });
    return checkUser.length === 0;
    // return true if form valid 
  }

  render() {
    const { nameButton, classes, groups }  = this.props;

    const groupsSelect = groups.map(option => {
      return {
        id: option.id,
        groupName: option.group_name,
      }
    });

    return (
      <div className={cssStyles.AddButton}>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          {nameButton}
          <AddIcon className={classes.rightIcon} />
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <FormCreate
            gender={this.state.user.gender}
            genderDefault={this.state.genderDefault}
            changeHandler={this.changeUserHandleCreate}
            group={this.state.user.group}
            groupsDefault={groupsSelect}
          />
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button
              disabled={!this.checkValidForm()}
              onClick={this.handleCreateUser} 
              color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.admin.groups,
});

const mapDispatchToProps = dispatch => ({
  onCreateUser: data => dispatch(actions.createUser(data)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(CreateUser)));
