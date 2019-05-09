import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import * as actions from '../../../store/actions/index';
import styles from './Styles';
import { helpers } from '../../../shared/utility';

class FeedbackTable extends React.Component {
  async componentDidMount() {
    await this.props.getFeedbacks();
  }

  render() {
    const { classes, feedbacks } = this.props;

    return (
      
      <div>
        Thuan
      </div>
    )
  }
}

const mapStateToProps = state => ({
  feedbacks: state.feedbacks.feedbacks,
});

const mapDispatchToProps = dispatch => ({
  getFeedbacks: () => dispatch(actions.getFeedbacks()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FeedbackTable)));