import React, { Component } from "react";
import { Link } from "react-router-dom";
import GenreList from "./GenreList";
import MovieGenre from "../MovieGenre";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import callApi from "../../../utils/apiCaller";

export default class Genres extends Component {
  constructor(props) {
    super();
    this.state = { count_genre: 0, count_movie: 0 };
  }
  get_movie_genre_count = async () => {
    let count_movie;
    let count_genre;
    await callApi("movies/count", "get").then((res) => {
      count_movie = res.data;
    });
    await callApi("genres/count", "get").then((res) => {
      count_genre = res.data;
    });
    this.setState({ count_genre: count_genre, count_movie: count_movie });
  };

  componentDidMount = async () => {
    await this.get_movie_genre_count();
  };

  render() {
    return (
      <div className="">
        <h3 className="text-dark font-weight-bold">QUẢN LÝ DỮ LIỆU THỂ LOẠI</h3>
        <div className="row mt-4">
          <div className="col-lg-8">
            <MovieGenre
              count_genre={this.state.count_genre}
              count_movie={this.state.count_movie}
            />
          </div>
          <div className="col-lg-4">
            <div className="col-lg-12">
              <Link to="/admin/add" className="text-decoration-none text-white">
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
        <GenreList />
      </div>
    );
  }
}
