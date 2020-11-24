import React, { Component } from "react";
import MovieCard from "./MovieCard";
import MovieList from "./MovieList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, Pagination } from "react-bootstrap";
import callApi from "../../../utils/apiCaller";
import HomePanel from "../HomePanel";

export default class Movies extends Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      is_card: true,
      display_data: [],
      limit: 8,
      currentPage: 0,
      displayData: [],
      totalPage: 0,
      rangePage: 8,
      minPage: 0,
      maxPage: 0,
      totalData: 0,
    };
  }
  createPagination() {
    let range = this.state.rangePage;
    let min = this.state.minPage;
    let max = this.state.maxPage;
    let currentPage = this.state.currentPage;
    let total = this.state.totalPage;
    let arr = [];
    if (currentPage < range / 2) {
      min = 0;
      max = Math.min(total, range);
    } else if (currentPage > total - range / 2) {
      max = total;
      min = total - range / 2;
    } else {
      min = currentPage - range / 2 + 1;
      max = currentPage + range / 2 - 1;
    }
    for (let i = min; i < max; i++) {
      if (i === currentPage - 1) {
        arr.push(
          <Pagination.Item
            active
            key={i + 1}
            onClick={() => this.handlePageChoosen(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        );
      } else {
        arr.push(
          <Pagination.Item
            key={i + 1}
            onClick={() => this.handlePageChoosen(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        );
      }
    }
    return arr;
  }
  async handlePageChoosen(page) {
    await this.setState({ currentPage: page });
    this.processData(this.state.data, page);
  }
  processData(data, page) {
    let arr = [];
    for (
      let i = (page - 1) * this.state.limit;
      i < (page - 1) * this.state.limit + this.state.limit;
      i++
    ) {
      if (data[i]) {
        arr.push(data[i]);
      }
    }
    this.setState({ display_data: arr, currentPage: page });
  }
  get_movie_list = async () => {
    callApi("movies", "get", null).then(async (res) => {
      let currentPage;
      res.data.length > 0 ? (currentPage = 1) : (currentPage = 0);
      await this.setState({
        currentPage: currentPage,
        data: res.data,
        totalData: res.data.length,
        totalPage: Math.ceil(res.data.length / this.state.limit),
      });
      await this.processData(this.state.data, this.state.currentPage);
    });
  };
  componentDidMount = async () => {
    await this.get_movie_list();
  };
  set_display_mode = () => {
    this.setState({ is_card: !this.state.is_card });
  };

  select_genre = (genre) => {
    if (genre != "") {
      callApi(`movies/find_list_movie?movie_genres=${genre}`, "get").then(
        async (res) => {
          let currentPage;
          res.data.length > 0 ? (currentPage = 1) : (currentPage = 0);
          await this.setState({
            currentPage: currentPage,
            data: res.data,
            totalData: res.data.length,
            totalPage: Math.ceil(res.data.length / this.state.limit),
          });
          await this.processData(this.state.data, this.state.currentPage);
        }
      );
    } else {
      this.get_movie_list();
    }
  };
  render() {
    let elMovies = "";
    let elPage = "";
    if (this.state.is_card) {
      elMovies = this.state.display_data.map((item, index) => {
        return (
          <div key={index} className="py-2">
            <MovieCard data={item} />
          </div>
        );
      });
      elPage = this.createPagination();
    } else {
      elMovies = (
        <div style={{ width: "100%" }}>
          <MovieList data={this.state.data} />
        </div>
      );
    }

    return (
      <div className="row m-0">
        <div className="col-lg-2 pl-0">
          <HomePanel select_genre={this.select_genre} />
        </div>
        <div className="col-lg-10">
          <div className="p-3">
            <div className="justify-content-between row p-1">
              <h3 className="text-dark font-weight-bold">DANH SÁCH PHIM</h3>
              <Button variant="light" onClick={this.set_display_mode}>
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                <span>
                  {this.state.is_card ? "Xem dạng bảng" : "Xem dạng thẻ"}
                </span>
              </Button>
            </div>
            <div className="row flex-wrap justify-content-start">
              {elMovies}
            </div>
            <div
              style={{
                display: this.state.is_card ? "block" : "none",
              }}
              className="offset-lg-4"
            >
              <Pagination>
                <Pagination.First onClick={() => this.handlePageChoosen(1)} />
                <Pagination.Prev
                  disabled={this.state.currentPage == 1 ? true : false}
                  onClick={() =>
                    this.handlePageChoosen(this.state.currentPage - 1)
                  }
                />
                {elPage}
                <Pagination.Next
                  disabled={
                    this.state.currentPage == this.state.totalPage
                      ? true
                      : false
                  }
                  onClick={() =>
                    this.handlePageChoosen(this.state.currentPage + 1)
                  }
                />
                <Pagination.Last
                  onClick={() => this.handlePageChoosen(this.state.totalPage)}
                />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
