import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import TableContracts from './TableContracts/TableContracts';

import styles from './Styles';

class ContractsContainer extends Component {
  state = {
		open: false,
		anchorEl: null,
		openEdit: false,
  };
  
  render() {
    return (
      <div>
        <Paper
        >
          <TableContracts />
        </Paper>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(withStyles(styles, { withTheme: true })(ContractsContainer)));
