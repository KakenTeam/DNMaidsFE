import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Route, Switch, Link } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import GroupAdd from '@material-ui/icons/GroupAdd';
import AccountBox from '@material-ui/icons/AccountBox';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import styles from './Styles';

class SlideBar extends Component {
  state = {
		open: false,
		anchorEl: null,
		openEdit: false,
	};

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	}
	
	handleGetProfile = () => {
		this.setState({ anchorEl: null });
		// this.props.onGetAdmin();
	}

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};


	handleLogout = () => {
		this.setState({ anchorEl: null });
		this.props.onLogout();
		return <Redirect to="/" />
	};

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
    return (
      <div>
        <AppBar
						position="fixed"
						className={classNames(classes.appBar, {
							[classes.appBarShift]: this.state.open,
						})}
					>
						<Toolbar disableGutters={!this.state.open}>
							<IconButton
								color="inherit"
								aria-label="Open drawer"
								onClick={this.handleDrawerOpen}
								className={classNames(classes.menuButton, {
									[classes.hide]: this.state.open,
								})}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" className={classes.grow}>
								DNMails
							</Typography>
							<IconButton
								className={classes.accountButton}
								aria-owns={open ? 'menu-appbar' : undefined}
								aria-haspopup="true"
								onClick={this.handleMenu}
								color="inherit"
							>
								{/* <AccountCircle /> */}
								<Avatar alt="Remy Sharp" src={localStorage.getItem('avatar')} className={classes.bigAvatar} />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={open}
								onClose={this.handleClose}
							>
								<MenuItem onClick={this.handleGetProfile}>
									<Link to="/admin/profile">
										My account
									</Link>
								</MenuItem>
								<MenuItem onClick={this.handleLogout}>Log out</MenuItem>
							</Menu>
						</Toolbar>
					</AppBar>
					<Drawer
						variant="permanent"
						className={classNames(classes.drawer, {
							[classes.drawerOpen]: this.state.open,
							[classes.drawerClose]: !this.state.open,
						})}
						classes={{
							paper: classNames({
								[classes.drawerOpen]: this.state.open,
								[classes.drawerClose]: !this.state.open,
							}),
						}}
						open={this.state.open}
					>
						<div className={classes.toolbar}>
							<IconButton onClick={this.handleDrawerClose}>
								{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
							</IconButton>
						</div>
						<Divider />
						<List>
							<Link to="/admin/users">
								<ListItem button>
									<ListItemIcon><GroupAdd /></ListItemIcon>
									<ListItemText primary="Permission Group" />
								</ListItem>
							</Link>
							<Link to="/admin/users">
								<ListItem button>
									<ListItemIcon><AccountBox /></ListItemIcon>
									<ListItemText primary="User" />
								</ListItem>
							</Link>
						</List>
					</Drawer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(actions.logout()),
	onGetAdmin: () => dispatch(actions.getAdmin()),
});

export default withRouter(connect(null, mapDispatchToProps)(withStyles(styles, { withTheme: true })(SlideBar)));
