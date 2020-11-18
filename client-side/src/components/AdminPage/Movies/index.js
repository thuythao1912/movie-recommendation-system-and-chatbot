import React, { Component } from "react";
import { Link } from "react-router-dom";
import MovieList from "./MovieList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faGlobe,
  faPlusSquare,
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
          <div className="col-lg-8">
            <MovieGenre />
          </div>
          <div className="col-lg-4">
            <div className="col-lg-12">
              <div className="btn btn-block btn-info">
                <Link
                  to="/admin/add"
                  className="text-decoration-none text-white"
                >
                  <FontAwesomeIcon icon={faPlusSquare} />
                  <span className="mx-2">Thêm mới</span>
                </Link>
              </div>
              <div className="btn btn-block btn-danger mt-3">
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
