import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import * as actions from '../../../store/actions/index';
import TableHeadContract from './TableHeadContract/TableHeadContract';

import styles from './Styles';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class TableContracts extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    idSelected: null,
    page: 0,
    rowsPerPage: 10,
  };

  async componentDidMount() {
    await this.props.getContracts();
    // await this.props.getAdmin();
    // await this.props.getSkills();
    // await this.props.getGroups();
    // setTimeout(() => {
    //   this.props.onCloseAlert();
    // }, 0);
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, contracts } = this.props;
    const { order, orderBy, rowsPerPage, page } = this.state;
    const totalContracts = contracts.length;

    return (
      <Paper className={classes.root}>
        {/* <EnhancedTableToolbar
          idSelected={idSelected}
        /> */}
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <TableHeadContract
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={totalContracts}
            />
            <TableBody>
              { contracts ? stableSort(contracts, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(contract => {
                  // const isSelected = this.isSelected(user.id);
                  return (
                    contract.helper ?
                      <TableRow
                        hover
                        // onClick={event => this.handleClick(event, contract.id)}
                        role="checkbox"
                        // aria-checked={isSelected}
                        tabIndex={-1}
                        key={contract.id}
                        // selected={isSelected}
                      >
                        <TableCell padding="dense" component="th" align="right">{contract.id}</TableCell>
                        <TableCell padding="dense" align="right">{contract.customer.name}</TableCell>
                        <TableCell padding="dense" align="right">{contract.helper.name}</TableCell>
                        <TableCell padding="dense" align="right">{contract.created_at}</TableCell>
                        <TableCell padding="dense" align="right">{contract.start_date}</TableCell>
                        <TableCell padding="dense" align="right">{contract.end_date}</TableCell>
                        <TableCell padding="dense" align="right">{contract.fee}</TableCell>
                        <TableCell padding="dense" align="right">{contract.service_type}</TableCell>
                        <TableCell padding="dense" align="right">{contract.status}</TableCell>
                        <TableCell padding="dense" align="right">
                          <Link to={`/admin/contracts/${contract.id}`}>
                            <Button variant="contained" color="primary" className={classes.button}>
                              Chi tiết
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    : null
                  );
                }) : null }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalContracts}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Trang trước',
          }}
          nextIconButtonProps={{
            'aria-label': 'Trang tiếp',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  contracts: state.contracts.contracts,
  // isDeleted: state.admin.isDelete,
});

const mapDispatchToProps = dispatch => ({
  // onCloseAlert: () => dispatch(actions.closeAlert()),
  getContracts: () => dispatch(actions.getContracts()),
  onShowContract: (id) => dispatch(actions.showContract(id)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TableContracts)));