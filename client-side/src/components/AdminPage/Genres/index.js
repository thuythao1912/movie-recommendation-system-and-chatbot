import React, { Component } from "react";
import { Link } from "react-router-dom";
import GenreList from "./GenreList";
import MovieGenre from "../MovieGenre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlobe,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
export default class Genres extends Component {
  render() {
    return (
      <div className="">
        <h3 className="text-dark font-weight-bold">QUẢN LÝ DỮ LIỆU THỂ LOẠI</h3>
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
                  <FontAwesomeIcon icon={faGlobe} />
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
        <GenreList />
      </div>
    );
  }
}
