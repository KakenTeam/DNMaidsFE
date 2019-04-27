import React, { Component } from 'react';
import { connect } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import * as actions from '../../../store/actions/index';

class EditUser extends Component {
  state = {
    isEdit: false,
    user: {

    },
  }

  toggleEdit = () => {
    this.props.onShowUser(this.props.id);
  }

  render() {

    return (
      <div>
        <Tooltip title="Edit" placement="left">
          <IconButton aria-label="Edit" onClick={() => this.toggleEdit()}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  onShowUser: id => dispatch(actions.showUser(id)),
});

export default connect(null, mapDispatchToProps)(EditUser);
