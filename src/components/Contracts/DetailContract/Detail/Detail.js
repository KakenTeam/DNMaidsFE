import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import {renderGender} from '../../../../shared/utility';
import styles from './Styles';

const detail = props => {

  const { classes, detailContract } = props;

    const schedule = detailContract.schedule ? detailContract.schedule.map(info => {
      return (
        <Typography>
          <Typography paragraph>Ngày trong tuần:<span>{info.day_of_week}</span></Typography>
          <Typography paragraph>Thời gian bắt đầu:<span>{info.start_time}</span></Typography>
          <Typography paragraph>Thời gian kết thúc:<span>{info.end_time}</span></Typography>
          <Typography paragraph>Ca làm việc:<span>{info.shift}</span></Typography>
        </Typography>
      );
    }) : null;

    const  contract = detailContract ? (
      <Typography>
        <Typography paragraph>Loại dịch vụ:<span>{detailContract.service_type}</span></Typography>
        <Typography paragraph>Địa chỉ:<span>{detailContract.address}</span></Typography>
        <Typography paragraph>Ngày bắt đầu:<span>{detailContract.start_date}</span></Typography>
        <Typography paragraph>Ngày kết thúc:<span>{detailContract.end_date}</span></Typography>
        <Typography paragraph>Tình trạng:<span>{detailContract.status}</span></Typography>
        <Typography paragraph>Giá:<span>{detailContract.fee}</span></Typography>   
        <Typography paragraph>Ngày tạo:<span>{detailContract.created_at}</span></Typography>   
        <Typography paragraph>Ngày cập nhật:<span>{detailContract.updated_at}</span></Typography>   
      </Typography>
    ) : null;

    const customer = detailContract.customer ? (
      <ul>
        <h5>Khách hàng</h5>
        <li>
          <strong>Tên: </strong> {detailContract.customer.name}
        </li>
        <li>
          <strong>Email: </strong>{detailContract.customer.email}
        </li>
        <li>
          <strong>Số điện thoại: </strong> {detailContract.customer.phone}
        </li>
        <li>
          <strong>Giới tính: </strong> {renderGender(detailContract.customer.gender)}
        </li>
        <li>
          <strong>Địa chỉ: </strong> {detailContract.customer.address}
        </li>
      </ul>
    ) : null;

    const helper = detailContract.helper ? (
      <Typography>
        <Typography paragraph>Tên:<span>{detailContract.helper.name}</span></Typography>
        <Typography paragraph>Email:<span>{detailContract.helper.email}</span></Typography>
        <Typography paragraph>Số điện thoại:<span>{detailContract.helper.phone}</span></Typography>
        <Typography paragraph>Giới tính:<span>{detailContract.helper.gender}</span></Typography>
        <Typography paragraph>Địa chỉ:<span>{detailContract.helper.address}</span></Typography>
      </Typography>
    ) : null;

  return (
    <Paper className={classes.contract}>
      <GridList className={classes.gridList} cols={4}>
        <Typography component="div" className={classes.infoContract}>
          <Typography paragraph>Hợp đồng</Typography>
          {contract}
        </Typography>

        <Typography />

        <Typography component="div" className={classes.infoContract}>
          {customer}
        </Typography>

        <Typography />

        <Typography component="div" className={classes.infoContract}>
          <Typography paragraph>Nguời giúp việc</Typography>
          {helper}
          <Typography />
          <Typography component="div">
            <Typography>Lịch làm việc</Typography>
            {schedule}
            <Typography></Typography>
          </Typography>
        </Typography>

        <Typography />
      </GridList>
    </Paper>
  );
};

export default (withStyles(styles, { withTheme: true })(detail));