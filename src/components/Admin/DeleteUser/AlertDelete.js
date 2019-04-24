import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import * as actions from '../../../store/actions/index';

class AlertDelete extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: !this.state.open });
  };
  
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };
  
  deleteHandle = (id) => {
    this.handleClose();
    this.props.onDelete(id);
    this.props.onRemmoveSelected();
  }

  render() {
    const { id } = this.props;
    return (
      <div>
        <Tooltip title="Delete" placement="left">
          <IconButton aria-label="Delete" color="secondary" onClick={this.handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.deleteHandle(id)} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(actions.deleteUser(id)),
  onRemmoveSelected: () => dispatch(actions.removeSelected()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlertDelete));