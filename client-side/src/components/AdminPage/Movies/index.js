import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faGlobe,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import MovieGenre from "../MovieGenre";
export default class Movies extends Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="bg-light">
        <h3 className="text-dark font-weight-bold">QUẢN LÝ DỮ LIỆU PHIM</h3>
        <div className="row mt-4">
          <div className="col-lg-6">
            <MovieGenre />
          </div>
          <div className="col-lg-6 row">
            <div className="col-lg-6">
              <div className="btn btn-block btn-info">
                <FontAwesomeIcon icon={faFileExcel} />
                <span className="mx-2">Thêm từ excel</span>
              </div>
              <div className="btn btn-block btn-info">
                <FontAwesomeIcon icon={faGlobe} />
                <span className="mx-2">Thêm từ web</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="btn btn-block btn-warning">
                <FontAwesomeIcon icon={faFileExcel} />
                <span className="mx-2">Xuất file</span>
              </div>
              <div className="btn btn-block btn-danger">
                <FontAwesomeIcon icon={faTrashAlt} />
                <span className="mx-2">Xóa tất cả</span>
              </div>
            </div>
          </div>
        </div>
        <MovieList />
      </div>
    );
  }
}
