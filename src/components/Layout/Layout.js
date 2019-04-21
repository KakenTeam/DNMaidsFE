import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as actions from '../../store/actions/index';

import Aside from './Aside/Aside';

import styles from './Layout.module.css';

class Layout extends Component {

  render() {
    return (
      <div className={styles.LayoutContent}>
        <Aside />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	getUsers: () => dispatch(actions.getUsers()),
});

export default withRouter(connect(null, mapDispatchToProps)(Layout));
