import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {renderGender, renderServiceType, formatMoney} from '../../../../shared/utility';
import ContractStatus from '../../../../shared/ContractStatus'
import styles from './Styles';
import Grid from '@material-ui/core/Grid';

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
      // <Typography>
      //   <Typography paragraph>Loại dịch vụ:<span>{detailContract.service_type}</span></Typography>
      //   <Typography paragraph>Địa chỉ:<span>{detailContract.address}</span></Typography>
      //   <Typography paragraph>Ngày bắt đầu:<span>{detailContract.start_date}</span></Typography>
      //   <Typography paragraph>Ngày kết thúc:<span>{detailContract.end_date}</span></Typography>
      //   <Typography paragraph>Tình trạng:<span>{detailContract.status}</span></Typography>
      //   <Typography paragraph>Giá:<span>{detailContract.fee}</span></Typography>   
      //   <Typography paragraph>Ngày tạo:<span>{detailContract.created_at}</span></Typography>   
      //   <Typography paragraph>Ngày cập nhật:<span>{detailContract.updated_at}</span></Typography>   
      // </Typography>
      <ul>
        <h5>Chi tiết hợp đồng</h5>
        <li>
          <strong>Loại dịch vụ: </strong> {renderServiceType(detailContract.service_type)}
        </li>
        <li>
          <strong>Địa chỉ công việc: </strong>{detailContract.address}
        </li>
        <li>
          <strong>Trạng thái</strong> <ContractStatus status={detailContract.status}></ContractStatus>
        </li>
        <li>
          <strong>Giá trị hợp đồng: </strong> { formatMoney(detailContract.fee)}
        </li>
      </ul>
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
      <ul>
      <h5>Người giúp việc</h5>
      <li>
        <strong>Tên: </strong> {detailContract.helper.name}
      </li>
      <li>
        <strong>Email: </strong>{detailContract.helper.email}
      </li>
      <li>
        <strong>Số điện thoại: </strong> {detailContract.helper.phone}
      </li>
      <li>
        <strong>Giới tính: </strong> {renderGender(detailContract.helper.gender)}
      </li>
      <li>
        <strong>Địa chỉ: </strong> {detailContract.helper.address}
      </li>
      <li>
        <strong>Kỹ năng: </strong> {detailContract.helper.skill}
      </li>
    </ul>
    ) : (
      <ul>
        <h5>Người giúp việc</h5>
        Chưa được giao 
      </ul>
    );

  return (
    <Paper className={classes.contract}>
      <Grid container spacing={24}>
        <Grid item xs={6}>
          {customer}
        </Grid>

        <Grid item xs={6}>
          {helper}
        </Grid>

        <Grid item xs={6}>
          {contract}
        </Grid>
      </Grid>
        {/* <Typography component="div" className={classes.infoContract}>
          <Typography paragraph>Hợp đồng</Typography>
          {contract}
        </Typography> */}

      
      
      

        {/* <Typography component="div" className={classes.infoContract}>
          <Typography paragraph>Nguời giúp việc</Typography>
          {helper}
          <Typography />
          <Typography component="div">
            <Typography>Lịch làm việc</Typography>
            {schedule}
            <Typography></Typography>
          </Typography>
        </Typography>

        <Typography /> */}
    </Paper>
  );
};

export default (withStyles(styles, { withTheme: true })(detail)); 