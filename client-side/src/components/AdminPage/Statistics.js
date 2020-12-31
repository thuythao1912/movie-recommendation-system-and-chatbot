import React, { Component } from "react";
import callApi from "../../utils/apiCaller";
export default class Statistics extends Component {
  constructor(props) {
    super();
    this.state = {
      count_movie: 0,
      count_genre: 0,
      count_rating: 0,
      count_user: 0,
    };
  }
  get_count = () => {
    callApi("statistics/count", "get").then((res) => {
      let data = res.data;
      this.setState({
        count_genre: data.count_genre,
        count_movie: data.count_movie,
        count_user: data.count_user,
        count_rating: data.count_rating,
      });
    });
  };

  componentDidMount = () => {
    this.get_count();
  };
  render() {
    return (
      <div className="d-flex justify-content-between pr-0">
        <div className="col-lg-3 btn border media px-4 mr-3 bg-white">
          <img
            src="/images/cinema.png"
            width="70px"
            className="align-self-center"
          />
          <div className="media-body pt-2">
            <span className="mt-0 h1 mr-2">{this.state.count_movie}</span>
            <span>phim</span>
          </div>
        </div>
        <div className="col-lg-3 btn border media px-4 mr-3 bg-white">
          <img
            src="/images/font.png"
            width="70px"
            className="align-self-center"
          />
          <div className="media-body pt-2">
            <span className="mt-0 h1 mr-2">{this.state.count_genre}</span>
            <span>thể loại</span>
          </div>
        </div>
        <div className="col-lg-3 btn border media px-4 mr-3 bg-white">
          <img
            src="/images/team.png"
            width="70px"
            className="align-self-center"
          />
          <div className="media-body pt-2">
            <span className="mt-0 h1 mr-2">{this.state.count_user}</span>
            <span>người dùng</span>
          </div>
        </div>
        <div className="col-lg-3 btn border media px-4 mr-3 bg-white ">
          <img
            src="/images/rating.png"
            width="70px"
            className="align-self-center"
          />
          <div className="media-body pt-2">
            <span className="mt-0 h1 mr-2">{this.state.count_rating}</span>
            <span>đánh giá</span>
          </div>
        </div>
      </div>
    );
  }
}
