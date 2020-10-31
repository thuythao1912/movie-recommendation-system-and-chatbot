import React, { Component } from "react";
import { init_request, receive_response } from "../../utils/socket_helper";
export default class MovieGenre extends Component {
  constructor(props) {
    super();
    this.state = { count_movie: 0, count_genre: 0 };
  }
  get_movie_genre_count = (data) => {
    this.setState(data);
  };
  init_get_movie_genre_count = () => init_request("get_movie_genre_count");
  
  componentDidMount() {
    this.init_get_movie_genre_count();
    receive_response("get_movie_genre_count", this.get_movie_genre_count);
  }
  render() {
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
