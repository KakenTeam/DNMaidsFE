import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import * as actions from '../../store/actions/index';

import Aside from './Aside/Aside';

import styles from './Layout.module.css';

class Layout extends Component {

  componentWillMount() {
    // this.props.onGetAdmin();
  }

  render() {
    return (
      <div>
        <Aside />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(actions.getUsers()),
  onGetAdmin: () => dispatch(actions.getAdmin()),
});

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Layout)));
