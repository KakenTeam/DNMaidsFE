import * as action from '../../../../store/actions';
import Button from '@material-ui/core/Button';
import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import styles from './Styles';
import classNames from 'classnames';

class UpdateStatus extends React.Component {
  state = {
    feedback: this.props.feedback
  }

  updateFeedbackStatusHandle = () => {
    
    this.props.onUpdateStatus(this.props.feedbackId, { status: 'resolved' })
  }

  render() {
    const { classes } = this.props;

    return (
      <Button 
        onClick={this.updateFeedbackStatusHandle}
        variant="contained" size="small" color="primary" className={classNames(classes.margin, classes.bootstrapRoot)}>
        Đã đọc
      </Button>
    )
  }

}


const mapStateToProps = state => ({
  detailContract: state.contracts.detailContract,
});

const mapDispatchToProps = dispatch => ({
  onUpdateStatus: (id, status) => dispatch(action.updateFeedbackStatus(id, status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UpdateStatus));
