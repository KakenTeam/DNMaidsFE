import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import styles from './Styles';

const addButton = (props) => {
  const { classes } = props;
  return (
    <div>
      <Button variant="contained" color="primary" className={classes.button}>
        {props.nameButton}
        <AddIcon className={classes.rightIcon} />
      </Button>
    </div>
  );
}

addButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(addButton);