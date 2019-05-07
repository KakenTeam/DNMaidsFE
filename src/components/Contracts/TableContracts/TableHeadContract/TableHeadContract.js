import React from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const rows = [
  { id: 'id', numeric: false, label: 'STT' },
  { id: 'customer_id', numeric: false, label: 'Tên khách hàng' },
  { id: 'helper_id', numeric: false, label: 'Tên người giúp việc' },
  { id: 'created_at', numeric: true, label: 'Ngày tạo hợp đồng' },
  { id: 'start_date', numeric: false, label: 'Ngày bắt đầu' },
  { id: 'end_date', numeric: true, label: 'Ngày kết thúc' },
  { id: 'fee', numeric: true, label: 'Giá tiền' },
  { id: 'service_type', numeric: true, label: 'Loại hợp đồng' },
  { id: 'status', numeric: true, label: 'Trạng thái' },
  { id: 'actions', numeric: true, label: 'Hành động' },
];

class TableHeadContract extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    const contracts = rows.map(row => (
      <TableCell
        key={row.id}
        // align={row.numeric ? 'right' : 'left'}
        padding="dense"
        align={'right'}
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
          {contracts}
        </TableRow>
      </TableHead>
    );
  }
}

const mapStateToProps = state => ({
  numSelected: state.admin.numSelected,
});

export default connect(mapStateToProps, null)(TableHeadContract);