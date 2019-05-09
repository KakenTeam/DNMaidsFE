import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './Styles';
import FeedbackTable from './FeedbackTable/FeedbackTable';



class FeedbackContainer extends Component {
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
          List Feedback
          <FeedbackTable />
        </Paper>
      </div>
    );
  }
}

export default withRouter(connect(null, null)(withStyles(styles, { withTheme: true })(FeedbackContainer)));
