import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';

import CreateUser from '../../Admin/CreateUser/CreateUser';
import EnhancedTable from '../../TableUser/EnhancedTable';

import styles from './Styles';

const queryString = require('query-string');

class Users extends Component {
  state = {
		open: false,
		anchorEl: null,
		openEdit: false,
  };

  render() {
    const { classes, toggleCreate, toggleEdit } = this.props;

    const parsed = queryString.parse(this.props.location.search);
    let nameButton = 'Thêm người dùng';
    if (parsed.role === '1') {
      nameButton = 'Thêm người giúp việc';
    } else if (parsed.role === '2') {
      nameButton = 'Thêm khách hàng';
    }

    return (
      <div>
        <div>
          <CreateUser
            nameButton={nameButton}
            open={this.state.open}
          />
        </div>
        <Paper className={toggleCreate || toggleEdit ? classes.tableWrapperEdit : classes.tableWrapper}>
          <EnhancedTable
            role={parsed.role}
            paramsRole={parsed}
          />
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	toggleCreate: state.admin.toggleCreate,
	isShow: state.admin.isShow,
	toggleEdit: state.admin.toggleEdit,
	isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(Users)));
