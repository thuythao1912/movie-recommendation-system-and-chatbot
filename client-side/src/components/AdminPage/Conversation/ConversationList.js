import React, { Component } from "react";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
export default class GenreList extends Component {
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
          text: "Genre ID",
        },
        {
          dataField: "genreName",
          text: "Genre name",
        },
      ],
    };
  }
  load_data() {}
  componentDidMount() {
    this.load_data();
  }
  render() {
    let data = this.state.data;
    let columns = this.state.columns;
    return (
      <div>
        {columns.length > 0 ? (
          <BootstrapTable
            keyField="id"
            data={this.state.data}
            columns={this.state.columns}
            pagination={paginationFactory()}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}
