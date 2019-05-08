import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import * as actions from '../../../../../store/actions/index';
import TableHelpersHead from './TableHelpersHead/TableHelpersHead';

import styles from './Styles';
class TableHelpers extends React.Component {

  updateHelperHandle = (idHelper) => {
    this.props.updateHelper(this.props.idContract, idHelper);
    setTimeout(() => {
      this.props.closeAlert();
    }, 3000);
  }

  render() {
    const { classes, helpers } = this.props;

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <h2>Danh sách người giúp việc</h2>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHelpersHead
            />
            <TableBody>
              { helpers ? 
                helpers.map(helper => {
                  return (
                    <TableRow
                      hover
                      key={helper.id}
                    >
                      <TableCell padding="dense" component="th" align="right">{helper.id}</TableCell>
                      <TableCell padding="dense" align="right">{helper.name}</TableCell>
                      <TableCell padding="dense" align="right">{helper.email}</TableCell>
                      <TableCell padding="dense" align="right">{helper.phone}</TableCell>
                      <TableCell padding="dense" align="right">{helper.address}</TableCell>
                      <TableCell padding="dense" align="right">{helper.gender}</TableCell>
                      <TableCell padding="dense" align="right">
                        <Button onClick={() => this.updateHelperHandle(helper.id)} variant="contained" color="primary" className={classes.button}>
                          Thêm
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                }) : null }
            </TableBody>
          </Table>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  helpers: state.contracts.helpersContract,
});

const mapDispatchToProps = dispatch => ({
  updateHelper: (idContract, idHelper) => dispatch(actions.updateHelper(idContract, idHelper)),
  closeAlert: () => dispatch(actions.closeAlertUpdateHelper()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableHelpers)));