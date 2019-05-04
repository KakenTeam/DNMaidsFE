import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import * as actions from '../../../store/actions/index';
import Profile from './Profile/Profile';
import TabUpdate from './TabUpdate/TabUpdate';

import styles from './Styles';

class ProfileContainer extends Component {

  state = {
    isToggleProfile: false,
  }

  // handleToggleUpdateProfile = () => {
  //   this.setState(prevState => ({
  //     isToggleProfile: !prevState.isToggleProfile,
  //   }), () => {
  //     console.log('toggle profile', this.state.isToggleProfile);
  //   });
  // }

  // changeHandler = event => {
  //   this.setState({
  //     dataProfile: {
  //       ...this.state.dataProfile,
  //       [event.target.name]: event.target.value,
  //     }
  //   }, () => {
  //     console.log(this.state.dataProfile);
  //   });
  // }

  render() {
    const { classes, admin } = this.props;
    return (
      <div className={classes.profile}>
        { admin ? 
          <div>
            <Profile
              adminInfo={admin}
            />
          </div>
          : null
        }
        <div className={classes.updateProfileBtn}>
          { admin ?
            <div>
              <TabUpdate
                adminInfo={admin}
              />
            </div>
            : null
          }
        </div>
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
