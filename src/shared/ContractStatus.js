import React from 'react';
import Chip from '@material-ui/core/Chip';

class ContractStatus extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
  }

  render() {
    return (
      <Chip
      label={this.props.status}
    />
    );
  }
}

export default ContractStatus;