import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './Styles';

import * as actions from '../../../store/actions/index';

class AlertDelete extends React.Component {
  state = {
    open: this.props.open,
  };

  componentDidMount() {
    const { notifications } = this.props;

    notifications.forEach((notification) => {
      this.props.enqueueSnackbar(notification.notification, {variant: notification.variant});
    });
  }

  handleClickOpen = () => {
    this.setState({ open: !this.state.open });
  };
  
  handleClose = () => {
    this.setState({ open: !this.state.open });
  };
  
  deleteHandle = async (id) => {
    await this.handleClose();
    await this.props.onDelete(id);
    await this.props.onRemmoveSelected();
    // await this.props.enqueueSnackbar('fdafads');
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 3000);
  }

  render() {
    const { id, open, classes } = this.props;
    return (
      <div className={classes.deleteButton}>
        {/* <Tooltip title="Xóa" placement="left">
          <IconButton aria-label="Delete" color="secondary" onClick={this.handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Tooltip> */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete User"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có chắc muốn xóa người dùng này?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Hủy
            </Button>
            <Button onClick={() => this.deleteHandle(id)} color="primary" autoFocus>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notifications: state.admin.notifications,
});

const mapDispatchToProps = dispatch => ({
  onDelete: id => dispatch(actions.deleteUser(id)),
  onRemmoveSelected: () => dispatch(actions.removeSelected()),
  onCloseAlert: () => dispatch(actions.closeAlert()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(withSnackbar(AlertDelete))));