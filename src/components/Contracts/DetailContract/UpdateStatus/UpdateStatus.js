import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import * as actions from '../../../../store/actions/index';

import styles from './Styles';

class UpdateStatus extends React.Component {
  state = {
    open: false,
    statusDefault: ['unverify', 'verify', 'assigned', 'paid', 'completed', 'canceled'],
    statusChoose: {
      status: null,
    },
  };

  componentWillMount = () => {
    this.setState({
      statusChoose: {
        ...this.state.statusChoose,
        status: this.props.status
      }
    });
  }
  
  componentDidMount = () => {
    console.log('fasdfldslfjj', this.props.status);
  }

  handleToggle = () => {
    this.setState(prevState => ({
      open: !prevState.open,
    }));
  }

  handleStatusChange = event => {
    this.setState({
      statusChoose: {
        ...this.state.statusChoose,
        [event.target.name]: event.target.value,
      }
    }, () => {
      console.log('states state', this.state.statusChoose);
    });
  };

  updateContractStatusHandle = () => {
    this.handleToggle();
    this.props.onUpdateStatus(this.props.idContract, this.state.statusChoose);
  }

  render() {
    const { classes } = this.props;

    console.log('staut update', this.state.statusChoose);

    const statusItem = this.state.statusDefault.map(item => (
      <MenuItem value={item}>{item}</MenuItem>
    ));

    return (
      <React.Fragment>
        <Button variant="outlined" color="primary" onClick={this.handleToggle}>
          Cập nhật hợp đồng
        </Button>
        <Dialog
          maxWidth={this.state.maxWidth}
          open={this.state.open}
          onClose={this.handleToggle}
        >
          <DialogTitle id="max-width-dialog-title">Tình trạng hợp đồng</DialogTitle>
          <DialogContent>
            <form className={classes.form} noValidate>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="max-width">Tình trạng</InputLabel>
                <Select
                  name='status'
                  value={this.state.statusChoose.status}
                  onChange={this.handleStatusChange}
                >
                  {statusItem}
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleToggle} color="primary">
              Hủy
            </Button>
            <Button onClick={this.updateContractStatusHandle} color="primary">
              Cập nhật
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onUpdateStatus: (id, status) => dispatch(actions.updateContractStatus(id, status)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(UpdateStatus));
