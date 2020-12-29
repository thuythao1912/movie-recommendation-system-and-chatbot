import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";
import { Button } from "react-bootstrap";

export default class UserList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      columns: [
        {
          dataField: "user_id",
          text: "Mã người dùng",
          sort: true,
        },
        {
          dataField: "username",
          text: "Tên người dùng",
          sort: true,
        },
        {
          dataField: "user_login",
          text: "Tên đăng nhập",
          sort: true,
        },
        {
          dataField: "",
          text: "Xóa",
          formatter: this.Action,
        },
      ],
      item_selected: {},
    };
    this.delete_user = this.delete_user.bind(this);
    this.open_modal = this.open_modal.bind(this);
    this.close_modal = this.close_modal.bind(this);
  }
  get_user_list() {
    callApi("users", "get").then((res) => {
      this.setState({ data: res.data });
    });
  }
  componentDidMount() {
    this.get_user_list();
  }
  delete_message_list = async () => {
    if (this.state.data.length == 0) {
      alert("Không có tin nhắn để xóa!");
    } else {
      let ans = window.confirm(`Bạn có xác nhận xóa tất cả người dùng?`);
      if (ans) {
        await callApi(`users`, "delete").then((res) => {
          alert(res.data.message);
        });
        this.get_user_list();
      }
    }
  };
  delete_user = async (_id, user_login) => {
    let ans = window.confirm(`Bạn cố muốn xóa người dùng ${user_login}?`);
    if (ans) {
      await callApi(`users/${_id}`, "delete").then((res) => {
        alert(res.data.message);
      });
      this.get_user_list();
    }
  };
  open_modal = (item_selected, is_not_edit) => {
    this.setState({
      display_modal: true,
      item_selected: item_selected,
      is_not_edit: is_not_edit,
    });
  };
  close_modal = () => {
    this.setState({ display_modal: false });
    this.get_movie_list();
  };

  Action = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div key={rowIndex}>
        <span>
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-info mr-3"
            onClick={() => this.delete_user(row._id, row.user_login)}
          />
        </span>
      </div>
    );
  };
  render() {
    const { SearchBar, ClearSearchButton } = Search;
    let data = this.state.data;
    let columns = this.state.columns;
    return (
      <div className="bg-white my-3 px-4 py-2 border">
        {columns.length > 0 ? (
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div>
                <div className="form-inline mr-auto my-3">
                  <h5 className="mr-3">Tìm kiếm:</h5>
                  <SearchBar
                    {...props.searchProps}
                    placeholder="Nhập vào để tìm ..."
                    className="rounded-pill"
                  />
                  <Button
                    variant="danger"
                    onClick={this.delete_message_list}
                    className="mx-2 rounded-pill"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span className="mx-2">Xóa tất cả</span>
                  </Button>
                </div>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  keyField="_id"
                />
              </div>
            )}
          </ToolkitProvider>
        ) : (
          ""
        )}
      </div>
    );
  }
}
