import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import styles from './Styles';

import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

import * as actions from '../../store/actions/index';
import * as moment from 'moment'; 

const data = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];


class HomePage extends Component {
  state = {
		open: false,
		anchorEl: null,
		openEdit: false,
  };

  async componentDidMount() {
    let now = moment().format('YYYY-MM-DD')
    let nowBefore = moment().subtract(7, 'days').format('YYYY-MM-DD')
    await this.props.getStatistic(nowBefore, now, 'day');
  }

  getStatistic = () => {
    let statistic = [...this.props.statistic.statistic]
    statistic = statistic.map(statis => ({
      time: statis.time,
      contract_count: statis.contract.single.count + statis.contract.longterm.count,
      contract_sum: statis.contract.single.sum + statis.contract.longterm.sum, 
      contract_canceled: statis.contract.single.canceled + statis.contract.longterm.canceled
    }))
    return statistic;
  }
  
  render() {
    const { classes } = this.props;
    return (
      <div>
            { this.props && this.props.statistic && this.props.statistic.statistic &&
                 <Paper
                 >
                   <BarChart
                 width={1000}
                 height={500}
                 data={this.getStatistic()}
                 margin={{
                   top: 100, right: 30, left: 20, bottom: 5,
                 }}
                 title="Biểu đồ doanh thu và số hợp đồng 7 ngày gần nhất"
               >
                 <CartesianGrid strokeDasharray="3 3" />
                 <XAxis dataKey="time"  />
                 <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                 <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                 <Tooltip />
                 <Legend />
                 <Bar yAxisId="left" dataKey="contract_count" fill="#8884d8" name="Số hợp đồng tạo mới" />
                 <Bar yAxisId="left" dataKey="contract_canceled" fill="#dc3545" name="Số hợp đồng bị hủy" />
                 <Bar yAxisId="right" dataKey="contract_sum" fill="#82ca9d" name="Doanh thu" />
               </BarChart>
               <h5 style={{textAlignVertical: "center",textAlign: "center",}}>Biểu đồ doanh thu và số hợp đồng 7 ngày gần nhất</h5>
                 </Paper>
            }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  statistic: state.homepage.statistic,
});

const mapDispatchToProps = dispatch => ({
  getStatistic: (start_date, end_date, filter) => dispatch(actions.getStatistic(start_date, end_date, filter)),
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, { withTheme: true })(HomePage)));
