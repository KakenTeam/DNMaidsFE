import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect, Route, Switch, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import styles from './Styles';
import cssStyle from './Aside.module.css';

import * as actions from '../../../store/actions/index';

import Users from '../User/Users';
import SlideBar from '../SlideBar/SlideBar';
import ProfileContainer from '../../Admin/Profile/ProfileContainer';

class Aside extends React.Component {
	state = {
		open: false,
		anchorEl: null,
		openEdit: false,
	};

	componentWillMount = async () => {
		await this.props.onGetAdmin();
	}

	handleLogout = () => {
		this.setState({ anchorEl: null });
		this.props.onLogout();
		return <Redirect to="/login" />;
	};
	
	handleClose = () => {
		this.setState({ anchorEl: null });
	}

	render() {
		const { classes } = this.props;
		
		return (
			<div className={cssStyle.LayoutContent}>
				<div className={classes.root}>
					<SlideBar />
					<main className={classes.content}>
						<Switch>
							<Route path={`${this.props.match.path}/users`} component={(Users)} />
							<Route path={`${this.props.match.path}/profile`} component={(ProfileContainer)} />
						</Switch>
					</main>
				</div>
			</div>
			
		);
	}
}

const mapStateToProps = state => ({
	toggleCreate: state.admin.toggleCreate,
	isShow: state.admin.isShow,
	toggleEdit: state.admin.toggleEdit,
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
	onLogout: () => dispatch(actions.logout()),
	onGetAdmin: () => dispatch(actions.getAdmin()),
});

Aside.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(Aside)));
