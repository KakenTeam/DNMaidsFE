import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

import * as actions from '../../../../store/actions/index';

import TableHelpers from './TableHelpers/TableHelpers';

import styles from './Styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class AssignHelper extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleToggle = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  // handleStatusChange = event => {
  //   this.setState({
  //     statusChoose: {
  //       ...this.state.statusChoose,
  //       [event.target.name]: event.target.value,
  //     }
  //   });
  // };

  // updateContractStatusHandle = () => {
  //   this.handleToggle();
  //   this.props.onUpdateStatus(this.props.idContract, this.state.statusChoose);
  //   setTimeout(() => {
  //     this.props.onCloseAlert();
  //   }, 3000);
  // }

  
  render() {
    const { classes, idContract } = this.props;

    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Cập nhật người giúp việc
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Trở về
              </Typography>
            </Toolbar>
          </AppBar>
          <TableHelpers
            idContract={idContract}
          />
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.contracts.notifications,
  variant: state.contracts.variant,
  detailContract: state.contracts.detailContract,
});

const mapDispatchToProps = dispatch => ({
  onShowContract: (id) => dispatch(actions.showContract(id)),
  onUpdateStatus: (id, status) => dispatch(actions.updateContractStatus(id, status)),
  onCloseAlert: () => dispatch(actions.closeAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AssignHelper));
