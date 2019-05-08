import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import * as actions from '../../../store/actions/index';

import UpdateStatus from './UpdateStatus/UpdateStatus';
import Detail from './Detail/Detail';
import AssignHelper from './AssignHelper/AssignHelper';

import styles from './Styles';
import { withSnackbar } from 'notistack';

class DetailContract extends React.Component {
  
  componentWillMount = async () => {
    this.props.onShowContract(this.props.match.params.id);
    this.props.onGetHelpersContract(this.props.match.params.id);
  }
  
  componentDidUpdate = () => {
    const { notification, variant } = this.props;
    
    if (notification) {
      this.props.enqueueSnackbar(notification, {variant: variant});
    }
  }

  render() {
    const { classes } = this.props;
    

    const updateStatus = this.props.detailContract ? 
      <UpdateStatus
        idContract={this.props.match.params.id}
        status={this.props.detailContract.status}
        // id={this.props.match.params.id}
      />
      : null;

    const assignHelper = (
      <AssignHelper
        idContract={this.props.match.params.id}
      />
    );

    const detail = this.props.detailContract ?
      <Detail 
        detailContract={this.props.detailContract}
      />
      : null;

    return (
      <div className={classes.root}>
        <h2>Chi tiết hợp đồng</h2>
        {detail}
        {updateStatus}
        {assignHelper}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  detailContract: state.contracts.detailContract,
  notification: state.contracts.notifications,
  variant: state.contracts.variant,
});

const mapDispatchToProps = dispatch => ({
  onShowContract: (id) => dispatch(actions.showContract(id)),
  onGetHelpersContract: id => dispatch(actions.getHelpersContract(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withSnackbar(DetailContract))));
