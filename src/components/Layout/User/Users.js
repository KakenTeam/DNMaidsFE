import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import CreateUser from '../../Admin/CreateUser/CreateUser';
import EnhancedTable from '../../TableUser/EnhancedTable';

import styles from './Styles';

class Users extends Component {
  state = {
		open: false,
		anchorEl: null,
		openEdit: false,
  };
  
  render() {
    const { classes, toggleCreate, toggleEdit } = this.props;
    return (
      <div>
        <div>
          <CreateUser
            nameButton='Thêm người dùng'
            open={this.state.open}
          />
        </div>
        <Paper className={toggleCreate || toggleEdit ? classes.tableWrapperEdit : classes.tableWrapper}>
          <EnhancedTable />
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
