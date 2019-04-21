import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Auth from './containers/Auth/Auth';
import Layout from './components/Layout/Layout';

import './App.css';

class App extends Component {

  componentDidMount = () => {
    
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/login" exact component={Auth} />
        <Redirect to="/login" />
      </Switch>
    );
    
    if (localStorage.getItem('accessToken') || this.props.isAuthenticated) {
      routes = (
        <Switch>
          {/* <Route path="/login" exact component={Auth} /> */}
          <Route path="/admin" exact component={Layout} />
          <Redirect to="/admin" />
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
