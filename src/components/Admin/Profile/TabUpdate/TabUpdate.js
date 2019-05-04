import React from 'react';
import { connect } from 'react-redux';

import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from './TabContainer/TabContainer';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import UpdatePassword from './UpdataPassword/UpdatePassword';

import * as actions from '../../../../store/actions/index';

import styles from './Styles';

class ScrollableTabsButtonPrevent extends React.Component {
  state = {
    value: 0,
    dataProfile: {
      name: null,
      birthday: null,
      address: null,
      phone: null,
      gender: null,
      image: null,
    },
    passwordData: {
      old_password: null,
      password: null,
      password_confirmation: null,
    },
    genderDefault: [
      {
        label: 'men',
        value: '1',
      },
      {
        label: 'women',
        value: '0',
      },
    ],  
  };

  componentWillMount = () => {
    console.log('admindsfadsfa', this.props.adminInfo);
    this.setState({
      dataProfile: {
        name: this.props.adminInfo.name,
        birthday: this.props.adminInfo.birthday,
        address: this.props.adminInfo.address,
        phone: this.props.adminInfo.phone,
        gender: this.props.adminInfo.gender,
        image: this.props.adminInfo.image,
      },
    });
  }

  componentDidUpdate() {
    const { notification, variant } = this.props;
    console.log(notification, variant);
    if (notification) {
      this.props.enqueueSnackbar(notification, {variant: variant});
    }
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  changeHandler = event => {
    this.setState({
      dataProfile: {
        ...this.state.dataProfile,
        [event.target.name]: event.target.value,
      },
      passwordData: {
        ...this.state.passwordData,
        [event.target.name]: event.target.value,
      }
    });
  }

  updateProfileHandle = async () => {
    await this.props.onUpdateProfile(this.state.dataProfile);
    setTimeout(() => {
      this.props.onCloseAuthAlert();
    }, 3000);
  }
  
  updatePasswordHandle = async () => {
    await this.props.onUpdatePassword(this.state.passwordData);
    setTimeout(() => {
      this.props.onCloseAuthAlert();
    }, 3000);
  }

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} variant="scrollable" scrollButtons="off">
            <Tab label="Update profile" />
            <Tab label="Update password" />
          </Tabs>
        </AppBar>
        {value === 0 && 
          <TabContainer>
            {
              this.state.dataProfile ?
                <UpdateProfile
                  dataProfile={this.state.dataProfile}
                  genderDefault={this.state.genderDefault}
                  change={this.changeHandler}
                  updateHandle={this.updateProfileHandle}
                />
              : null
            }
          </TabContainer>
        }
        {value === 1 && 
          <TabContainer>
            <UpdatePassword
              passwordData={this.state.passwordData}
              change={this.changeHandler}
              handlePassword={this.updatePasswordHandle}
            />
          </TabContainer>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.auth.notifications,
  variant: state.auth.variant,
});

const mapDispatchToProps = dispatch => ({
  onGetAdmin: () => dispatch(actions.getAdmin()),
  onUpdateProfile: data => dispatch(actions.updateProfileAdmin(data)),
  onUpdatePassword: data => dispatch(actions.updatePasswordAdmin(data)),
  onCloseAuthAlert: () => dispatch(actions.closeAuthAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withSnackbar(ScrollableTabsButtonPrevent)));
