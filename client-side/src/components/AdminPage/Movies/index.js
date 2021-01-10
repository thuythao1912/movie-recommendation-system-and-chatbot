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
import Statistics from "../Statistics";
import callApi from "../../../utils/apiCaller";

export default class Movies extends Component {
  constructor() {
    super();
    this.state = { re_render: true };
  }
  delete_movie_list = async () => {
    let ans = window.confirm(`Bạn có xác nhận xóa tất cả phim?`);
    if (ans) {
      await callApi(`movies`, "delete").then((res) => {
        alert(res.data.message);
      });
      this.re_render();
    }
  };
  re_render = () => {
    this.setState({ re_render: !this.state.re_render });
  };
  render() {
    return (
      <div className="bg-light">
        <h3 className="text-dark font-weight-bold">QUẢN LÝ DỮ LIỆU PHIM</h3>
        <div className="row mt-4">
          <div className="col-lg-10">
            <Statistics re_render={this.state.re_render} />
          </div>
          <div className="col-lg-2">
            <div className="col-lg-12 pr-0 pl-5">
              <Link
                to="/admin/add-movie"
                className="text-decoration-none text-white"
              >
                <button className="btn btn-block btn-info">
                  <FontAwesomeIcon icon={faPlusSquare} />
                  <span className="mx-2">Thêm mới</span>
                </button>
              </Link>
              <button
                className="btn btn-block btn-danger mt-2"
                onClick={this.delete_movie_list}
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                <span className="mx-2">Xóa tất cả</span>
              </button>
            </div>
          </div>
        </div>
        <MovieList re_render={this.re_render} />
      </div>
    );
  }
}
