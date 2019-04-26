import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import * as actions from '../../../store/actions/index';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
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
import Paper from '@material-ui/core/Paper';

import styles from './Styles';
import EnhancedTable from '../../TableUser/EnhancedTable';
import CreateUser from '../../Admin/CreateUser/CreateUser';
import EditUser from '../../Admin/EditUser/FormEdit/FormEdit';

class Aside extends React.Component {
	state = {
		open: false,
		anchorEl: null,
		openEdit: false,
	};

	componentWillMount = () => {
		console.log('open-----', this.state.open);
	}

	handleDrawerOpen = () => {
		this.setState({ open: true });
	};

	handleDrawerClose = () => {
		this.setState({ open: false });
	};

	handleMenu = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleLogout = () => {
		this.setState({ anchorEl: null });
		this.props.onLogout();
		return <Redirect to="/login" />;
	};
	
	handleClose = () => {
		this.setState({ anchorEl: null });
	}

	render() {
		const { classes, theme, toggleCreate } = this.props;
		const { anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
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
							<AccountCircle />
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
							<MenuItem onClick={this.handleClose}>My account</MenuItem>
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
						{['Permission Group', 'User'].map((text, index) => (
							<ListItem button key={text}>
								<ListItemIcon>{index % 2 === 0 ? <GroupAdd /> : <AccountBox />}</ListItemIcon>
								<ListItemText primary={text} />
							</ListItem>
						))}
					</List>
				</Drawer>
				<main className={classes.content}>
					<div>
						<CreateUser
							nameButton='Add User'
							open={this.state.open}
						/>
					</div>
				  <Paper className={toggleCreate ? classes.tableWrapperEdit : classes.tableWrapper}>
						<EnhancedTable />
					</Paper>
					{/* <Paper>
						<EditUser />
					</Paper> */}
				</main>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	toggleCreate: state.admin.toggleCreate,
});

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(actions.logout()),
});

Aside.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Aside)));
