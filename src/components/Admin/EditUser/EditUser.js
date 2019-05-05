import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';

import styles from './Styles';
import * as actions from '../../../store/actions/index';

class EditUser extends Component {
  
  componentDidMount = () => {
    this.props.onShowUser(this.props.id);
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 1000); 
  }

  toggleEdit = () => {
    let open = this.props.toggleEdit;
    // this.props.onShowUser(this.props.id);
    this.props.onToggleEdit(!open);
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 1000); 
	}

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.editButton}>
        <Tooltip title="Sửa" placement="left">
          <IconButton aria-label="Edit" onClick={() => this.toggleEdit()}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  toggleEdit: state.admin.toggleEdit,
});

const mapDispatchToProps = dispatch => ({
  onShowUser: (id) => dispatch(actions.showUser(id)),
  onToggleEdit: open => dispatch(actions.toggleEdit(open)),
  onCloseAlert: () => dispatch(actions.closeAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(EditUser));
