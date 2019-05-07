import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';

import * as actions from '../../../store/actions/index';

import UpdateStatus from './UpdateStatus/UpdateStatus';
import Detail from './Detail/Detail';

import styles from './Styles';

class DetailContract extends React.Component {

  componentWillMount = () => {
    console.log('idadsfad', this.props.detailContract);
  }
  
  componentDidMount = () => {
    this.props.onShowContract(this.props.match.params.id);
  }

  render() {
    const { classes } = this.props;
    
    const updateStatus = this.props.detailContract ? 
      <UpdateStatus
        idContract={this.props.match.params.id}
        status={this.props.detailContract.status}
      />
      : null;

    const detail = this.props.detailContract ?
      <Detail 
        detailContract={this.props.detailContract}
      />
      : null;

    return (
      <div className={classes.root}>
        {updateStatus}
        {detail}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  detailContract: state.contracts.detailContract,
});

const mapDispatchToProps = dispatch => ({
  onShowContract: (id) => dispatch(actions.showContract(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(DetailContract)));
