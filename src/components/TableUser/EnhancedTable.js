import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

import * as actions from '../../store/actions/index';
import EnhancedTableHead from './TableHead/TableHead';
import EnhancedTableToolbar from './TableToolbar/TableToolbar';

import styles from './Style';

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

class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
    idSelected: null,
    page: 0,
    rowsPerPage: 5,
  };

  async componentDidMount() {
    await this.props.getUsers(this.props.role);
    await this.props.getAdmin();
    await this.props.getSkills();
    await this.props.getGroups();
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.getUsers(this.props.role);
    }
  }

  setSelected = () => {
    this.setState({ selected: [] });
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: this.props.users.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
      
    this.setState({ 
      selected: newSelected, 
      idSelected: id,

    });

    if (event.target.checked) {
      this.props.onAddSelected();
    } else {
      this.props.onRemmoveSelected();
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes, users, role } = this.props;
    const { order, orderBy, idSelected, rowsPerPage, page } = this.state;
    const totalUsers = this.props.users.length;


    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar
          idSelected={idSelected}
          role={role}
        />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={totalUsers}
            />
            <TableBody>
              { users ? stableSort(users, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(user => {
                  let isSelected = this.isSelected(user.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, user.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={user.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </TableCell>
                      <TableCell padding="dense" component="th" align="right">{user.id}</TableCell>
                      <TableCell padding="dense" align="right">{user.email}</TableCell>
                      <TableCell padding="dense" align="right">{user.name}</TableCell>
                      <TableCell padding="dense" align="right">{user.phone}</TableCell>
                      <TableCell padding="dense" align="right">{user.address}</TableCell>
                      <TableCell padding="dense" align="right">{user.gender}</TableCell>
                      <TableCell padding="dense" align="right">{user.birthday}</TableCell>
                      {/* <TableCell padding="dense" align="right">{user.permission[0]}</TableCell> */}
                    </TableRow>
                  );
                }) : null }
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalUsers}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin.users,
  isDeleted: state.admin.isDelete,
  isEdited: state.admin.isEdit,
});

const mapDispatchToProps = dispatch => ({
  getUsers: (role) => dispatch(actions.getUsers(role)),
  getAdmin: () => dispatch(actions.getAdmin()),
  getGroups: () => dispatch(actions.getGroups()),
  getSkills: () => dispatch(actions.getSkills()),
  onAddSelected: () => dispatch(actions.addSelected()),
  onRemmoveSelected: () => dispatch(actions.removeSelected()),
  onCloseAlert: () => dispatch(actions.closeAlert()),
});

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable)));