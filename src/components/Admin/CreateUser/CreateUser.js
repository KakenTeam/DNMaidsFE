import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import cssStyles from './CreateUser.module.css';
import styles from './Styles';
import FormCreate from './FormCreate/FormCreate';
import FormEdit from '../EditUser/FormEdit/FormEdit';

import * as actions from '../../../store/actions/index';

class CreateUser extends React.Component {
  state = {
    open: false,
    openEditForm: this.props.toggleEdit,
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

  componentWillMount() {
    this.initialState = this.state;
  }

  componentDidUpdate() {
    const { notifications } = this.props;
    notifications.forEach((notification) => {
      this.props.enqueueSnackbar(notification.notification, {variant: notification.variant});
    });
  }

  changeUserHandleCreate = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      }
    });
  }

  handleClickToggle = () => {
    this.setState((prevState, props) => ({
      open: !prevState.open,
    }), () => {
      this.props.onToggle(this.state.open);
    });
  };

  handleEditToggle = () => {
    let open = this.props.toggleEdit;
    this.props.onToggleEdit(!open);
  }

  handleCreateUser = () => {
    this.props.onCreateUser(this.state.user);
    this.handleClickToggle();
    this.setState(this.initialState)
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 3000);
  };
  
  // handleEditUser = () => {
  //   let open = this.props.toggleEdit;
  //   this.props.onEditUser(this.props.showUser.id, this.state.editData);
  //   this.props.onToggleEdit(!open);
  //   this.props.getUsers();
  //   this.props.onRemmoveSelected();
  //   setTimeout(() => {
  //     this.props.onCloseAlert();
  //   }, 3000);
  // }
  
  checkPassword = () => {
    return this.state.user.password === this.state.user.password_confirmation;
  }

  countValidFields = () => {
    let count = 0;
    const valueUser = Object.values(this.state.user);
    valueUser.forEach(element => {
      if (element) {
        count += 1;
      }
    });
    return count === 9;
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
        <Button variant="contained" color="primary" onClick={this.handleClickToggle}>
          {nameButton}
          <AddIcon className={classes.rightIcon} />
        </Button>
        {
          this.state.open ? 
            <FormCreate
              gender={this.state.user.gender}
              genderDefault={this.state.genderDefault}
              changeHandler={this.changeUserHandleCreate}
              user={this.state.user}
              groupsDefault={groupsSelect}
              toggle={this.handleClickToggle}
              handleCreateUser={this.handleCreateUser}
              disableAddButton={this.countValidFields() && this.checkPassword() ? true : false}
            />
          : null
        }
        {
          this.props.toggleEdit ?
            <div>
              <FormEdit
                groupsDefault={groupsSelect}
                genderDefault={this.state.genderDefault}
                // group={this.state.editData.group}
                user={this.props.showUser}
                changeHandler={this.changeEditHandle}
                handleEdit={this.handleEditUser}
                editToggle={this.handleEditToggle}
              />
            </div>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.admin.groups,
  toggleEdit: state.admin.toggleEdit,
  showUser: state.admin.user,
  notifications: state.admin.notifications,
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actions.getUsers()),
  onCreateUser: data => dispatch(actions.createUser(data)),
  onEditUser: (id, data) => dispatch(actions.editUser(id, data)),
  onToggle: open => dispatch(actions.toggleCreate(open)),
  onToggleEdit: open => dispatch(actions.toggleEdit(open)),
  onRemmoveSelected: () => dispatch(actions.removeSelected()),
  onCloseAlert: () => dispatch(actions.closeAlert()),
  onShowUser: (id) => dispatch(actions.showUser(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withSnackbar(CreateUser))));
