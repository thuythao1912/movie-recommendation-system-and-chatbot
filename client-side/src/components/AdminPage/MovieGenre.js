import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
export default class MovieGenre extends Component {
  constructor(props) {
    super();
    this.state = { count_movie: 0, count_genre: 0 };
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
    console.log(this.state.count_genre, this.state.count_movie);
    return (
      <div className="d-flex justify-content-between pr-0">
        <div className="col-lg-6 btn border media px-4 mr-3 bg-white">
          <img
            src="/images/cinema.png"
            width="70px"
            className="align-self-center"
          />
          <div className="media-body">
            <h3 className="mt-0">{this.state.count_movie}</h3>
            <p>phim</p>
          </div>
        </div>
        <div className="col-lg-6 btn border media px-4 bg-white">
          <img
            src="/images/font.png"
            width="70px"
            className="align-self-center"
          />
          <div className="media-body">
            <h3 className="mt-0">{this.state.count_genre}</h3>
            <p>thể loại</p>
          </div>
        </div>
      </div>
    );
  }
}
