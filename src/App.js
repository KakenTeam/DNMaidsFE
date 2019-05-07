import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import Auth from './containers/Auth/Auth';

import './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    );
    
    if (localStorage.getItem('accessToken') || this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/admin" component={Layout} />
          <Redirect to="/admin" />
          <Redirect to="/" />
          {/* <Route path="/" exact render={() => <Redirect to="/admin" />} /> */}
          {/* <Route path="/admin/profile" exact component={} /> */}
        </Switch>
      );
    }

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.token !== null
})

export default withRouter(connect(mapStateToProps, null)(App));
