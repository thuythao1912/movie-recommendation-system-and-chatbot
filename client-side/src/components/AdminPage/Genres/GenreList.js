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
export default class MovieList extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [
        { genreId: 1, genreName: "Fantasy" },
        { genreId: 2, genreName: "Documentary" },
        { genreId: 3, genreName: "War" },
        { genreId: 4, genreName: "Horror" },
        { genreId: 5, genreName: "Children" },
        { genreId: 6, genreName: "Mystery" },
        { genreId: 7, genreName: "Thriller" },
        { genreId: 8, genreName: "Action" },
        { genreId: 9, genreName: "Comedy" },
        { genreId: 10, genreName: "Drama" },
        { genreId: 11, genreName: "Musical" },
        { genreId: 12, genreName: "IMAX" },
        { genreId: 13, genreName: "Western" },
        { genreId: 14, genreName: "Adventure" },
        { genreId: 15, genreName: "Crime" },
        { genreId: 16, genreName: "Film-Noir" },
        { genreId: 17, genreName: "Sci-Fi" },
        { genreId: 18, genreName: "Romance" },
        { genreId: 19, genreName: "Animation" },
      ],
      columns: [
        {
          dataField: "genreId",
          text: "Mã thể loại",
          sort: true,
        },
        {
          dataField: "genreName",
          text: "Tên thể loại",
          sort: true,
        },
        {
          dataField: "",
          text: "Thao tác",
          formatter: this.Action,
        },
      ],
    };
  }
  load_data() {}
  Action(cell, row, rowIndex, formatExtraData) {
    return (
      <div>
        <span>
          <FontAwesomeIcon icon={faInfoCircle} className="text-info mr-3" />
          <FontAwesomeIcon icon={faEdit} className="text-info mr-3" />
          <FontAwesomeIcon icon={faTrashAlt} className="text-info mr-3" />
        </span>
      </div>
    );
  }
  componentDidMount() {
    this.load_data();
  }
  render() {
    const { SearchBar, ClearSearchButton } = Search;
    let data = this.state.data;
    let columns = this.state.columns;
    return (
      <div className="bg-white my-4">
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
                  <ClearSearchButton
                    {...props.searchProps}
                    className="btn btn-danger"
                    text="Xóa tìm kiếm"
                  />
                </div>
                <BootstrapTable
                  {...props.baseProps}
                  pagination={paginationFactory()}
                  striped
                  hover
                  condensed
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
