import React, { Component } from 'react';
import { connect } from 'react-redux';

import AuthForm from '../../components/AuthForm/AuthFrom';

class Auth extends Component {
  render() {
    return (
      <div>
        <AuthForm />
      </div>
    );
  }
}

export default connect(null, null)(Auth);