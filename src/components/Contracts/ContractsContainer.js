import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TableContracts from './TableContracts/TableContracts';
import DetailContract from './DetailContract/DetailContract';

import styles from './Styles';

class ContractsContainer extends Component {
  state = {
		open: false,
		anchorEl: null,
		openEdit: false,
  };
  
  render() {
    const { classes, toggleCreate, toggleEdit } = this.props;
    return (
      <div>
        <Paper
          // className={toggleCreate || toggleEdit ? classes.tableWrapperEdit : classes.tableWrapper}
        >
          <TableContracts />
        </Paper>
        {/* <Paper>
          <DetailContract />
        </Paper> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
	// toggleCreate: state.admin.toggleCreate,
	// isShow: state.admin.isShow,
	// toggleEdit: state.admin.toggleEdit,
	// isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(connect(mapStateToProps, null)(withStyles(styles, { withTheme: true })(ContractsContainer)));
