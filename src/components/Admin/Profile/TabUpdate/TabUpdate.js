import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from './TabContainer/TabContainer';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import UpdatePassword from './UpdataPassword/UpdatePassword';

import styles from './Styles';

class ScrollableTabsButtonPrevent extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} variant="scrollable" scrollButtons="off">
            <Tab label="Update profile" />
            <Tab label="Update password" />
          </Tabs>
        </AppBar>
        {value === 0 && 
          <TabContainer>
            <UpdateProfile />
          </TabContainer>
        }
        {value === 1 && 
          <TabContainer>
            <UpdatePassword />
          </TabContainer>
        }
      </div>
    );
  }
}

export default withStyles(styles)(ScrollableTabsButtonPrevent);
