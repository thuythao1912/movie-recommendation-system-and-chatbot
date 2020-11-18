import React, { Component } from "react";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faList } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-js-pagination";
import { Button } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
export default class Movies extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      is_card: false,
      activePage: 15,
    };
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  get_movie_list() {
    callApi("movies", "get").then((res) => {
      this.setState({ data: res.data });
    });
  }
  componentDidMount() {
    this.get_movie_list();
  }
  set_display_mode = () => {
    this.setState({ is_card: !this.state.is_card });
  };
  render() {
    let data = this.state.data;
    let elMovies = "";
    if (this.state.is_card) {
      elMovies = data.map((item, index) => {
        return (
          <div key={index} className="py-2">
            <MovieCard data={item} />
          </div>
        );
      });
    } else {
      elMovies = (
        <div style={{ width: "100%" }}>
          <MovieList data={this.state.data} />
        </div>
      );
    }

    return (
      <div className="p-3">
        <div className="justify-content-between row p-1">
          <h3 className="text-dark font-weight-bold">DANH SÁCH PHIM</h3>
          <Button variant="light" onClick={this.set_display_mode}>
            <FontAwesomeIcon icon={faEye} className="mr-2" />
            <span>{this.state.is_card ? "Xem dạng bảng" : "Xem dạng thẻ"}</span>
          </Button>
        </div>
        <div className="row flex-wrap justify-content-between">{elMovies}</div>
      </div>
    );
  }
}
