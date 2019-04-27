import React from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
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

  componentWillMount() {
    this.initialState = this.state
  }

  changeUserHandleCreate = event => {
    this.setState({
      user: {
        ...this.state.user,
        [event.target.name]: event.target.value,
      }
    }, () => {
      console.log(this.state.user);
    });
  }

  handleClickToggle = () => {
    this.setState((prevState, props) => ({
      open: !prevState.open,
    }), () => {
      console.log('open ---', this.state.open);
      this.props.onToggle(this.state.open);
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleCreateUser = () => {
    this.props.onCreateUser(this.state.user);
    this.handleClickToggle();
    this.setState(this.initialState)
  };

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
    console.log('count--', count);
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.admin.groups,
});

const mapDispatchToProps = dispatch => ({
  onCreateUser: data => dispatch(actions.createUser(data)),
  onToggle: open => dispatch(actions.toggleCreate(open)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(CreateUser)));
