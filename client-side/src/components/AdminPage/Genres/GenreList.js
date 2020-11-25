import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";
import GenreModal from "./GenreModal";
export default class GenreList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      columns: [
        {
          dataField: "genre_id",
          text: "Mã thể loại",
          sort: true,
        },
        {
          dataField: "genre_name",
          text: "Tên thể loại",
          sort: true,
        },
        {
          dataField: "genre_description",
          text: "Mô tả",
          sort: true,
          formatter: this.formatGenreDescription,
        },
        {
          dataField: "",
          text: "Thao tác",
          formatter: this.Action,
        },
      ],
      selectRow: {
        mode: "checkbox",
        clickToSelect: true,
      },
      display_modal: false,
      item_selected: {},
      is_not_edit: true,
    };
    this.delete_genre = this.delete_genre.bind(this);
    this.open_modal = this.open_modal.bind(this);
    this.close_modal = this.close_modal.bind(this);
  }
  get_genre_list() {
    callApi("genres", "get").then((res) => {
      this.setState({ data: res.data });
    });
  }
  componentDidMount() {
    this.get_genre_list();
  }

  formatGenreDescription = (cell, row, rowIndex, formatExtraData) => {
    if (row.genre_description == null) {
      row.genre_description = [];
    }
    return <span key={rowIndex}>{row.genre_description.join(", ")}</span>;
  };
  delete_genre = async (_id, genre_name) => {
    let ans = window.confirm(
      `Xóa thể loại ${genre_name} đồng nghĩa với xóa trong danh sách thể loại của phim. Bạn xác nhận xóa?`
    );
    if (ans) {
      await callApi(`genres/${_id}`, "delete").then((res) => {
        alert(res.data.message);
      });
      this.get_genre_list();
    }
  };
  open_modal = (item_selected, is_not_edit) => {
    this.setState({
      is_not_edit: is_not_edit,
      display_modal: true,
      item_selected: item_selected,
    });
  };
  close_modal = () => {
    this.setState({ display_modal: false });
    this.get_genre_list();
  };

  Action = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div key={rowIndex}>
        <span>
          <FontAwesomeIcon
            icon={faEdit}
            className="text-info mr-3"
            onClick={() => this.open_modal(row, false)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-info mr-3"
            onClick={() => this.delete_genre(row._id, row.genre_name)}
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
        {this.state.display_modal ? (
          <GenreModal
            item_selected={this.state.item_selected}
            display_modal={this.state.display_modal}
            onClickClose={this.close_modal}
            is_not_edit={this.state.is_not_edit}
          />
        ) : (
          ""
        )}
        {columns.length > 0 ? (
          <ToolkitProvider keyField="id" data={data} columns={columns} search>
            {(props) => (
              <div>
                <div className="form-inline mr-auto my-3">
                  <h5 className="mr-3">Tìm kiếm:</h5>
                  <SearchBar
                    {...props.searchProps}
                    placeholder="Nhập vào để tìm ..."
                  />
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
