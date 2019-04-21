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

class CreateUser extends React.Component {
  state = {
    open: false,
    user: {
      email: null,
      name: null,
      password: null,
      confirmPassword: null,
      birthday: null,
      phone: null,
      address: null,
      gender: null,
      group: null,
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
    // console.log('groups--', groupsSelect);

  }

  changeUserHandleCreate = event => {
    if (event.target.value) {
      this.setState({
        user: {
          ...this.state.user,
          [event.target.name]: event.target.value,
        }
      }, () => console.log(this.state.user));
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { nameButton, classes, groups }  = this.props;

    const groupsSelect = groups.map(option => {
      return [
        {
          id: option.id,
          groupName: option.group_name,
        },
      ];
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
            <Button onClick={this.handleClose} color="primary">
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

export default withRouter(connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(CreateUser)));
