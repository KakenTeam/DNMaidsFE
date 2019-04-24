import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';

const rows = [
  { id: 'order', numeric: false, label: 'Order' },
  { id: 'email', numeric: false, label: 'Email' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'phone', numeric: true, label: 'Phone number' },
  { id: 'address', numeric: false, label: 'Address' },
  { id: 'gender', numeric: true, label: 'Gender' },
  { id: 'birthday', numeric: true, label: 'Birthday' },
  { id: 'permission', numeric: true, label: 'Permission' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    const users = rows.map(row => (
      <TableCell
        key={row.id}
        // align={row.numeric ? 'right' : 'left'}
        align={'right'}
        padding={'default'}
        sortDirection={orderBy === row.id ? order : false}
      >
        <Tooltip
          title="Sort"
          placement={row.numeric ? 'bottom-end' : 'bottom-start'}
          enterDelay={300}
        >
          <TableSortLabel
            active={orderBy === row.id}
            direction={order}
            onClick={this.createSortHandler(row.id)}
          >
            {row.label}
          </TableSortLabel>
        </Tooltip>
      </TableCell>
    ), this);

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
            {users}
        </TableRow>
      </TableHead>
    );
  }
}

const mapStateToProps = state => ({
  numSelected: state.admin.numSelected,
});

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(EnhancedTableHead);