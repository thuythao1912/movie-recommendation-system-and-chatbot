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
          text: "Xem chi tiết",
          formatter: this.Action,
        },
      ],
      selectRow: {
        mode: "checkbox",
        clickToSelect: true,
      },
      display_modal: false,
      item_selected: {},
    };
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

  open_modal = (item_selected) => {
    this.setState({
      display_modal: true,
      item_selected: item_selected,
    });
  };
  close_modal = () => {
    this.setState({ display_modal: false });
    this.get_movie_list();
  };

  Action = (cell, row, rowIndex, formatExtraData) => {
    return (
      <div key={rowIndex}>
        {/* <span>
          <FontAwesomeIcon
            icon={faInfoCircle}
            className="text-info mr-3"
            onClick={() => this.open_modal(row, true)}
          />
        </span> */}
        <Link to={`/movies?movie_title=${row.movie_title}`}>
          <FontAwesomeIcon icon={faInfoCircle} className="text-info mr-3" />
        </Link>
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
                    className="rounded-pill"
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
