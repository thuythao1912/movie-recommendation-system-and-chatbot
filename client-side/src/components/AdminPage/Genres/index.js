import React, { Component } from "react";
import { Link } from "react-router-dom";
import GenreList from "./GenreList";
import Statistics from "../Statistics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";

export default class Genres extends Component {
  constructor() {
    super();
    this.state = { re_render: true };
  }
  delete_movie_list = async () => {
    let ans = window.confirm(`Bạn có xác nhận xóa tất cả thể loại?`);
    if (ans) {
      await callApi(`genres`, "delete").then((res) => {
        alert(res.data.message);
      });
    }
    this.re_render();
  };
  re_render = () => {
    this.setState({ re_render: !this.state.re_render });
  };

  render() {
    return (
      <div className="">
        <h3 className="text-dark font-weight-bold">QUẢN LÝ DỮ LIỆU THỂ LOẠI</h3>
        <div className="row mt-4">
          <div className="col-lg-10">
            <Statistics re_render={this.state.re_render} />
          </div>
          <div className="col-lg-2">
            <div className="col-lg-12 pr-0 pl-5">
              <Link
                to="/admin/add-genre"
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
        <GenreList re_render={this.re_render} />
      </div>
    );
  }
}
