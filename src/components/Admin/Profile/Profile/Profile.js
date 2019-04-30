import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import * as actions from '../../../../store/actions/index';

import styles from './Styles';

class Profile extends Component {

  async componentDidMount() {
    // await this.props.onGetAdmin();
  }

  render() {
    const { classes, adminInfo } = this.props;
    console.log('admin info', adminInfo);
    return (
      <div className={classes.root} >
        { adminInfo ?
            <Paper>
              <Grid >
              {/* <img className={classes.avt} src={adminInfo.image} alt="adminAvatar" /> */}
                <Avatar alt="Remy Sharp" src={adminInfo.image} className={classes.bigAvatar} />
                <div>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell align="right">{adminInfo.email}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell >Name</TableCell>
                        <TableCell align="right">{adminInfo.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phone</TableCell>
                        <TableCell align="right">{adminInfo.phone}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">{adminInfo.address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell >gender</TableCell>
                        <TableCell align="right">{adminInfo.gender}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Birthday</TableCell>
                        <TableCell align="right">{adminInfo.birthday}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Permission</TableCell>
                        <TableCell align="right">
                          { adminInfo.permission ? adminInfo.permission.map((per, index) => (
                            <p key={index}>
                              {per}
                            </p>
                          )) : null}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </Grid>
            </Paper>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // adminInfo: state.auth.adminInfo,
});

const mapDispatchToProps = dispatch => ({
  onGetAdmin: () => dispatch(actions.getAdmin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));
