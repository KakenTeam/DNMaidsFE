import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';


class EditUser extends Component {
  render() {
    return (
      <Tooltip title="Edit" placement="left">
        <IconButton aria-label="Edit">
          <EditIcon />
        </IconButton>
      </Tooltip>
    );
  }
};

export default (EditUser);
