import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel, faGlobe } from "@fortawesome/free-solid-svg-icons";
export default class Movies extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div>
        <h1>Moviie</h1>
        <div className="row">
          <button className="btn btn-success m-3">
            <FontAwesomeIcon icon={faFileExcel} />
            <span className="mx-2">Thêm dữ liệu từ excel</span>
          </button>
          <button className="btn btn-success my-3">
            <FontAwesomeIcon icon={faGlobe} />
            <span className="mx-2">Thêm dữ liệu từ web</span>
          </button>
        </div>
        <MovieList />
      </div>
    );
  }
}
