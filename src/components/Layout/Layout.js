import React, { Component } from 'react';

import Header from './Header/Header';
import Aside from './Aside/Aside';

import styles from './Layout.module.css';

class Layout extends Component {
  render() {
    return (
      <div>
        <Aside />
      </div>
    );
  }
}

export default Layout;