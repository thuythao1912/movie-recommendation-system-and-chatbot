import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClosedCaptioning,
  faEdit,
  faInfoCircle,
  faTextWidth,
  faTrashAlt,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { init_request, receive_response } from "../../../utils/socket_helper";
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
          dataField: "movie_actors",
          text: "Thể loại",
          sort: true,
          text: "Diễn viên",
        },
        {
          dataField: "movie_producers",
          text: "Thể loại",
          sort: true,
          text: "Nhà sản xuất",
        },
        {
          dataField: "",
          text: "Thao tác",
          formatter: this.Action,
        },
      ],
    };
  }
  get_movie_list = (data) => {
    this.setState({ data: data });
  };
  init_get_movie_list = () => init_request("get_movie_list");

  componentDidMount() {
    this.init_get_movie_list();
    receive_response("get_movie_list", this.get_movie_list);
    receive_response("change_movie_list", this.init_get_movie_list);
  }
  formatMovieGenres = (cell, row, rowIndex, formatExtraData) => {
    return <span>{row.movie_genres.join(", ")}</span>;
  };
  Action(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <span>
          <FontAwesomeIcon icon={faEdit} className="text-info mr-3" />
          <FontAwesomeIcon icon={faTrashAlt} className="text-info mr-3" />
        </span>
      </div>
    );
  }
  render() {
    const { SearchBar, ClearSearchButton } = Search;
    let data = this.state.data;
    let columns = this.state.columns;

    return (
      <div className="bg-white my-3 px-4 py-2">
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
                  {/* <ClearSearchButton
                    {...props.searchProps}
                    className="btn btn-danger"
                    text={<FontAwesomeIcon icon={faWindowClose} />}
                  /> */}
                </div>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  keyField="movie_id"
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
