import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
export default class MovieGenre extends Component {
  constructor(props) {
    super();
    this.state = { count_movie: 0, count_genre: 0 };
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
          <div className="media-body pt-2">
            <span className="mt-0 h1 mr-2">{this.props.count_movie}</span>
            <span>phim</span>
          </div>
        </div>
        <div className="col-lg-6 btn border media px-4 bg-white">
          <img
            src="/images/font.png"
            width="70px"
            className="align-self-center"
          />
          <div className="media-body pt-2">
            <span className="mt-0 h1 mr-2">{this.props.count_genre}</span>
            <span>thể loại</span>
          </div>
        </div>
      </div>
    );
  }
}
