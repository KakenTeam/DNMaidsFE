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
    
    return (
      <div className={classes.root}>
        <UpdateStatus
          idContract={this.props.match.params.id}
          status={this.props.detailContract.status}
        />
        <Detail 
          detailContract={this.props.detailContract}
        />
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
