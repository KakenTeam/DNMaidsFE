import React from 'react';
import { connect } from 'react-redux';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const rows = [
  { id: 'id', numeric: false, label: 'id' },
  { id: 'name', numeric: false, label: 'Tên' },
  { id: 'email', numeric: false, label: 'email' },
  { id: 'phone', numeric: true, label: 'Số điện thoại' },
  { id: 'address', numeric: false, label: 'Địa chỉ' },
  { id: 'gender', numeric: true, label: 'Giới tính' },
  { id: 'actions', numeric: true, label: 'Hành động' },
];

const tableHelpersHead = props => {

    const helpers = rows.map(row => (
      <TableCell
        key={row.id}
        // align={row.numeric ? 'right' : 'left'}
        padding="dense"
        align={'right'}
      >
        {row.label}
      </TableCell>
    ), this);

    return (
      <TableHead>
        <TableRow>
          {helpers}
        </TableRow>
      </TableHead>
    );
  }

export default tableHelpersHead;