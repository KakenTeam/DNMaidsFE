import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

import * as actions from '../../store/actions/index';
import AlertMessage from '../Admin/DeleteUser/AlertDelete';

import styles from './Style';

class EnhancedTable extends React.Component {
  state = {
    openDelete: false,
    idDelete: null,
  };

  async componentDidMount() {
    await this.props.getUsers(this.props.role);
    await this.props.getAdmin();
    await this.props.getSkills();
    await this.props.getGroups();
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.props.getUsers(this.props.role);
    }
  }

  onToggleDelete = (id) => {
    this.setState(prevState => ({
      openDelete: !prevState.openDelete,
      idDelete: id,
    }), () => {
    });
  }

  toggleEdit = async (id) => {
    await this.props.onShowUser(id);
    let open = this.props.toggleEdit;
    await this.props.onToggleEdit(!open);
    setTimeout(() => {
      this.props.onCloseAlert();
    }, 1000); 
	}

  render() {
    const { classes, users, nameTable } = this.props;

    const title = [
      {title: 'STT', field: 'id'},
      {title: 'Email', field: 'email'},
      {title: 'Tên', field: 'name'},
      {title: 'Số điện thoại', field: 'phone'},
      {title: 'Địa chỉ', field: 'address'},
      {title: 'Giới tính', field: 'gender'},
      {title: 'Ngày sinh', field: 'birthday'},
    ];

    const data = users ? users.map(user => {
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        gender: user.gender === 0 ? 'Nữ' : 'Nam',
        birthday: user.birthday,
      };
    }) : null;

    const deleteAlert = this.state.openDelete ? (
      <AlertMessage 
        id={this.state.idDelete}
        open={this.state.openDelete}
      />
    ) : null;

    return (
      <div className={classes.root}>
        <div>
          {deleteAlert}
        </div>
        <MaterialTable
          title={nameTable}
          columns={title}
          data={data}
          options={{
            sorting: true,
            pageSize: 10,
            filtering: true,
          }}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Cập nhật',
              onClick: (event, rowData) => this.toggleEdit(rowData.id),
            },
            {
              icon: 'delete',
              tooltip: 'Xóa',
              onClick: (event, rowData) => this.onToggleDelete(rowData.id),
            },
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.admin.users,
  isDeleted: state.admin.isDelete,
  isEdited: state.admin.isEdit,
});

const mapDispatchToProps = dispatch => ({
  getUsers: (role) => dispatch(actions.getUsers(role)),
  getAdmin: () => dispatch(actions.getAdmin()),
  getGroups: () => dispatch(actions.getGroups()),
  getSkills: () => dispatch(actions.getSkills()),
  onAddSelected: () => dispatch(actions.addSelected()),
  onRemmoveSelected: () => dispatch(actions.removeSelected()),
  onCloseAlert: () => dispatch(actions.closeAlert()),
  onToggleEdit: open => dispatch(actions.toggleEdit(open)),
  onShowUser: (id) => dispatch(actions.showUser(id)),
});

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(EnhancedTable)));