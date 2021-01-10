import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";
import { Button } from "react-bootstrap";

export default class RatingList extends Component {
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
          dataField: "movie_title",
          text: "Tên phim",
          sort: true,
        },
        {
          dataField: "rating_score",
          text: "Điểm đánh giá",
          sort: true,
        },
        {
          dataField: "rating_time",
          text: "Thời gian đánh giá",
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

    this.delete_rating = this.delete_rating.bind(this);
    this.open_modal = this.open_modal.bind(this);
    this.close_modal = this.close_modal.bind(this);
  }

  get_rating_list() {
    callApi("ratings", "get").then((res) => {
      let rating_list = res.data[0];
      let movie_name = res.data[1];
      rating_list.map((rating, index) => {
        rating.movie_title = movie_name[index];
        return rating;
      });
      this.setState({ data: res.data[0] });
    });
  }
  componentDidMount() {
    this.get_rating_list();
  }
  delete_message_list = async () => {
    if (this.state.data.length == 0) {
      alert("Không có đánh giá để xóa!");
    } else {
      let ans = window.confirm(`Bạn có xác nhận xóa tất cả đánh giá?`);
      if (ans) {
        await callApi(`ratings`, "delete").then((res) => {
          alert(res.data.message);
        });
        this.get_rating_list();
        this.props.re_render();
      }
    }
  };
  delete_rating = async (_id) => {
    let ans = window.confirm(`Bạn cố muốn xóa đánh giá này?`);
    if (ans) {
      await callApi(`ratings/${_id}`, "delete").then((res) => {
        alert(res.data.message);
      });
      this.get_rating_list();
      this.props.re_render();
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
            onClick={() => this.delete_rating(row._id)}
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
