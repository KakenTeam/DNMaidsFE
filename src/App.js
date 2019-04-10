import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Auth from './containers/Auth/Auth';

import './App.css';

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Auth} />
      </Switch>
    );

    return (
      <div className="App">
        {routes}
      </div>
    );
  }
}

export default App;
