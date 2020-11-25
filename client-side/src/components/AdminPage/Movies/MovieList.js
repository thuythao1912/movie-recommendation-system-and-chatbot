import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faInfoCircle,
  faSave,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";
import MovieModal from "./MovieModal";
export default class MovieList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      columns: [
        {
          dataField: "movie_id",
          text: "Mã phim",
          sort: true,
        },
        {
          dataField: "movie_title",
          text: "Tựa phim",
          sort: true,
        },
        {
          dataField: "movie_year",
          text: "Năm sản xuất",
          sort: true,
        },
        {
          dataField: "movie_genres",
          text: "Thể loại",
          sort: true,
          formatter: this.formatMovieGenres,
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
    this.delete_movie = this.delete_movie.bind(this);
    this.open_modal = this.open_modal.bind(this);
    this.close_modal = this.close_modal.bind(this);
  }
  get_movie_list() {
    callApi("movies", "get").then((res) => {
      this.setState({ data: res.data });
    });
  }
  componentDidMount() {
    this.get_movie_list();
  }

  formatMovieGenres = (cell, row, rowIndex, formatExtraData) => {
    return <span key={rowIndex}>{row.movie_genres.join(", ")}</span>;
  };

  formatMovieDescription = (cell, row, rowIndex, formatExtraData) => {
    if (row.movie_description == null) {
      row.movie_description = [];
    }
    return <span key={rowIndex}>{row.movie_description.join(", ")}</span>;
  };

  delete_movie = async (_id, movie_title) => {
    let ans = window.confirm(`Bạn cố muốn xóa phim ${movie_title}?`);
    if (ans) {
      await callApi(`movies/${_id}`, "delete").then((res) => {
        alert(res.data.message);
      });
      this.get_movie_list();
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
            icon={faInfoCircle}
            className="text-info mr-3"
            onClick={() => this.open_modal(row, true)}
          />
          <FontAwesomeIcon
            icon={faEdit}
            className="text-info mr-3"
            onClick={() => this.open_modal(row, false)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            className="text-info mr-3"
            onClick={() => this.delete_movie(row._id, row.movie_title)}
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
          <MovieModal
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
