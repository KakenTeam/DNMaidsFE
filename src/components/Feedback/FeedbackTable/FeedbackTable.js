import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import * as actions from '../../../store/actions/index';
import styles from './Styles';
import { helpers } from '../../../shared/utility';
import MaterialTable from 'material-table';
import FeedbackChip from './FeedbackChip';
import UpdateStatus from './UpdateStatus/UpdateStatus';
import Button from '@material-ui/core/Button';

class FeedbackTable extends React.Component {
  async componentDidMount() {
    await this.props.getFeedbacks();
  }

  getFeedbacks = () => {
    let listFeedbacks = [...this.props.feedbacks];
    listFeedbacks.sort((a, b) => b.created_at - a.created_at)
    return listFeedbacks;

  }

  render() {
    const { classes, feedbacks } = this.props;

    return (
      <div>
        <MaterialTable
        title="Phản hồi khách hàng"
        columns={[
          { title: 'Tên khách hàng', field: 'user.name', 
            render: rowData =>  <Link to={"/admin/contracts/" + rowData.contract_id}>
            <Button>
              {rowData.user.name}
            </Button>
          </Link>
          },
          { title: 'Số điện thoại ', field: 'user.phone' },
          { title: 'Phản hồi', field: 'feedback' },
          { 
            title: 'Trạng thái', field: 'status',
            render: rowData => <FeedbackChip status={rowData.status} />,
            lookup: { 'resolved': 'Đã xử lý', 'unresolved': 'Chưa xử lý' },
          },
          { title: 'Thời gian gửi', field: 'created_at'},
          {
            title: 'Hành động', 
            render: rowData => 
              <div>
                <UpdateStatus feedbackId={rowData.id} feedback={rowData} />
               
              </div>
          }
        ]}
        data={this.getFeedbacks()}        
        options={{
          sorting: true,
          pageSize: 10,
          filtering: true,
        }}
      />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  feedbacks: state.feedbacks.feedbacks,
});

const mapDispatchToProps = dispatch => ({
  getFeedbacks: () => dispatch(actions.getFeedbacks()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FeedbackTable)));