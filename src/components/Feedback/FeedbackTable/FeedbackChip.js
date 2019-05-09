import React from 'react';
import Chip from '@material-ui/core/Chip';

class FeedbackChip extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    }
  }

  render() {
    let color = this.props.status == 'resolved' ? 'primary' : 'secondary';
    let text = this.props.status == 'resolved' ? 'Đã xử lý' : 'Chưa xử lý'

    return (
      <Chip
      label={text}
      color={color}
    />
    );
  }
}

export default FeedbackChip;