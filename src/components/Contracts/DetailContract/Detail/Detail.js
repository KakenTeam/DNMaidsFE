import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { helpers } from '../../../../shared/utility';
import ContractStatus from '../../../../shared/ContractStatus'
import styles from './Styles';
import Grid from '@material-ui/core/Grid';

const detail = props => {

  const { classes, detailContract } = props;

  const skills = detailContract.skills ? detailContract.skills.map(element => {
    return element.name;
  }) : null;

  const stringSkill = skills ? skills.join(', ') : null;

    const schedule = detailContract.schedule ? detailContract.schedule.map(info => {
      return (
        <ul>
          <li>
            <strong>Giờ bắt đầu: </strong> {helpers.formatHour(info.start_time)}
          </li>
          <li>
            <strong>Giờ kết thúc: </strong> {helpers.formatHour(info.end_time)}
          </li>
          <li>
            <strong>Ngày làm việc: </strong> {helpers.renderDayOfWeek(info.day_of_week)}
          </li>
          <li>
            <strong>Ca làm việc: </strong> {helpers.renderShift(info.shift)}
          </li>
        </ul>

      );
    }) : null;

    const  contract = detailContract ? (
      <ul>
        <h5>Chi tiết hợp đồng</h5>
        <li>
          <strong>Yêu cầu công việc: </strong>{stringSkill}
        </li>
        <li>
          <strong>Loại dịch vụ: </strong> {helpers.renderServiceType(detailContract.service_type)}
        </li>
        <li>
          <strong>Địa chỉ công việc: </strong>{detailContract.address}
        </li>
        <li>
          <strong>Trạng thái</strong> <ContractStatus status={detailContract.status}></ContractStatus>
        </li>
        <li>
          <strong>Giá trị hợp đồng: </strong> { helpers.formatMoney(detailContract.fee)}
        </li>

        <li>
          <strong>Ngày băt đầu hợp đồng: </strong> {helpers.formatDate(detailContract.start_date)}
        </li>

        <li>
          <strong>Ngày kết thúc hợp đồng: </strong> {helpers.formatDate(detailContract.end_date)}
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
          <strong>Giới tính: </strong> {helpers.renderGender(detailContract.customer.gender)}
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
        <strong>Giới tính: </strong> {helpers.renderGender(detailContract.helper.gender)}
      </li>
      <li>
        <strong>Địa chỉ: </strong> {detailContract.helper.address}
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

        <Grid item xs={6}>
          <h5>Lịch làm việc</h5>
          {schedule}
        </Grid>
        
      </Grid>
     
    </Paper>
  );
};

export default (withStyles(styles, { withTheme: true })(detail)); 