import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import * as actions from '../../../store/actions/index';
import Profile from './Profile/Profile';
import UpdateProfile from './TabUpdate/UpdateProfile/UpdateProfile';
import TabUpdate from './TabUpdate/TabUpdate';

import styles from './Styles';

class ProfileContainer extends Component {

  state = {
    dataProfile: {
      name: null,
      birthday: null,
      address: null,
      phone: null,
      gender: '',
      image: null,
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
    isToggleProfile: false,
  }

  handleToggleUpdateProfile = () => {
    this.setState(prevState => ({
      isToggleProfile: !prevState.isToggleProfile,
    }), () => {
      console.log('toggle profile', this.state.isToggleProfile);
    });
  }

  changeHandler = event => {
    this.setState({
      dataProfile: {
        ...this.state.dataProfile,
        [event.target.name]: event.target.value,
      }
    }, () => {
      console.log(this.state.dataProfile);
    });
  }

  render() {
    const { classes, admin } = this.props;
    return (
      <div className={classes.profile}>
        { admin ? 
            <Profile
              adminInfo={admin}
            />
          : null
        }
        <div className={classes.updateProfileBtn}>
          {/* <Button variant="contained" color="primary" className={classes.button} onClick={this.handleToggleUpdateProfile}>
            Update Profile
          </Button> */}
          <TabUpdate />
          {/* {
            this.state.isToggleProfile ?
              <UpdateProfile
                adminInfo={admin}
                genderDefault={this.state.genderDefault}
                change={this.changeHandler}
              />
            : null
          } */}
        </div>
        {/* <div className={classes.updatePasswordBtn}>
          <Button variant="contained" color="primary" className={classes.button}>
            Update Password
          </Button>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  admin: state.auth.adminInfo,
});

const mapDispatchToProps = dispatch => ({
  onGetAdmin: () => dispatch(actions.getAdmin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileContainer));
