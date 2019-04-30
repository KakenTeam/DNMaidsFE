import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import toolbarStyles from './ToolBarStyles';
import DeleteUser from '../../Admin/DeleteUser/AlertDelete';
import EditUser from '../../Admin/EditUser/EditUser';

class EnhancedTableToolbar extends React.Component {

  render() {
    const { numSelected, idSelected, classes } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        <div className={classes.title}>
          {numSelected > 0 ? (
            <Typography color="default" variant="subtitle1">
              {numSelected} selected
            </Typography>
          ) : (
            <Typography variant="h6" id="tableTitle">
              Users
            </Typography>
          )}
        </div>
        <div className={classes.spacer} />
        <div className={classes.actions}>
          {numSelected > 0 ? (
            <div className={classes.wrapperAction}>
              <DeleteUser
                id={idSelected}
              />
              <EditUser
                id={idSelected}
              />
            </div>
          ) : (
            <Tooltip title="Filter list">
              <IconButton aria-label="Filter list">
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
        </div>
      </Toolbar>
    );
  }
}

const mapStateToProps = state => ({
  isDeleted: state.admin.isDelete,
  numSelected: state.admin.numSelected,
});

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

export default withRouter(connect(mapStateToProps, null)(withStyles(toolbarStyles)(EnhancedTableToolbar)));
