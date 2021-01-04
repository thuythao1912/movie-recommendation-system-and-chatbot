import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import filterFactory from "react-bootstrap-table2-filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faInfoCircle,
  faFilter,
  faHandPointer,
  faUndo,
} from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";
import { Dropdown, Button } from "react-bootstrap";
import ConversationModal from "./ConversationModal";

export default class ConversationList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      columns: [
        {
          dataField: "input",
          text: "Nội dung hỏi",
          sort: true,
          formatter: this.slice_display_string,
        },
        {
          dataField: "response",
          text: "Nội dung trả lời",
          sort: true,
          formatter: this.slice_display_string,
        },
        {
          dataField: "status",
          text: "Trạng thái",
          sort: true,
        },
        {
          dataField: "created_time",
          text: "Thời gian",
          sort: true,
        },
        {
          dataField: "",
          text: "Thao tác",
          formatter: this.Action,
        },
      ],
      display_data: [],
      filter_status: "",
      is_not_edit: true,
      from_date: null,
      to_date: null,
    };
    this.delete_message = this.delete_message.bind(this);
    this.open_modal = this.open_modal.bind(this);
    this.close_modal = this.close_modal.bind(this);
    this.select_filter_status = this.select_filter_status.bind(this);
  }
  open_modal = (item_selected, is_not_edit) => {
    this.setState({
      is_not_edit: is_not_edit,
      display_modal: true,
      item_selected: item_selected,
    });
  };
  close_modal = () => {
    this.setState({ display_modal: false });
  };

  get_message_list = async () => {
    await callApi("messages", "get").then((res) => {
      this.setState({ data: res.data, display_data: res.data });
    });
  };
  componentDidMount = async () => {
    this.get_message_list();
  };
  slice_display_string = (string) => {
    if (string.length > 50) {
      let end = 50;
      while (string[end] != " ") {
        end--;
      }
      string = string.slice(0, end) + " ...";
    }
    return string;
  };
  delete_message = async (_id) => {
    let ans = window.confirm(`Bạn xác nhận xóa tin nhắn này?`);
    if (ans) {
      await callApi(`messages/${_id}`, "delete").then((res) => {
        alert(res.data.message);
      });
      await this.get_message_list();
      this.select_time();
    }
  };
  Action = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div key={rowIndex}>
        <span>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="text-info mr-3"
            onClick={() => this.open_modal(row, true)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-info mr-3"
            onClick={() => this.delete_message(row._id)}
          />
        </span>
      </div>
    );
  };
  delete_message_list = async () => {
    if (this.state.data.length == 0) {
      alert("Không có tin nhắn để xóa!");
    } else {
      let ans = window.confirm(`Bạn có xác nhận xóa tất cả tin nhắn?`);
      if (ans) {
        await callApi(`messages`, "delete").then((res) => {
          alert(res.data.message);
        });
        this.get_message_list();
      }
    }
  };
  select_filter_status = async (value) => {
    let filter_status = value;
    let data = this.state.data;
    let display_data = [];
    switch (await filter_status) {
      case "":
        display_data = data;
        break;
      case "handled":
        data.map((d) => {
          if (d.status == "handled") {
            display_data.push(d);
          }
        });
        break;
      case "unhandled":
        data.map((d) => {
          if (d.status == "unhandled") {
            display_data.push(d);
          }
        });
        break;
    }

    await this.setState({ display_data: display_data });
  };
  handle_from_date = async (e) => {
    await this.setState({
      from_date: new Date(e.target.value).getTime(),
    });
  };

  handle_to_date = async (e) => {
    await this.setState({
      to_date: new Date(e.target.value).getTime() + 86399000,
    });
  };
  select_time = async () => {
    let data = this.state.data;
    let display_data = [];
    if (
      this.state.from_date > this.state.to_date ||
      this.state.from_date == null ||
      this.state.to_date == null
    ) {
      alert("Bạn hãy chọn khoảng thời gian thích hợp nhé!");
    } else {
      data.map((d) => {
        if (
          d.timestamp >= this.state.from_date &&
          d.timestamp <= this.state.to_date
        ) {
          display_data.push(d);
        }
      });
      await this.setState({ display_data: display_data });
    }
  };
  reset_data = () => {
    this.setState({ display_data: this.state.data });
  };

  render() {
    const { SearchBar, ClearSearchButton } = Search;
    let data = this.state.display_data;
    let columns = this.state.columns;
    return (
      <div className="bg-white px-3 py-2">
        {this.state.display_modal ? (
          <ConversationModal
            item_selected={this.state.item_selected}
            display_modal={this.state.display_modal}
            onClickClose={this.close_modal}
            is_not_edit={this.state.is_not_edit}
          />
        ) : (
          ""
        )}
        {columns.length > 0 ? (
          <ToolkitProvider keyField="_id" data={data} columns={columns} search>
            {(props) => (
              <div>
                <div className="form-inline mr-auto my-3">
                  <h5 className="mr-3">Tìm kiếm:</h5>
                  <SearchBar
                    {...props.searchProps}
                    placeholder="Nhập vào để tìm ..."
                    className="rounded-pill"
                  />
                  <Dropdown className="mx-3">
                    <Dropdown.Toggle
                      variant="info"
                      id="dropdown-basic"
                      className="rounded-pill"
                    >
                      <FontAwesomeIcon icon={faFilter} />
                      <span className="mx-2">Lọc trạng thái</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() => this.select_filter_status("")}
                      >
                        Tất cả
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => this.select_filter_status("handled")}
                      >
                        Handled
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() => this.select_filter_status("unhandled")}
                      >
                        Unhandled
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <Button
                    variant="danger"
                    onClick={this.delete_message_list}
                    className="rounded-pill"
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                    <span className="mx-2">Xóa tất cả</span>
                  </Button>
                  <div className="mx-2 row">
                    <div>
                      <span>Từ ngày</span>
                      <input
                        type="date"
                        className="form-control rounded-pill mx-2"
                        name="from_date"
                        onChange={this.handle_from_date}
                      />
                    </div>
                    <div>
                      <span>Đến ngày</span>
                      <input
                        type="date"
                        className="form-control rounded-pill mx-2"
                        name="to_date"
                        onChange={this.handle_to_date}
                      />
                    </div>
                  </div>
                  <Button
                    variant="outline-dark"
                    className="rounded-pill mx-2"
                    onClick={this.select_time}
                  >
                    Xem
                  </Button>
                  <Button
                    variant="outline-dark"
                    className="rounded-pill"
                    onClick={this.reset_data}
                  >
                    <FontAwesomeIcon icon={faUndo} />
                  </Button>
                </div>

                <BootstrapTable
                  {...props.baseProps}
                  keyField="_id"
                  filter={filterFactory()}
                  pagination={paginationFactory()}
                />
                <p>Tổng cộng: {this.state.display_data.length} tin nhắn.</p>
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
